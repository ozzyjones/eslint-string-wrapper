
export class JavascriptExpressionParser {

    public parseExpression(text: string) {
        return this._parseJavascriptExpression(text);
    }

    private _parseJavascriptExpression(text: string) {
        // No Named Captures in JS:
        // const pattern = /(?<type>var|let)\s*(?<varname>\w*)\s*=\s*(?<quotechar>[\"\'])(?<contents>[\w]*)[\"\']/g;
        const pattern = /(var|let)\s*(\w*)\s*=\s*(["'])([\w]*)["']/g;
        const regex = new RegExp(pattern);
        const matches = regex.exec(text);
        if (matches !== null) {
            return new JavascriptExpression(matches);
        } else {
            return null;
        }
    }
}

class JavascriptExpression {

    public type: string;
    public varname: string;
    public quotechar: string;
    public contents: string;

    constructor(matches: RegExpExecArray) {
        this.type       = matches[1];
        this.varname    = matches[2];
        this.quotechar  = matches[3];
        this.contents   = matches[4];
    }
}
