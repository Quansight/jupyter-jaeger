import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

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

    requestAPI<any>('jaeger_proxy')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyter-jaeger server extension appears to be missing.\n${reason}`
        );
      });

  }
};

const SERVER_URL = new URL("jaeger_proxy/", PageConfig.getBaseUrl());

export const client = new Client(SERVER_URL);
export default extension;
