import { WrapperData } from '../data/data';
import { StringWrapper } from '../StringWrapper';

const MAX_LINE_120 = 120;
const MAX_LINE_40 = 40;
const wrapper = new StringWrapper();

test('simple javascript string', () => {
    const s = WrapperData.getSimpleJavascriptString();
    expect(wrapper.wrapString(s, MAX_LINE_120)).toMatchSnapshot();
});

test('simple javascript string with let', () => {
    const s = WrapperData.getSimpleJavscriptStringWithLet();
    expect(wrapper.wrapString(s, MAX_LINE_120)).toMatchSnapshot();
});

test('simple string', () => {
    const s = WrapperData.getSimpleString();
    expect(wrapper.wrapString(s, MAX_LINE_120)).toMatchSnapshot();
});

test('simple unformatted string', () => {
    const s = WrapperData.getSimpleUnformattedString();
    expect(() => {
        wrapper.wrapString(s, MAX_LINE_120);
    }).toThrowErrorMatchingSnapshot();
});

test('long string', () => {
    const s = WrapperData.getLongString();
    expect(wrapper.wrapString(s, MAX_LINE_120)).toMatchSnapshot();
});

test('long string, 40 characters per line', () => {
    const s = WrapperData.getLongString();
    expect(wrapper.wrapString(s, MAX_LINE_40)).toMatchSnapshot();
});

test('long javascript expression', () => {
    const s = WrapperData.getLongJavascriptExpression();
    expect(wrapper.wrapString(s, MAX_LINE_120)).toMatchSnapshot();
});

test('max line length = 0', () => {
    const s = WrapperData.getSimpleString();
    const n = 0;
    expect(() => {
        wrapper.wrapString(s, n);
    }).toThrowErrorMatchingSnapshot();
});

test('max line length = 1/2', () => {
    const s = WrapperData.getSimpleString();
    const n = 0.5;
    expect(() => {
        wrapper.wrapString(s, n);
    }).toThrowErrorMatchingSnapshot();
});

test('max line length = -1', () => {
    const s = WrapperData.getSimpleString();
    const n = -1;
    expect(() => {
        wrapper.wrapString(s, n);
    }).toThrowErrorMatchingSnapshot();
});

test('max line length = 1', () => {
    const s = WrapperData.getSimpleString();
    const n = 1;
    expect(wrapper.wrapString(s, n)).toMatchSnapshot();
});

test('max line length = 1.5', () => {
    const s = WrapperData.getSimpleString();
    const n = 1.5;
    expect(wrapper.wrapString(s, n)).toMatchSnapshot();
});
