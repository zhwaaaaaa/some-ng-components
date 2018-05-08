import {SingleMapPipe} from './single-map.pipe';
import {Option} from '../common-class/option.class';

describe('SingleMapPipe', () => {
    it('----------SingleMapPipe', () => {
        const pipe = new SingleMapPipe();
        const opts: Option[] = [
            {label: '一', value: '1'},
            {label: '二', value: '2'},
            {label: '三', value: '3'},
            {label: '四', value: '4'},
            {label: '五', value: '5'},
        ];
        const val = pipe.transform('1', opts);
        /**
         * 预测值和实际值不一致，将抛出异常
         */
        expect(val).toEqual('一');

        expect(pipe.transform('2', opts)).toEqual('二');
        expect(pipe.transform('1;2', opts)).toEqual('');
        expect(pipe.transform('', opts)).toEqual('');
    });
});
