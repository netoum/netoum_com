import * as dialog from "@zag-js/dialog";
import { normalizeProps, renderPart } from "./util";
import { Component } from "./component";
import type { Machine } from "@zag-js/core";

export interface DialogHook {
  dialog: Dialog;
  context(): dialog.Context;
}


export class Dialog extends Component<dialog.Context, dialog.Api> {
  initService(context: dialog.Context): Machine<any, any, any> {
    return dialog.machine(context);
  }

  initApi() {
    return dialog.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts = ["trigger", "backdrop", "positioner", "content", "title", "description", "close-trigger"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}