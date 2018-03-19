
export class JavascriptExpressionParser {

    public parseExpression(text: string): JavascriptExpression {
        return this._parseJavascriptExpression(text);
    }

    private _parseJavascriptExpression(text: string): JavascriptExpression {
        // No Named Captures in JS:
        // const pattern = /(?<type>var|let)\s*(?<varname>\w*)\s*=\s*(?<quotechar>[\"\'])(?<contents>[\w]*)[\"\']/g;
        const pattern = /(var|let)\s*(\w*)\s*=\s*(["'])(.*)["']/g;
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

    private _type: string;
    private _varname: string;
    private _quotechar: string;
    private _contents: string;

    constructor(matches: RegExpExecArray) {
        this._type       = matches[1];
        this._varname    = matches[2];
        this._quotechar  = matches[3];
        this._contents   = matches[4];
    }

    public getType(): string {
        return this._type;
    }

    public getVarname(): string {
        return this._varname;
    }

    public getQuotechar(): string {
        return this._quotechar;
    }

    public getContents(): string {
        return this._contents;
    }
}
