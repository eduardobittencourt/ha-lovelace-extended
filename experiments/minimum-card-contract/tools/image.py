"""Acquire the pinned public image outside the checkout; Python 3.14 required."""
import compression.zstd
import hashlib
import json
import os
from pathlib import Path
import shutil
import tarfile
import urllib.request

IMAGE = 'sha256:1e25a28cb9ee48dbcd33b65cbdcf2919d01991fe11f71cdae0a09c9fc3017ebb'
BASE = 'https://ghcr.io/'
AREA = Path(os.environ.get('MCC_RESEARCH', str(Path.home() / 'research/ha-lovelace-extended/demonstrate-minimum-card-contract')))
AREA.mkdir(parents=True, exist_ok=True)
with urllib.request.urlopen(BASE + 'token?service=ghcr.io&scope=repository:home-assistant/home-assistant:pull', timeout=30) as response:
    token = json.load(response)['token']

def get(path):
    return urllib.request.urlopen(urllib.request.Request(BASE + path, headers={
        'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.oci.image.manifest.v1+json'}), timeout=60)

with get('v2/home-assistant/home-assistant/manifests/' + IMAGE) as response:
    raw = response.read()
assert 'sha256:' + hashlib.sha256(raw).hexdigest() == IMAGE
manifest = json.loads(raw)
(AREA / 'manifest.json').write_bytes(raw)
root = AREA / 'rootfs'
root.mkdir(exist_ok=True)
cache = AREA / 'layers'
cache.mkdir(exist_ok=True)
for index, layer in enumerate(manifest['layers']):
    digest = layer['digest'].split(':')[1]
    archive = cache / digest
    if not archive.exists():
        with get('v2/home-assistant/home-assistant/blobs/' + layer['digest']) as response, archive.open('wb') as output:
            shutil.copyfileobj(response, output)
    with archive.open('rb') as source:
        assert hashlib.file_digest(source, 'sha256').hexdigest() == digest
    marker = cache / (digest + '.extracted')
    if marker.exists():
        continue
    print(f'Extracting layer {index + 1}/{len(manifest["layers"])}', flush=True)
    with compression.zstd.ZstdFile(archive) as stream, tarfile.open(fileobj=stream, mode='r|') as tar:
        for member in tar:
            member.name = member.name.lstrip('/')
            # Convert image-absolute symlinks into equivalent rootfs-relative links.
            if member.issym() and member.linkname.startswith('/'):
                member.linkname = os.path.relpath(root / member.linkname.lstrip('/'), (root / member.name).parent)
            if member.islnk():
                member.linkname = member.linkname.lstrip('/')
            name = Path(member.name)
            if name.name.startswith('.wh.'):
                # Whiteouts must never escape the dedicated extraction root.
                target = root / name.parent / name.name.removeprefix('.wh.')
                if not target.resolve().is_relative_to(root.resolve()):
                    raise ValueError('Unsafe whiteout')
                if name.name == '.wh..wh..opq':
                    raise ValueError('Opaque whiteout requires explicit handling')
                if target.is_dir() and not target.is_symlink():
                    shutil.rmtree(target)
                else:
                    target.unlink(missing_ok=True)
                continue
            tar.extract(member, root, filter='data')
    marker.touch()
print('Pinned image extracted:', root)
