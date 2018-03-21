import { StringExpression } from '../src/StringExpression';
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
            return new JavascriptExpression(
                matches[3],
                matches[4],
                matches[1],
                matches[2],
            );
        } else {
            return null;
        }
    }
}

class JavascriptExpression extends StringExpression {

    private _type: string;
    private _varname: string;

    constructor(
        quotechar: string,
        contents: string,
        type: string,
        varname: string) {
        super(quotechar, contents);
        this._type = type;
        this._varname = varname;
    }

    public getType(): string {
        return this._type;
    }

    public getVarname(): string {
        return this._varname;
    }
}
