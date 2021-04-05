import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { Client } from "jaeger-browser";
import { PageConfig } from "@jupyterlab/coreutils";

/**
 * Initialization data for the jupyter-jaeger extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyter_jaeger',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyter-jaeger is activated!');
    console.log(new URL("jaeger_proxy/", PageConfig.getBaseUrl()));
  }
};

const SERVER_URL = new URL("jaeger_proxy/", PageConfig.getBaseUrl());

export const client = new Client(SERVER_URL);
export default extension;
