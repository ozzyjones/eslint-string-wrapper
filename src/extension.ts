'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, TextEditorSelectionChangeEvent, Selection, debug, Range, Position, SnippetString} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "eslint-max-line-string-wrapper" is now active!');

    let stringWrapper = new StringWrapper();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.wrapString', () => {
        // The code you place here will be executed every time your command is executed

        stringWrapper.wrapString();
    });

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
        const quoteCharacter = "'";
        const chuckSize = 120;

        let range = this._getSelectedRange();
        let text = this._getSelectedText(range);
        let expression = this._parseJavascriptExpression(text);
        let isJavascriptExpression = (expression !== null);
        if (isJavascriptExpression){
            text = expression.contents;
        } else {
            window.showErrorMessage("Input is not a valid Javascript expression.");
            return;
        }
        debug.activeDebugConsole.appendLine(`Current Selection Size: ${text.length}`);

        let pieces = this._chuckString(text, chuckSize);
        let wrappedString = this._join(pieces, quoteCharacter);
        debug.activeDebugConsole.appendLine("Wrapped String:")
        debug.activeDebugConsole.appendLine(wrappedString)

        let writeStr = wrappedString;
        if (isJavascriptExpression) {
            writeStr = `${expression.type} ${expression.varname} = \n${wrappedString};`;
        }
        this._writeNewString(writeStr);
    }

    /** Get the Range of the selected/highlighted text */
    private _getSelectedRange() {
        let selection = window.activeTextEditor.selection;
        return new Range(selection.start, selection.end);
    }

    /** Get the selected/highlighted text as a string*/
    private _getSelectedText(range: Range) {
        return window.activeTextEditor.document.getText(range);
    }

    private _parseJavascriptExpression(text:string) {
        // No Named Captures in JS:
        // const pattern = /(?<type>var|let)\s*(?<varname>\w*)\s*=\s*(?<quotechar>[\"\'])(?<contents>[\w]*)[\"\']/g;
        const pattern = /(var|let)\s*(\w*)\s*=\s*(["'])([\w]*)["']/g;
        let regex = new RegExp(pattern);
        let matches = regex.exec(text);
        if(matches !== null) {
            return {
                type:       matches[1],
                varname:    matches[2],
                quotechar:  matches[3],
                contents:   matches[4]
            };
        } else {
            return null;
        }
    }

    private _chuckString(str:string, len:number) {
        let size = Math.ceil(str.length/len),
            ret = new Array(size),
            offset;

        for (let i = 0; i < size; i++) {
            offset = i * len;
            ret[i] = str.substring(offset, offset+len);
        }
        return ret;
    }

    private _join(pieces:Array<string>, quoteCharacter:string) {
        let s = "";
        for (let i = 0; i < pieces.length; i++) {
            const line = pieces[i];
            s += `${quoteCharacter}${line}${quoteCharacter}`;

            if(i !== pieces.length-1){
                s +=  "+ \n";
            }
        }
        return s;
    }

    // Puts the new string on the line below the last line of the other
    private _writeNewString(str:string) {
        let selection = window.activeTextEditor.selection;
        let nextLocation = new Position(selection.end.line + 1, selection.start.character);
        let snippet = new SnippetString(str);
        window.activeTextEditor.insertSnippet(snippet, nextLocation);
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}