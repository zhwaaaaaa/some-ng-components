import {StrToArrPipe} from './str-to-arr.pipe';
import {Pipe, PipeTransform} from '@angular/core';
import {Option} from '../common-class/option.class';

@Pipe({
    name: 'multiMap'
})
export class MultiMapPipe implements PipeTransform {

    transform(value: any, opts?: Option[], split: string = '、'): any {
        if (!opts && opts.length === 0) {
            return '';
        }
        value = StrToArrPipe.INSTANCE.transform(value);
        return value
            .map(item => {
                let label = null;
                for (const opt of opts) {
                    if (opt.value === item) {
                        label = opt.label;
                        break;
                    }
                }
                return label;
            })
            .filter(item => item !== null).join(split);
    }

}
