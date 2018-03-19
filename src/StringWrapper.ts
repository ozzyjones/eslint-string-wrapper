'use strict';

import { JavascriptExpressionParser } from './JavascriptExpressionParser';
import { StringExpressionParser } from './StringParser';
import { VSCodeExtensions } from './VSCodeExtensions';

export class StringWrapper {

    /**
     * wrapString
     */
    public wrapString() {
        const quoteCharacter = "'";
        const chuckSize = 120;

        const range = VSCodeExtensions.getSelectedRange();
        let text = VSCodeExtensions.getSelectedText(range);
        const jsParser = new JavascriptExpressionParser();
        const jsExpression = jsParser.parseExpression(text);
        const isJavascriptExpression = (jsExpression !== null);
        if (isJavascriptExpression) {
            text = jsExpression.getContents();
        } else {
            const strParser = new StringExpressionParser();
            const strExpression = strParser.parseExpression(text);
            const isStringExpression = (strExpression !== null);
            if (isStringExpression) {
                text = strExpression.getContents();
            } else {
                throw new Error('Input is not a valid Javascript expression or string expression.');
            }
        }

        const pieces = this._chuckString(text, chuckSize);
        const wrappedString = this._join(pieces, quoteCharacter);

        let writeStr = wrappedString;
        if (isJavascriptExpression) {
            writeStr = `${jsExpression.getType()} ${jsExpression.getVarname()} = \n${wrappedString};`;
        } else {
            writeStr = `\n${wrappedString}`;
        }
        VSCodeExtensions.replaceRange(range, writeStr);
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
}
