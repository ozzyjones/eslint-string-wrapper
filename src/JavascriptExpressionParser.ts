import { JavascriptExpression } from './JavascriptExpression';
export class JavascriptExpressionParser {

    public parseExpression(text: string): JavascriptExpression {
        return this._parseJavascriptExpression(text);
    }

    private _parseJavascriptExpression(text: string): JavascriptExpression {
        // No Named Captures in JS:
        // const pattern = /(?<type>var|let)\s*(?<varname>\w*)\s*=\s*(?<quotechar>[\"\'])(?<contents>[\w]*)[\"\']/g;
        const pattern = /(var|let)\s*(\w*)\s*=\s*(["'])(.*)["']([\S])?/g;
        const regex = new RegExp(pattern);
        const matches = regex.exec(text);
        if (matches !== null) {
            return new JavascriptExpression(
                matches[3],
                matches[4],
                matches[1],
                matches[2],
                matches[5],
            );
        } else {
            return null;
        }
    }
}
