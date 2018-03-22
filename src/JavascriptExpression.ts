import { StringExpression } from './StringExpression';

export class JavascriptExpression extends StringExpression {

    private _type: string;
    private _varname: string;

    constructor(
        quotechar: string,
        contents: string,
        type: string,
        varname: string,
        suffix: string) {
        super(quotechar, contents, suffix);
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
