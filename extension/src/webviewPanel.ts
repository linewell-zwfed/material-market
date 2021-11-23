import * as path from "path";
import * as fs from 'fs';
import * as vscode from "vscode";

export class WebviewPanel {
  private static _instance: WebviewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private static readonly viewType = "material-webview";
  public static vsContext: vscode.ExtensionContext;
  private static _onMessage = function (message: any): void { console.log(message); };

  public static getInstance(context: vscode.ExtensionContext, onMessage: (message: any) => any = this._onMessage) {
    if (!this._instance) {
      WebviewPanel._onMessage = onMessage;
      this._instance = new WebviewPanel(context);
    }
    return this._instance;
  }

  private constructor(context: vscode.ExtensionContext) {
    WebviewPanel.vsContext = context;
    this._panel = vscode.window.createWebviewPanel(WebviewPanel.viewType, "物料市场", vscode.ViewColumn.One, {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "webview"))],
    });

    this._panel.webview.html = this._getHtmlForWebview();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(WebviewPanel._onMessage, null, this._disposables);
  }

  public postMessageWebview(object: any): void {
    this._panel.webview.postMessage(object);
  }

  public dispose(): void {
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
    WebviewPanel._instance = undefined;
  }

  private _getHtmlForWebview(): string {
    const isDev = !!process.env.USE_DEV_UI;
    let html:string;
    if (isDev) {
      let buf = fs.readFileSync(path.join(WebviewPanel.vsContext.extensionPath, 'static/', 'index.html'));
			html = buf.toString();
    } else {
      const basePathOnDisk = vscode.Uri.file(path.join(WebviewPanel.vsContext.extensionPath, "webview"));
      let buf = fs.readFileSync(path.join(WebviewPanel.vsContext.extensionPath, 'webview/', 'index.html'));
      html = buf.toString().replace('<head>', `<head><base href="${this._panel.webview.asWebviewUri(basePathOnDisk)}/">`);
    }
    return html;
  }
}
