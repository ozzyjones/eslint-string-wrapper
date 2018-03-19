'use strict'

import {Range, window} from 'vscode';

export class VSCodeExtensions {
    
    /** Get the Range of the selected/highlighted text */
    public static getSelectedRange() {
        window.activeTextEditor.selection;
        const selection = window.activeTextEditor.selection;
        return new Range(selection.start, selection.end);
    }

    /** Get the selected/highlighted text as a string */
    public static getSelectedText(range: Range) {
        return window.activeTextEditor.document.getText(range);
    }


     /** @see https://github.com/Microsoft/vscode/issues/5886 for example on how to
     * replace some code.  Leverage this example to delete some code from in the
     * active editor.
     * @deprecated A separate method is no longer needed; this is already
     * handled in the this._replaceExpression(...) method.
     */
    public static deleteSelectedRange(range: Range) {
        window.activeTextEditor.edit((builder) => {
            builder.delete(range);
        });
    }

    /** Replace a given range with a given string */
    public static replaceRange(range: Range, str: string) {

        window.activeTextEditor.edit((builder) => {
            builder.replace(range, str);
        });
    }
}