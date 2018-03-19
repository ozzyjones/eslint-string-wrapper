
export class StringExpressionParser {

    public parseExpression(text: string) {
        return this._parseStringExpression(text);
    }

    private _parseStringExpression(text: string) {
        const pattern = /(["'])(.*)["']/g;
        const regex = new RegExp(pattern);
        const matches = regex.exec(text);
        if (matches !== null) {
            return new StringExpression(matches);
        } else {
            return null;
        }
    }
}

class StringExpression {

    private _quotechar: string;
    private _contents: string;

    constructor(matches: RegExpExecArray) {
        this._quotechar  = matches[1];
        this._contents   = matches[2];
    }

    /** Get the Quote Character used in the String */
    public getQuoteChar() : string {
        return this._quotechar;
    }

    /** Get Quoted String Contents */
    public getContents() : string {
        return this._contents;
    }
}
