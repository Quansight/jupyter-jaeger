# https://jupyter-server-proxy.readthedocs.io/en/latest/server-process.html
def setup_jaeger_proxy():
    return {
        "command": ["jaeger-browser"],
        "environment": {"PORT": "{port}"},
        "launcher_entry": {"enabled": False},
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
            "icon_path": "./docs/jaeger.svg",
            "title": "Jaeger",
        },
    }
