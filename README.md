# jupyter-jaeger <br> ![PyPI](https://img.shields.io/pypi/v/jupyter_jaeger?style=flat-square) ![npm](https://img.shields.io/npm/v/jupyter-jaeger?style=flat-square) ![Github Actions Status](https://github.com/Quansight/jupyter-jaeger/workflows/Build/badge.svg)


This adds support for using the [Jaeger](https://www.jaegertracing.io/) distributed tracing tool with Jupyter. It facilitates the use case of tracking some process
that starts in a kernel and is continued in a mime renderer.

We are using it to profile and debug [`ibis-vega-transform`](https://github.com/Quansight/ibis-vega-transform) which goes back and forth between the kernel and the frontend to interactively render charts with Altair.

Installing this adds two Jupyter server extensions that start up the `jaeger-all-in-one` and `jaeger-browser` processes when you launch Jupyter.
So to use it you must first instrument code in your kernel and/or in the frontend to record traces.

It also provis a NPM Typescript plugin you can use to access the client from inside a JupyterLab extension.


## Requirements

* JupyterLab >= 3.0



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

## Install

```bash
pip install jupyter-jaeger
```


## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyter-jaeger directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Uninstall

```bash
pip uninstall jupyter-jaeger
```


## Example

This repo also includes an example of starting a trace from a kernel and continuing it in a mimeredenr jupyterlab extension,
in [`./example`](./example). You can try this example by:

1. [Launching the Binder](https://mybinder.org/v2/gh/Quansight/jupyter-jaeger/master?urlpath=lab/tree/example/Untitled.ipynb) for this repo.
2. Create a launcher and launch the Jaeger UI
3. Run the notebook.
4. Inspect the trace created by the notebook execution.


## Releasing

For releasing, you will need a specific conda environment:

```sh
conda env create --file environment-release.yaml
conda activate jupyter-jaeger-release
```

Now, you can use `make` to publish for **npmjs** and **pypi**.

```sh
# to publish to npmjs
make release-npmjs
# to publish to pypi
make release-pypi
```

Also, create a git tag for the new release, for example:

```sh
git tag 1.0.4
git push --tags
```
