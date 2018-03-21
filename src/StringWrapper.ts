'use strict';

import { JavascriptExpressionParser } from './JavascriptExpressionParser';
import { StringExpressionParser } from './StringParser';
import { VSCodeExtensions } from './VSCodeExtensions';

export class StringWrapper {

    private quoteCharacter: string;

    /**
     * Wrap a string onto multiple lines
     *
     * @param {string} inputStr String to be wrapped
     * @param {number} maxLineLength The length of the string content at which to wrap the string
     * @returns {string} Wrapped string
     */
    public wrapString(inputStr: string, maxLineLength: number): string {
        if (maxLineLength < 1) {
            throw new Error(`Max line length must be 1 or greater.  Given: ${maxLineLength}`);
        }

        const chunkSize = Math.floor(maxLineLength || 120);

        const jsParser = new JavascriptExpressionParser();
        const jsExpression = jsParser.parseExpression(inputStr);
        const isJavascriptExpression = (jsExpression !== null);
        if (isJavascriptExpression) {
            inputStr = jsExpression.getContents();
            this._setQuoteCharacter(jsExpression.getQuoteChar());
        } else {
            const strParser = new StringExpressionParser();
            const strExpression = strParser.parseExpression(inputStr);
            const isStringExpression = (strExpression !== null);
            if (isStringExpression) {
                inputStr = strExpression.getContents();
                this._setQuoteCharacter(strExpression.getQuoteChar());
            } else {
                throw new Error('Input is not a valid Javascript expression or string expression.');
            }
        }

        const pieces = this._chunkString(inputStr, chunkSize);
        const wrappedString = this._join(pieces, this.quoteCharacter);

        let writeStr = wrappedString;
        if (isJavascriptExpression) {
            writeStr = `${jsExpression.getType()} ${jsExpression.getVarname()} = \n${wrappedString};`;
        } else {
            writeStr = `\n${wrappedString}`;
        }
        return writeStr;
    }

    private _chunkString(str: string, len: number): string[] {
        const size = Math.ceil(str.length / len);
        const ret = new Array(size);
        let offset;

        for (let i = 0; i < size; i++) {
            offset = i * len;
            ret[i] = str.substring(offset, offset + len);
        }
        return ret;
    }

    private _join(pieces: string[], quoteCharacter: string): string {
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

    private _setQuoteCharacter(quoteCharacter: string) {
        this.quoteCharacter = quoteCharacter;
    }
}
