'use strict'

import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, TextEditorSelectionChangeEvent, Selection, debug, Range, Position, SnippetString} from 'vscode';

export class StringWrapper {

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
        this._replaceExpression(range, writeStr);
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

    /** @see https://github.com/Microsoft/vscode/issues/5886 for example on how to 
     * replace some code.  Leverage this example to delete some code from in the 
     * active editor.
     * @deprecated A separate method is no longer needed; this is already 
     * handled in the this._replaceExpression(...) method.
     */
    private _deleteSelected(range: Range) {
        window.activeTextEditor.edit(builder => {
            builder.delete(range);
        });
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
    private _replaceExpression(range: Range, str:string) {
        
        window.activeTextEditor.edit(builder => {
            builder.replace(range, str);
        });
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}