import { Client } from "jaeger-browser";
import { PageConfig } from "@jupyterlab/coreutils";

const SERVER_URL = new URL("jaeger_proxy/", PageConfig.getBaseUrl());

export const client = new Client(SERVER_URL);
