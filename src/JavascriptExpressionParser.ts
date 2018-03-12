
export class JavascriptExpressionParser {

    public parseExpression (text: string) {
        return this._parseJavascriptExpression(text);
    }

    private _parseJavascriptExpression(text:string) {
        // No Named Captures in JS:
        // const pattern = /(?<type>var|let)\s*(?<varname>\w*)\s*=\s*(?<quotechar>[\"\'])(?<contents>[\w]*)[\"\']/g;
        const pattern = /(var|let)\s*(\w*)\s*=\s*(["'])([\w]*)["']/g;
        let regex = new RegExp(pattern);
        let matches = regex.exec(text);
        if(matches !== null) {
            return {
                type:       matches[1],
                varname:    matches[2],
                quotechar:  matches[3],
                contents:   matches[4]
            };
        } else {
            return null;
        }
    }
}