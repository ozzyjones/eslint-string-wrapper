
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

    public quotechar: string;
    public contents: string;

    constructor(matches: RegExpExecArray) {
        this.quotechar  = matches[1];
        this.contents   = matches[2];
    }
}
