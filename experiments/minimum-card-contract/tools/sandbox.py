"""Disposable, network-isolated HA container and loopback-only socket relay."""
import argparse
import asyncio
import json
import os
from pathlib import Path
import resource
import signal
import subprocess
import sys

PROJECT = Path(__file__).resolve().parents[1]
AREA = Path(os.environ.get('MCC_RESEARCH', str(Path.home() / 'research/ha-lovelace-extended/demonstrate-minimum-card-contract')))
# Generated credentials and HA auth state belong in a private state directory.
STATE = Path.home() / '.local/state/ha-lovelace-extended/minimum-card-contract'

async def copy(reader, writer):
    try:
        while chunk := await reader.read(65536):
            writer.write(chunk)
            await writer.drain()
    except (ConnectionError, asyncio.CancelledError):
        pass
    finally:
        writer.close()

async def relay(reader, writer, unix):
    try:
        if unix:
            remote_reader, remote_writer = await asyncio.open_unix_connection(STATE / 'bridge/http.sock')
        else:
            remote_reader, remote_writer = await asyncio.open_connection('127.0.0.1', 8123)
        await asyncio.gather(copy(reader, remote_writer), copy(remote_reader, writer))
    except (OSError, ConnectionError):
        writer.close()

async def inside():
    socket = Path('/run/mcc-bridge/http.sock')
    socket.unlink(missing_ok=True)
    server = await asyncio.start_unix_server(lambda r, w: relay(r, w, False), socket)
    async with server:
        await server.serve_forever()

def limits():
    # Per-process virtual-address-space limit, not a total-container RAM claim.
    resource.setrlimit(resource.RLIMIT_AS, (3 * 1024**3, 3 * 1024**3))
    resource.setrlimit(resource.RLIMIT_NOFILE, (1024, 1024))
    os.sched_setaffinity(0, sorted(os.sched_getaffinity(0))[:2])

async def serve():
    STATE.mkdir(parents=True, exist_ok=True, mode=0o700)
    for folder in ['config', 'bridge']:
        (STATE / folder).mkdir(exist_ok=True, mode=0o700)
    pidfile = STATE / 'sandbox.pid'
    if pidfile.exists():
        raise RuntimeError('Existing PID file: inspect/stop the previous run first')
    command = ['bwrap', '--unshare-all', '--die-with-parent', '--new-session', '--cap-drop', 'ALL',
        '--ro-bind', str(AREA / 'rootfs'), '/', '--proc', '/proc', '--dev', '/dev',
        '--tmpfs', '/tmp', '--tmpfs', '/run', '--bind', str(STATE / 'config'), '/config',
        '--bind', str(STATE / 'bridge'), '/run/mcc-bridge', '--ro-bind', str(PROJECT), '/run/mcc-experiment',
        '--chdir', '/config', '--clearenv', '--setenv', 'PATH', '/usr/local/bin:/usr/bin:/bin',
        '--setenv', 'HOME', '/config', '--setenv', 'LANG', 'C.UTF-8',
        '/usr/local/bin/python3', '/run/mcc-experiment/tools/sandbox.py', 'inside']
    log = (AREA / 'runtime.log').open('a')
    proc = subprocess.Popen(command, stdout=log, stderr=subprocess.STDOUT, preexec_fn=limits)
    pidfile.write_text(str(os.getpid()))
    stopped = asyncio.Event()
    for sig in [signal.SIGINT, signal.SIGTERM]:
        asyncio.get_running_loop().add_signal_handler(sig, stopped.set)
    server = await asyncio.start_server(lambda r, w: relay(r, w, True), '127.0.0.1', 18123)
    try:
        async with server:
            while not stopped.is_set():
                if proc.poll() is not None:
                    raise RuntimeError(f'Sandbox exited {proc.returncode}; inspect runtime.log')
                try:
                    await asyncio.wait_for(stopped.wait(), 1)
                except TimeoutError:
                    pass
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=20)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait()
        pidfile.unlink(missing_ok=True)
        (STATE / 'bridge/http.sock').unlink(missing_ok=True)
        log.close()

if __name__ == '__main__':
    mode = argparse.ArgumentParser()
    mode.add_argument('command', choices=['serve', 'inside', 'identity', 'stop'])
    args = mode.parse_args()
    if args.command == 'inside':
        ha = subprocess.Popen(['/usr/local/bin/python3', '-m', 'homeassistant', '--config', '/config', '--skip-pip'])
        try:
            asyncio.run(inside())
        finally:
            ha.terminate()
            ha.wait(timeout=20)
    elif args.command == 'serve':
        asyncio.run(serve())
    elif args.command == 'stop':
        pid = int((STATE / 'sandbox.pid').read_text())
        proc = Path('/proc') / str(pid)
        argv = proc.joinpath('cmdline').read_bytes().split(b'\0')
        argv = [os.fsdecode(value) for value in argv if value]
        script = Path(argv[1]) if len(argv) > 1 else Path('/')
        if not script.is_absolute():
            script = proc.joinpath('cwd').resolve() / script
        if len(argv) < 3 or argv[-1] != 'serve' or script.resolve() != Path(__file__).resolve():
            raise RuntimeError('PID does not belong to this experiment; refusing to signal it')
        os.kill(pid, signal.SIGTERM)
    else:
        subprocess.run(['bwrap', '--unshare-all', '--die-with-parent', '--cap-drop', 'ALL',
            '--ro-bind', str(AREA / 'rootfs'), '/', '--proc', '/proc', '--dev', '/dev',
            '/usr/local/bin/python3', '-c',
            'import importlib.metadata as m,json;print(json.dumps({p:m.version(p) for p in ["homeassistant","home-assistant-frontend"]}))'], check=True)
