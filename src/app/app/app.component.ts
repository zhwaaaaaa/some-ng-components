import {Component} from '@angular/core';
import {Option} from '../share/common-class/option.class';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    opts: Option[] = [
        {label: 'aa', value: 1},
        {label: 'bb', value: 2},
        {label: 'cc', value: 3},
    ];
}
