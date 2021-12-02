import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { WebviewPanel } from './webviewPanel';
import { EXTENSION_COMMANDS } from './constants/commands';

import * as snippets from './snippets/snippets.json';

function writeFile(filePath: string, fileName: string, fileContent: string, cb: (e: any) => void) {
  filePath = filePath.replace(/\/([a-zA-Z]:\/)/, '$1');
  let fullpath = path.join(filePath, fileName);
  if (fs.existsSync(fullpath)) {
    vscode.window.showErrorMessage('已存在同名文件！！');
    return;
  }
  mkdirp(filePath)
    .then((made) => {
      console.log(`made directories, starting with ${made}`);
      fs.writeFile(fullpath, fileContent, cb);
    })
    .catch(cb);
}

export class Controller {
  private static _instance: Controller | undefined;
  public static vsContext: vscode.ExtensionContext;
  public static webviewPanelCtx: WebviewPanel;
  public static vsArgs: any;

  private constructor(context: vscode.ExtensionContext) {
    Controller.vsContext = context;
    Controller.webviewPanelCtx = WebviewPanel.createOrShow();
    this.addListeners();
  }

  public static getInstance(context: vscode.ExtensionContext, args: any): Controller {
    this.vsArgs = args;
    if (this._instance) {
      WebviewPanel.createOrShow();
    } else {
      this._instance = new Controller(context);
    }
    return this._instance;
  }

  public addListeners() {
    Controller.webviewPanelCtx.addListener(EXTENSION_COMMANDS.GET_FILE_PATH, async (message) => {
      const res = await vscode.window.showOpenDialog(message.payload);
      Controller.handleValidMessage({
        ...message,
        payload: res,
      });
    });

    Controller.webviewPanelCtx.addListener(EXTENSION_COMMANDS.CREATE_FILE, async (message) => {
      const options = message.payload;
      let fileContent: string = '';

      let obj = Object.values(snippets).find((el) => el.prefix === options.snippetPrefix);
      if (obj) {
        fileContent = obj.body.join('\n');
      } else {
        vscode.window.showErrorMessage('找不到对应模板!!!');
        return;
      }

      writeFile(options.filePath, options.fileName, fileContent, (err) => {
        if (err) {
          vscode.window.showErrorMessage('创建文件失败!!!');
        } else {
          vscode.window.showInformationMessage('创建成功!!!');
          Controller.webviewPanelCtx.closeWindow();
        }
      });
    });

    Controller.webviewPanelCtx.addListener(EXTENSION_COMMANDS.GET_DEFAULT_PATH, async (message) => {
      let defaultPath = Controller.vsArgs?.path ?? '';
      Controller.handleValidMessage({
        ...message,
        payload: defaultPath,
      });
    });
  }

  public static handleValidMessage(msg: any) {
    this.webviewPanelCtx.postMessageWebview(msg);
  }

  public static dispose() {
    this._instance = undefined;
  }
}
