import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { EXTENSION_COMMANDS } from './constants/commands';

import * as snippets from './snippets/snippets.json';
import { Controller } from './controller';

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

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('material.materialMarket', (args) => {
    let defaultPath = args?.path ?? '';
    Controller.getInstance(context);

    Controller.addMessageListener(EXTENSION_COMMANDS.GET_FILE_PATH, async (message) => {
      const res = await vscode.window.showOpenDialog(message.payload);
      Controller.handleValidMessage({
        ...message,
        payload: res,
      });
    });

    Controller.addMessageListener(EXTENSION_COMMANDS.CREATE_FILE, async (message) => {
      const options = message.payload;
      let fileContent: string = '';

      let obj = Object.values(snippets).find((el) => el.prefix === options.snippetPrefix);
      if (obj) {
        fileContent = obj.body.join('\n');
      } else {
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

    Controller.addMessageListener(EXTENSION_COMMANDS.GET_DEFAULT_PATH, async (message) => {
      Controller.handleValidMessage({
        ...message,
        payload: defaultPath,
      });
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate(): void {
  Controller.dispose();
}
