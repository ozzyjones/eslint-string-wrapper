
export class WrapperData {
    
    public static getSimpleJavascriptString(): string {
        return "var a = 'abc';";
    }

    public static getSimpleInvertedJavascriptString(): string {
        return this._invertQuotationMarks(this.getSimpleJavascriptString());
    }

    public static getSimpleJavscriptStringWithLet(): string {
        let baseStr = this.getSimpleJavascriptString();
        return baseStr.replace('var', 'let');
    }

    public static getSimpleString(): string {
        return "'abc'";
    }

    public static getSimpleStringWithSuffix(): string {
        return this.getSimpleString() + ';';
    }

    public static getSimpleInvertedString(): string {
        return this._invertQuotationMarks(this.getSimpleString());
    }

    public static getSimpleUnformattedString(): string {
        return 'abc';
    }

    public static getLongString(): string {
        var s = "'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf'";
        return s;
    }

    public static getLongStringWithSuffix(): string {
        return this.getLongString() + ';';
    }

    public static getLongJavascriptExpression(): string {
        var s = "var a = 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf';";
        return s;
    }

    public static getLongInvertedJavascriptExpression(): string {
        return this._invertQuotationMarks(this.getLongJavascriptExpression());
    }

    private static _invertQuotationMarks(text: string): string {
        const SINGLE_QUOTE = "'";
        const DOUBLE_QUOTE = '"';

        let s = '';
        for (let char of text) {
            switch(char) {
                case SINGLE_QUOTE: {
                    s += DOUBLE_QUOTE;
                    break;
                }
                case DOUBLE_QUOTE: {
                    s += SINGLE_QUOTE;
                    break;
                }
                default: {
                    s += char;
                    break;
                }
            }
        }
        return s;
    }
}
