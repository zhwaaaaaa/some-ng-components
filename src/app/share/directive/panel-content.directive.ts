import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[panelContent]'
})
export class PanelContentDirective {

    constructor(public ele: ElementRef) {
    }

}
