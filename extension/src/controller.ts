import * as vscode from 'vscode';
import { WebviewPanel } from './webviewPanel';

export class Controller {
  private static _instance: Controller | undefined;
  public static vsContext: vscode.ExtensionContext;
  public static webviewPanelCtx: WebviewPanel;

  private constructor(context: vscode.ExtensionContext) {
    Controller.vsContext = context;
  }

  public static getInstance(context: vscode.ExtensionContext): Controller {
    if (this._instance) {
    } else {
      this._instance = new Controller(context);
    }
    this.webviewPanelCtx = WebviewPanel.createOrShow();
    return this._instance;
  }

  public static addMessageListener(cmd: string, fn: (v: any) => any) {
    this.webviewPanelCtx.addListener(cmd, fn);
  }

  public static handleValidMessage(msg: any) {
    this.webviewPanelCtx.postMessageWebview(msg);
  }

  public static dispose() {
    this._instance = undefined;
  }
}
