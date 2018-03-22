
export class StringExpression {

    private _quotechar: string;
    private _contents: string;
    private _suffix: string;

    constructor(quotechar: string, contents: string, suffix: string) {
        this._quotechar  = quotechar;
        this._contents   = contents;
        this._suffix = (typeof suffix !== 'undefined') ? suffix : '';
    }

    /** Get the Quote Character used in the String */
    public getQuoteChar(): string {
        return this._quotechar;
    }

    /** Get Quoted String Contents */
    public getContents(): string {
        return this._contents;
    }

    /** Get any non-space characters after the string */
    public getSuffix(): string {
        return this._suffix;
    }
}
