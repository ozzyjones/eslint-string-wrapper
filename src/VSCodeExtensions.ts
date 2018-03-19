'use strict';

import {Range, window} from 'vscode';

export class VSCodeExtensions {

    /** Get the Range of the selected/highlighted text */
    public static getSelectedRange() {
        const selection = window.activeTextEditor.selection;
        return new Range(selection.start, selection.end);
    }

    /** Get the selected/highlighted text as a string */
    public static getSelectedText(range: Range) {
        return window.activeTextEditor.document.getText(range);
    }

    /**
     * Delete the given range from the active editor
     * @see https://github.com/Microsoft/vscode/issues/5886
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
