import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

export interface Overlay {
    readonly el: HTMLDivElement;

    destroy(): void;

    readonly zIndex: number;

    readonly onClick: Observable<MouseEvent>;
}

class OverlayImp implements Overlay {

    public onClick: Observable<MouseEvent>;

    constructor(public el: HTMLDivElement,
                public zIndex: number,
                private os: OverlayService) {
        el.style.zIndex = String(zIndex);
        this.onClick = Observable.fromEvent(el, 'click');
    }

    destroy(): void {
        if (this.el.parentNode) {
            if (this.el.parentNode) {
                if (--this.os['overlayNum'] === 0) {
                    this.os['cMaxZIndex'] = this.os['minZIndex'];
                }

                this.el.parentNode.removeChild(this.el);
            }
        }
    }

}

@Injectable()
export class OverlayService {

    private readonly minZIndex: number = 2000;
    private cMaxZIndex: number = 2000;

    private overlayNum: number = 0;


    private container: HTMLDivElement;

    constructor(@Inject(DOCUMENT) private doc: Document) {
    }

    createOverlay(): Overlay {
        if (!this.container) {
            this.createContainer();
        }
        const ol = this.doc.createElement('div');
        ol.className = 'overlay';
        ++this.overlayNum;
        let zIndex = ++this.cMaxZIndex;
        this.container.appendChild(ol);
        return new OverlayImp(ol, zIndex, this);
    }

    private createContainer() {
        this.container = this.doc.createElement('div');
        this.container.setAttributeNode(this.doc.createAttribute('overlay'));
        this.doc.body.appendChild(this.container);
        const style = document.createElement('style');
        style.type = 'text/css';

        const css = `.overlay{position: fixed;top: 0;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;}`;
        if (style['styleSheet']) {
            // IE
            style['styleSheet'].cssText = css;
        } else {
            style.innerHTML = css;
            this.container.appendChild(style);
        }
    }
}
