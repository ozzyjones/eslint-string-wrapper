import { StringExpressionParser } from '../StringParser';

const parser = new StringExpressionParser();

test('parse simple formatted string', () => {
    expect(parser.parseExpression("'abc'").getContents()).toBe('abc');
});

test('missing front quote', () => {
    expect(parser.parseExpression("abc'")).toBeNull();
});

test('missing back quote', () => {
    expect(parser.parseExpression("'abc")).toBeNull();
});
