'use strict';

import {commands, debug, Disposable, ExtensionContext, Position,
    Range, Selection, SnippetString, StatusBarAlignment,
    StatusBarItem, TextDocument, TextEditorSelectionChangeEvent, window} from 'vscode';
import {JavascriptExpressionParser} from './JavascriptExpressionParser';
import { StringExpressionParser } from './StringParser';

export class StringWrapper {

    private _statusBarItem: StatusBarItem;

    /**
     * wrapString
     */
    public wrapString() {
        const quoteCharacter = "'";
        const chuckSize = 120;

        const range = this._getSelectedRange();
        let text = this._getSelectedText(range);
        const jsParser = new JavascriptExpressionParser();
        const jsExpression = jsParser.parseExpression(text);
        const isJavascriptExpression = (jsExpression !== null);
        if (isJavascriptExpression) {
            text = jsExpression.contents;
        } else {
            const strParser = new StringExpressionParser();
            const strExpression = strParser.parseExpression(text);
            const isStringExpression = (strExpression !== null);
            if (isStringExpression) {
                text = strExpression.contents;
            } else {
                window.showErrorMessage('Input is not a valid Javascript expression or string expression.');
                return;
            }
        }
        debug.activeDebugConsole.appendLine(`Current Selection Size: ${text.length}`);

        const pieces = this._chuckString(text, chuckSize);
        const wrappedString = this._join(pieces, quoteCharacter);
        debug.activeDebugConsole.appendLine('Wrapped String:');
        debug.activeDebugConsole.appendLine(wrappedString);

        let writeStr = wrappedString;
        if (isJavascriptExpression) {
            writeStr = `${jsExpression.type} ${jsExpression.varname} = \n${wrappedString};`;
        } else {
            writeStr = `\n${wrappedString}`
        }
        this._replaceExpression(range, writeStr);
    }

    public dispose() {
        this._statusBarItem.dispose();
    }

    /** Get the Range of the selected/highlighted text */
    private _getSelectedRange() {
        const selection = window.activeTextEditor.selection;
        return new Range(selection.start, selection.end);
    }

    /** Get the selected/highlighted text as a string */
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
        window.activeTextEditor.edit((builder) => {
            builder.delete(range);
        });
    }

    private _chuckString(str: string, len: number) {
        const size = Math.ceil(str.length / len);
        const ret = new Array(size);
        let offset;

        for (let i = 0; i < size; i++) {
            offset = i * len;
            ret[i] = str.substring(offset, offset + len);
        }
        return ret;
    }

    private _join(pieces: string[], quoteCharacter: string) {
        let s = '';
        for (let i = 0; i < pieces.length; i++) {
            const line = pieces[i];
            s += `${quoteCharacter}${line}${quoteCharacter}`;

            if (i !== pieces.length - 1) {
                s +=  ' + \n';
            }
        }
        return s;
    }

    // Puts the new string on the line below the last line of the other
    private _replaceExpression(range: Range, str: string) {

        window.activeTextEditor.edit((builder) => {
            builder.replace(range, str);
        });
    }
}
