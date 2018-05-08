import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {DialogHostDirective} from '../directive/dialog-host.directive';
import {DialogStyle} from '../dialog-api';

const CLOSE_ANI_TIME = 120;

@Component({
    selector: 'dialog-container',
    templateUrl: './dialog-container.component.html',
    animations: [
        trigger('dialogInout', [
            state('in', style({transform: 'scale(1) translateY(0)'})),
            transition('void => *', [
                animate(150, keyframes([
                    style({opacity: 0, transform: 'scale(0.4) translateY(300px)', offset: 0}),
                    style({opacity: 0.8, transform: 'scale(1.2) translateY(-30px)', offset: 0.75}),
                    style({opacity: 1, transform: 'scale(1.0) translateY(0)', offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate(CLOSE_ANI_TIME, keyframes([
                    style({opacity: 1, transform: 'scale(1.0) translateY(0)', offset: 0}),
                    style({opacity: 0, transform: 'scale(0.4) translateY(300px)', offset: 1.0})
                ]))
            ])
        ]),
    ]
})
export class DialogContainerComponent implements AfterViewInit, OnDestroy {

    private static dialogNum: number = 0;
    private static maxZIndex: number = 0;
    private static zIndex: number = 2000;

    @ViewChild(DialogHostDirective)
    dialogHost: DialogHostDirective;

    @ViewChild('overlay')
    overlay: ElementRef;

    @ViewChild('dialog')
    dialog: ElementRef;

    private dialogWidth: number = 500;

    showing: boolean = true;

    private onClose: Function;
    private onOpen: Function;

    constructor(private render: Renderer2) {
    }

    ngAfterViewInit(): void {
        // 判断当前对话框显示了几个。如果有多个DialogContainerComponent.maxZIndex++
        if (DialogContainerComponent.dialogNum++ !== 0) {
            DialogContainerComponent.maxZIndex++;
        }
        const value = DialogContainerComponent.zIndex + DialogContainerComponent.maxZIndex;
        this.render.setStyle(this.overlay.nativeElement, 'z-index', value);
    }

    getContentViewContainer(): ViewContainerRef {
        return this.dialogHost.viewContainerRef;
    }

    setStyle(dialogStyle: DialogStyle = {}): void {

        const dialog = this.dialog.nativeElement;

        if (dialogStyle.background) {
            this.render.setStyle(dialog, 'background', dialogStyle.background);
        }
        if (dialogStyle.padding) {
            this.render.setStyle(dialog, 'padding', dialogStyle.padding);
        }
        if (dialogStyle.borderRadius) {
            this.render.setStyle(dialog, 'borderRadius', dialogStyle.borderRadius);
        }
    }

    fixPosition(width?: number): void {
        if (width) {
            this.dialogWidth = width;
        }

        const dialog = this.dialog.nativeElement;

        dialog.style.opacity = 0;
        dialog.style.width = this.dialogWidth + 'px';
        // dialog.style.marginLeft = -9999 + 'px';
        const marginTop = -dialog.clientHeight / 2;
        dialog.style.marginTop = marginTop + 'px';
        dialog.style.marginLeft = -this.dialogWidth / 2 + 'px';
        dialog.style.opacity = 1;
    }

    onOpenAnimateEnd(cb): void {
        this.onOpen = cb;
    }

    onCloseAnimateEnd(cb): void {
        this.onClose = cb;
    }

    doDrop(): void {
        this.showing = false;
    }

    doDestroy() {
        if (!this.showing) {
            this.onClose();
        } else {
            this.onOpen();
        }
    }

    // XXX:怎么没执行，
    onClickDialog(e: MouseEvent): void {
        e.stopImmediatePropagation();
        e.stopPropagation();
    }

    onClickOuter(evt: MouseEvent): void {
    }

    doOnClickOuter(evt: MouseEvent): void {
        // 阻止事件是在对话框内部触发的，没有执行到onClickDialog，
        // 用这里判断是不是对话框内部冒泡起来的
        if (evt.srcElement === this.overlay.nativeElement) {
            this.onClickOuter(evt);
        }
    }

    ngOnDestroy(): void {
        if (--DialogContainerComponent.dialogNum === 0) {
            DialogContainerComponent.maxZIndex = 0;
        }
    }
}

