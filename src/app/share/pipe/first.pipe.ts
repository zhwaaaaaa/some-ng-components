import {Pipe, PipeTransform} from '@angular/core';
import {StrToArrPipe} from './str-to-arr.pipe';


/**
 * 项目中很多是以JSON字符串数组或者";"分号分割保存的字段，
 * 但是使用的时候往往取得时第一个值,当传进来的数组无法转化为数组时或者当数组长度为0的时候返回expVal
 * 字符串数据转数组用的是 strToArr
 * @See StrToArrPipe
 * [1,2]|first ==> 1
 * []|first:100 ==> 100
 */

@Pipe({
    name: 'first'
})
export class FirstPipe implements PipeTransform {

    public static readonly INSTANCE = new FirstPipe();

    transform(value: any, expVal?: any): any {
        value = StrToArrPipe.INSTANCE.transform(value);
        if (Array.isArray(value) && value.length > 0) {
            return value[0];
        }
        return expVal;
    }

}
