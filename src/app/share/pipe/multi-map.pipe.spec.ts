import {MultiMapPipe} from './multi-map.pipe';
import {Option} from '../common-class/option.class';

describe('MultiMapPipe', () => {
    it('MultiMapPipe校验正确', () => {
        const pipe = new MultiMapPipe();
        const opts: Option[] = [
            {label: '一', value: '1'},
            {label: '二', value: '2'},
            {label: '三', value: '3'},
            {label: '四', value: '4'},
            {label: '五', value: '5'},
        ];

        const val = pipe.transform('1;3;2', opts);
        expect(val).toEqual('一、三、二');
    });
});
