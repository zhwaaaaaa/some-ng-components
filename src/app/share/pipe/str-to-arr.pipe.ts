import {Pipe, PipeTransform} from '@angular/core';
import isString from 'lodash-es/isString';


/**
 * 将字符串分割为数组，优先级从高到低
 * "['a','2','3','4']"=>['a','2','3','4']
 * "a;2;3;4"=>['a','2','3','4']
 * ['1','2','3'] => 自身转化 ['1','2','3']
 * "" => []
 * any => any
 */
@Pipe({
    name: 'strToArr'
})
export class StrToArrPipe implements PipeTransform {

    public static readonly INSTANCE = new StrToArrPipe();

    transform(value: any, args?: any): string[] {
        if (isString(value)) {
            if (!value) {
                return [];
            }
            if (value.startsWith('[')) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    // ignore
                }
            }
            if (value.indexOf(';') !== -1) {
                return value.split(';');
            }

            return [value];

        } else if (Array.isArray(value)) {
            return [...value];
        } else {
            return value;
        }
    }

}
