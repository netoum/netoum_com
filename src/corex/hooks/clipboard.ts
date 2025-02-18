import * as clipboard from "@zag-js/clipboard";
import { normalizeProps, renderPart } from "./util";
import { Component } from "./component";
import type { Machine } from "@zag-js/core";

export interface ClipboardHook {
  clipboard: Clipboard;
  context(): clipboard.Context;
}


export class Clipboard extends Component<clipboard.Context, clipboard.Api> {
  initService(context: clipboard.Context): Machine<any, any, any> {
    return clipboard.machine(context);
  }

  initApi() {
    return clipboard.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts = ["root", "label", "control", "input", "trigger"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}