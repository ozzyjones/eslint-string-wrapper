'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "eslint-max-line-string-wrapper" is now active!');

    let stringWrapper = new StringWrapper();
    let controller = new StringWrapperController(stringWrapper);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        stringWrapper.wrapString();
    });

    context.subscriptions.push(controller);
    context.subscriptions.push(stringWrapper);
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class StringWrapper {

    private _statusBarItem: StatusBarItem;

    /**
     * wrapString
     */
    public wrapString() {
        window.showInformationMessage("String Wrapped");
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}

class StringWrapperController {

    private _stringWrapper: StringWrapper;
    private _disposable: Disposable;

    constructor(stringWrapper: StringWrapper) {
        this._stringWrapper = stringWrapper;

        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions)
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        window.showInformationMessage("Selection Modified");
    }
}