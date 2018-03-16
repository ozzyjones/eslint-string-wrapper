import { StringExpressionParser } from "../StringParser";

const StringParser = require('../StringParser');

const parser = new StringExpressionParser();

test('parse simple formatted string', () => {
    expect(parser.parseExpression("'abc'").contents).toBe('abc');
});