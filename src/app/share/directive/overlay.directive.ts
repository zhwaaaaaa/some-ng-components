import {
    Directive,
    DoCheck,
    EmbeddedViewRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DomHelperService} from '../utils/dom-helper.service';


@Directive({
    selector: '[overlay]'
})
export class OverlayDirective implements DoCheck, OnChanges, OnDestroy {


    private viewRef: EmbeddedViewRef<any>;
    private callback = (r => {
        r.stopPropagation();
        this.onOverlayClick.emit(r);
    });

    @Input('overlay')
    overlay: any;

    @Output()
    onOverlayClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    private _ol: HTMLDivElement;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef,
                private domHelper: DomHelperService,
                private render: Renderer2) {
        if (!templateRef) {
            if (environment.production) {
                throw new Error('overlay can be used in ng-tamplate');
            }
        }
    }


    ngOnChanges(changes: SimpleChanges): void {

    }

    ngDoCheck(): void {
        if (this.overlay && !this.viewRef) {
            this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, this.overlay);
            this.viewRef.detectChanges();
            const elements = this.viewRef.rootNodes;
            if (elements && elements.length > 0) {
                this._ol = this.render.createElement('div');
                const parent = this.templateRef.elementRef.nativeElement.parentNode;
                this._ol.classList.add('overlay');
                parent.appendChild(this._ol);
                for (const ele of elements) {
                    if (ele.style) {
                        // ele.style.zIndex = String(this._ol.zIndex + 1);
                        // 判断与屏幕的距离，决定显示在下边还是上边
                        const rect = this.domHelper.getRect(ele);
                        if (window.innerHeight - rect.bottom <= 0 && rect.top > ele.clientHeight) {
                            ele.style.top = 'auto';
                            ele.style.bottom = '100%';
                        }
                    }
                }
                this._ol.addEventListener('click', this.callback);
            }
        } else if (!this.overlay && this.viewRef) {
            this.clearOverlay();
        }
    }

    private clearOverlay() {
        this.viewContainerRef.clear();
        this.viewRef = null;
        this._ol.removeEventListener('click', this.callback);
        this._ol.parentNode.removeChild(this._ol);
        this._ol = null;
    }

    ngOnDestroy(): void {
        if (this._ol) {
            this._ol.removeEventListener('click', this.callback);
            this._ol.parentNode.removeChild(this._ol);
            this._ol = null;
        }
    }
}
