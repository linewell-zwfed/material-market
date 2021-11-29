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
	if(fs.existsSync(fullpath)) {
		vscode.window.showErrorMessage('已存在同名文件！！');
		return;
	}
	mkdirp(filePath).then(made => {
		console.log(`made directories, starting with ${made}`);
		fs.writeFile(fullpath, fileContent, cb);
	}).catch(cb);
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('material.materialMarket', (args) => {
		let defaultPath = args?.path ?? '';
	  const webviewPanel =	WebviewPanel.getInstance(context, async message => {
			if (message.cmd === EXTENSION_COMMANDS.GET_FILE_PATH) {
				const res = await	vscode.window.showOpenDialog(message.payload);
				webviewPanel.postMessageWebview({
					...message,
					payload: res,
				});

			} else if (message.cmd === EXTENSION_COMMANDS.CREATE_FILE) {
				const options = message.payload;
				let fileContent: string = '';

			  let obj =	Object.values(snippets).find(el => el.prefix === options.snippetPrefix);
				if (obj) {
					fileContent = obj.body.join('\n');
				} else {
					return;
				}

				writeFile(options.filePath, options.fileName, fileContent,  err => {
					if (err) {
						vscode.window.showErrorMessage('创建文件失败!!!');
					} else {
						vscode.window.showInformationMessage('创建成功!!!');
						webviewPanel.closeWindow();
					}
				});

			} else if (message.cmd === EXTENSION_COMMANDS.GET_DEFAULT_PATH) {
				webviewPanel.postMessageWebview({
					...message,
					payload: defaultPath,
				});
				
			}
		});
	});

	context.subscriptions.push(disposable);
}
