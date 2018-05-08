import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

export interface Rect {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export interface ScrollXY {
    x: number;
    y: number;
}

@Injectable()
export class DomHelperService {
    constructor(@Inject(DOCUMENT) private doc: Document) {
    }

    getRect(el: HTMLElement): Rect {
        const rect = el.getBoundingClientRect();
        const top = this.doc.documentElement.clientTop;
        const left = this.doc.documentElement.clientLeft;

        return {
            top: rect.top - top,
            bottom: rect.bottom - top,
            left: rect.left - left,
            right: rect.right - left
        };
    }

    getWindowScrollXY(): ScrollXY {
        const supportPageOffset = window.pageXOffset !== undefined;
        const isCSS1Compat = ((this.doc.compatMode || '') === 'CSS1Compat');

        const x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? this.doc.documentElement.scrollLeft : this.doc.body.scrollLeft;
        const y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? this.doc.documentElement.scrollTop : this.doc.body.scrollTop;
        return {x: x, y: y};
    }
}
