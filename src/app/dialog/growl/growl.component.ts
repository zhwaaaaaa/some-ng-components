import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy} from '@angular/core';
import {Growl, GrowlState} from '../growl-api';
import {Subscription} from 'rxjs/Subscription';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-growl',
    templateUrl: './growl.component.html',
    animations: [
        trigger('growlInOut', [
            state('in', style({transform: 'scale(1) translateY(0)'})),
            transition('void => *', [
                animate(250, keyframes([
                    style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(-30%)', offset: 0.75}),
                    style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate(250, keyframes([
                    style({opacity: 1, transform: 'translateX(0)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(-30%)', offset: 0.25}),
                    style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
                ]))
            ])
        ])
    ]
})
export class GrowlComponent implements AfterViewInit, OnDestroy {

    value: Growl[] = [];
    private subscription: Subscription;

    constructor(private changeRef: ChangeDetectorRef,
                private ele: ElementRef,
                @Inject(DOCUMENT) private doc: Document) {
        this.doc.body.appendChild(this.ele.nativeElement);
        this.changeRef.detach();
    }

    ngAfterViewInit(): void {

    }

    refresh(): void {
        this.changeRef.detectChanges();
    }

    growlClosed(g: Growl): void {
        if (this.value.indexOf(g) !== -1) {
            g.sendState(GrowlState.Showing);
        } else {
            g.sendState(GrowlState.Dismissed);
        }
    }

    closeGrowl(g: Growl): void {
        g.dismiss();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.ele.nativeElement.parent.removeChild(this.ele.nativeElement);
    }

}
