import {Directive, Input, TemplateRef} from '@angular/core';
import {environment} from '../../../environments/environment';

@Directive({
    selector: '[tabTitle]'
})
export class TabTitleDirective {

    @Input('tabTitle')
    tabKey: any;

    constructor(public template: TemplateRef<any>) {
        if (!environment.production) {
            if (!template) {
                throw new Error('tabTitle direct ng-template or use *tabTitle');
            }
        }
    }

}
