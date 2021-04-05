
import json
import os.path as osp
import pathlib

from .handlers import setup_handlers
from ._version import __version__


HERE = osp.abspath(osp.dirname(__file__))

with open(osp.join(HERE, 'labextension', 'package.json')) as fid:
    data = json.load(fid)

def _jupyter_labextension_paths():
    return [{
        'src': 'labextension',
        'dest': data['name']
    }]


def _jupyter_server_extension_points():
    return [{
        "module": "jupyter_jaeger"
    }]


def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension.
    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    setup_handlers(server_app.web_app)
    server_app.log.info("Registered extension at URL path /jaeger_proxy")


# https://jupyter-server-proxy.readthedocs.io/en/latest/server-process.html
def setup_jaeger_proxy():
    return {
        "command": ["jaeger-browser"],
        "environment": {"PORT": "{port}"},
        "launcher_entry": {"enabled": False},
        "timeout": 60
    }


def setup_jaeger_all():
    return {
        "command": [
            "jaeger-all-in-one",
            "--query.port",
            "{port}",
            "--query.base-path",
            "{base_url}jaeger",
        ],
        "absolute_url": True,
        "launcher_entry": {
            "enabled": True,
            "icon_path": str(pathlib.Path(__file__).parent / "jaeger.svg"),
            "title": "Jaeger",
        },
    }
