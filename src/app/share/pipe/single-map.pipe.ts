import {Pipe, PipeTransform} from '@angular/core';
import {Option} from '../common-class/option.class';

@Pipe({
    name: 'singleMap'
})
export class SingleMapPipe implements PipeTransform {
    static readonly INSTANCE = new SingleMapPipe();

    transform(value: any, args?: any): any {
        let opts: Option[];

        if (args && args.length > 0) {
            opts = args;
        } else {
            return '';
        }
        let label = '';
        for (const opt of opts) {
            if (opt.value === value) {
                label = opt.label;
                break;
            }
        }
        return label;
    }

}
