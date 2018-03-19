import { WrapperData } from '../data/data';
import { StringWrapper } from '../StringWrapper';

const MAX_LINE_120 = 120;
const wrapper = new StringWrapper();

test('simple javascript string', () => {
    const s = WrapperData.getSimpleJavascriptString();
    expect(wrapper.wrapString(s, MAX_LINE_120)).toMatchSnapshot();
});
