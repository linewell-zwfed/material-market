import * as vscode from 'vscode';

import { Controller } from './controller';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('material.materialMarket', (args) => {
    Controller.getInstance(context, args);
  });

  context.subscriptions.push(disposable);
}

export function deactivate(): void {
  Controller.dispose();
}
