import {
    Directive, DoCheck, ElementRef, EmbeddedViewRef, EventEmitter, Input, OnDestroy, Output, Renderer2, TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {DomHelperService} from '../utils/dom-helper.service';
import {environment} from '../../../environments/environment';
import {Overlay, OverlayService} from '../../dialog/service/overlay.service';
import {Subscription} from 'rxjs/Subscription';


@Directive({
    selector: 'backOverlay'
})
export class BackOverlayDirective implements DoCheck, OnDestroy {


    private viewRef: EmbeddedViewRef<any>;
    private callback = (r => {
        r.stopPropagation();
        this.onOverlayClick.emit(r);
    });

    @Output()
    onOverlayClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    private _ol: Overlay;
    private subscription: Subscription;


    constructor(private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef,
                private domHelper: DomHelperService,
                private render: Renderer2,
                private overlayService: OverlayService) {
        if (!templateRef) {
            if (environment.production) {
                throw new Error('backOverlay can be used in ng-tamplate');
            }
        }
    }

    @Input('backOverlay')
    show: boolean;

    @Input()
    positionAttach: ElementRef | Element | null;


    ngDoCheck(): void {
        if (this.show && !this.viewRef) {
            this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, this.show);
            this.viewRef.detectChanges();
            const elements = this.viewRef.rootNodes;
            if (elements && elements.length === 1) {
                this._ol = this.overlayService.createOverlay();
                this.subscription = this._ol.onClick.subscribe(this.callback);
                let target = elements[0];
                this._ol.el.appendChild(target);
            }
        } else if (!this.show && this.viewRef) {
            this.clearOverlay();
        }
    }

    private getAttachEle(): Element | null {
        if (!this.positionAttach) {
            return null;
        }
        if (this.positionAttach instanceof ElementRef) {
            return this.positionAttach.nativeElement;
        }
        return this.positionAttach;
    }

    private clearOverlay() {
        this.viewContainerRef.clear();
        this.viewRef = null;
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
            this._ol.destroy();
            this._ol = null;

        }
    }

    ngOnDestroy(): void {
        if (this._ol) {
            this.clearOverlay();
        }
    }

}
