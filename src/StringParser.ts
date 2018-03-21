import { StringExpression } from '../src/StringExpression';
export class StringExpressionParser {

    public parseExpression(text: string): StringExpression {
        return this._parseStringExpression(text);
    }

    private _parseStringExpression(text: string): StringExpression {
        const pattern = /(["'])(.*)["']/g;
        const regex = new RegExp(pattern);
        const matches = regex.exec(text);
        if (matches !== null) {
            return new StringExpression(matches[1], matches[2]);
        } else {
            return null;
        }
    }
}
