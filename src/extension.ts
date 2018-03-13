'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {commands, debug, Disposable, ExtensionContext, Position, Range, Selection,
    SnippetString, StatusBarAlignment, StatusBarItem, TextDocument,
    TextEditorSelectionChangeEvent, window} from 'vscode';
import {StringWrapper} from './StringWrapper';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    debug.activeDebugConsole.appendLine(
        'Congratulations, your extension "eslint-max-line-string-wrapper" is now active!');

    const stringWrapper = new StringWrapper();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = commands.registerCommand('extension.wrapString', () => {
        // The code you place here will be executed every time your command is executed

        stringWrapper.wrapString();
    });

    context.subscriptions.push(stringWrapper);
    context.subscriptions.push(disposable);
}
