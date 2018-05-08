import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[dialog-host]'
})
export class DialogHostDirective {

    constructor(public viewContainerRef: ViewContainerRef) {
    }

}
