import {Component} from '@angular/core';
import {Option} from '../../share/common-class/option.class';


@Component({
    templateUrl: './select-exp.component.html'
})
export class SelectExpComponent {
    opts: Option[] = [
        {
            label: '武大郎',
            value: '1',
            payload: 'http://img4.imgtn.bdimg.com/it/u=253885511,321901685&fm=27&gp=0.jpg'
        },
        {
            label: '潘金莲',
            value: '2',
            payload: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2805114217,3173475301&fm=27&gp=0.jpg'
        },
        {
            label: '西门庆',
            value: '3',
            payload: 'http://img1.imgtn.bdimg.com/it/u=2426927244,2742053075&fm=27&gp=0.jpg'
        },
        {
            label: '武松',
            value: '4',
            payload:'http://img0.imgtn.bdimg.com/it/u=2676159527,1920665039&fm=27&gp=0.jpg'
        },
    ];
    value: string = '1';
}
