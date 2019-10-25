# jupyter-jaeger <br> ![PyPI](https://img.shields.io/pypi/v/jupyter_jaeger?style=flat-square) ![npm](https://img.shields.io/npm/v/jupyter-jaeger?style=flat-square)

This adds support for using the [Jaeger](https://www.jaegertracing.io/) distributed tracing tool with Jupyter. It facilitates the use case of tracking some process
that starts in a kernel and is continued in a mime renderer.

We are using it to profile and debug [`ibis-vega-transform`](https://github.com/Quansight/ibis-vega-transform) which goes back and forth between the kernel and the frontend to interactively render charts with Altair.



Installing this adds two Jupyter server extensions that start up the `jaeger-all-in-one` and `jaeger-browser` processes when you launch Jupyter.
So to use it you must first instrument code in your kernel and/or in the frontend to record traces. 

It also provis a NPM Typescript plugin you can use to access the client from inside a JupyterLab extension.


## Usage

```bash
# Install jaeger-all-in-one binary
conda install -c conda-forge jaeger

# Install this package
pip install jupyter-jaeger

# Optional, to see Jaeger icon in JupyterLab launcherr
jupyter labextension install jupyterlab-server-proxy-saulshanabrook

# Launch a Jupyter server
jupyter lab

# Open the jaeger UI
open http://localhost:8080/jaeger
```

## Example

This repo also includes an example of starting a trace from a kernel and continueing it in a mimeredenr jupyterlab extension,
in [`./example`](./example). You can try this example by:

1. [Launching the Binder](https://mybinder.org/v2/gh/Quansight/jupyter-jaeger/master?urlpath=lab/tree/example/Untitled.ipynb) for this repo.
2. Create a launcher and launch the Jaeger UI
3. Run the notebook.
4. Inspect the trace created by the notebook execution.
