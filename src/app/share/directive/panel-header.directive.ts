import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[panelHeader]'
})
export class PanelHeaderDirective {

    constructor(public ele: ElementRef) {
    }

}
