import { IRenderMime } from "@jupyterlab/rendermime-interfaces";

import { JSONObject } from "@phosphor/coreutils";
import { client } from "jupyter-jaeger";

import { Widget } from "@phosphor/widgets";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * The default mime type for the extension.
 */
const MIME_TYPE = "application/vnd.jupyter_jaeger_example.tracing+json";

/**
 * The class name added to the extension.
 */
const CLASS_NAME = "mimerenderer-tracing";

/**
 * A widget for rendering tracing.
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render tracing into this widget's node.
   */
  async renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data = model.data[this._mimeType] as JSONObject;
    const span = await client.startSpanExtract({
      name: "renderModel",
      reference: data,
      relationship: "follows_from"
    });
    this.node.textContent = "rendering";
    await sleep(1000);
    client.finishSpan(span);
    this.node.textContent = "done";
    return;
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for tracing data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: "tracingrender:plugin",
  rendererFactory,
  rank: 0,
  dataType: "json",
  fileTypes: [
    {
      name: "tracing",
      mimeTypes: [MIME_TYPE],
      extensions: [".my_type"]
    }
  ],
  documentWidgetFactoryOptions: {
    name: "Tracing View",
    primaryFileType: "tracing",
    fileTypes: ["tracing"],
    defaultFor: ["tracing"]
  }
};

export default extension;
