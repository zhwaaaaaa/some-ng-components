import {Directive, Input, TemplateRef} from '@angular/core';
import {environment} from '../../../environments/environment';

@Directive({
    selector: '[tabContent]'
})
export class TabContentDirective {

    @Input('tabContent')
    tabKey: any;

    constructor(public template: TemplateRef<any>) {
        if (!environment.production) {
            if (!template) {
                throw new Error('tabContent direct ng-template or use *tabContent');
            }
        }
    }

}
