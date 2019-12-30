"""
Provides jupyter server proxy endpoints for launching Jaeger.
"""

__version__ = "1.0.3"

import pathlib


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
