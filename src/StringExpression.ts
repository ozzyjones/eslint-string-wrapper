
export class StringExpression {

    private _quotechar: string;
    private _contents: string;

    constructor(quotechar: string, contents: string) {
        this._quotechar  = quotechar;
        this._contents   = contents;
    }

    /** Get the Quote Character used in the String */
    public getQuoteChar(): string {
        return this._quotechar;
    }

    /** Get Quoted String Contents */
    public getContents(): string {
        return this._contents;
    }
}
