import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { Controller } from './controller';
import { deactivate } from './extension';

export class WebviewPanel {
  private static _instance: WebviewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private static readonly viewType = 'material-webview';
  private _onMessages: { [k: string]: (e: any) => any } = {};

  public static createOrShow(): WebviewPanel {
    if (this._instance) {
      this._instance._panel.reveal(vscode.ViewColumn.One);
    } else {
      this._instance = new WebviewPanel();
    }
    return this._instance;
  }

  private constructor() {
    this._panel = vscode.window.createWebviewPanel(WebviewPanel.viewType, '物料市场', vscode.ViewColumn.One, {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(Controller.vsContext.extensionPath, 'webview'))],
    });

    this._panel.webview.html = this._getHtmlForWebview();

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      (msg) => {
        if (msg.cmd) {
          this._onMessages[msg.cmd](msg);
        }
      },
      null,
      this._disposables
    );
  }

  public addListener(cmd: string, fn: (v: any) => any) {
    if (Reflect.has(this._onMessages, cmd)) {
      console.log(`已存在指令：${cmd}`);
    } else {
      this._onMessages[cmd] = fn;
    }
  }

  public postMessageWebview(object: any): void {
    this._panel.webview.postMessage(object);
  }

  public closeWindow() {
    this._panel.dispose();
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
    deactivate();
  }

  private _getHtmlForWebview(): string {
    const isDev = !!process.env.USE_DEV_UI;
    let html: string;
    if (isDev) {
      let buf = fs.readFileSync(path.join(Controller.vsContext.extensionPath, 'static/', 'index.html'));
      html = buf.toString();
    } else {
      const basePathOnDisk = vscode.Uri.file(path.join(Controller.vsContext.extensionPath, 'webview'));
      let buf = fs.readFileSync(path.join(Controller.vsContext.extensionPath, 'webview/', 'index.html'));
      html = buf
        .toString()
        .replace('<head>', `<head><base href="${this._panel.webview.asWebviewUri(basePathOnDisk)}/">`);
    }
    return html;
  }
}
