"""Set up only the experiment's private disposable state; never production HA."""
import json
from pathlib import Path
import shutil

project = Path(__file__).resolve().parents[1]
state = Path.home() / '.local/state/ha-lovelace-extended/minimum-card-contract'
if (state / 'sandbox.pid').exists():
    raise RuntimeError('Stop the experiment before setup')
state.mkdir(parents=True, exist_ok=True, mode=0o700)
state.chmod(0o700)
config = state / 'config'
config.mkdir(exist_ok=True, mode=0o700)
shutil.copyfile(project / 'fixtures/configuration.yaml', config / 'configuration.yaml')
storage = config / '.storage'
storage.mkdir(exist_ok=True, mode=0o700)
onboarding = storage / 'onboarding'
if not onboarding.exists():
    # Pinned Core 2026.11.1 storage format. Avoid automatic cloud/weather flows;
    # retain real HA user creation and normal subsequent authentication.
    onboarding.write_text(json.dumps({'version': 4, 'minor_version': 1,
        'key': 'onboarding', 'data': {'done': ['core_config', 'analytics', 'integration']}}))
www = config / 'www/minimum-card-contract'
www.mkdir(parents=True, exist_ok=True)
for path in (project / 'src').glob('*'):
    if path.is_file():
        shutil.copyfile(path, www / path.name)
print('Disposable state prepared; no production configuration read')
