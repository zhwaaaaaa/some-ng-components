import {ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PanelHeaderDirective} from '../directive/panel-header.directive';
import {PanelContentDirective} from '../directive/panel-content.directive';
import {animate, style, transition, trigger, state} from '@angular/animations';

@Component({
    selector: 'su-folding-panel',
    templateUrl: './folding-panel.component.html',
    styleUrls: ['./folding-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('panelState', [
            state('on', style({minHeight: '100%'})),
            state('off', style({height: '0'})),
            transition('on => off', [
                animate('0.3s ease-in')
            ]),
            transition('off => on', [
                animate('0.3s ease-in')
            ])
        ]),
        trigger('iconState', [
            state('on', style({transform: 'rotate(0deg)'})),
            state('off', style({transform: 'rotate(-180deg)'})),
            transition('on => off', [
                animate('0.3s ease-in-out')
            ]),
            transition('off => on', [
                animate('0.3s ease-in-out')
            ])
        ])
    ]
})
export class FoldingPanelComponent implements OnInit {
    @Input()
    get opened(): boolean {
        return this._opened;
    }

    set opened(value: boolean) {
        this._opened = value;
        if (this._opened) {
            this.closed = false;
        }
    }

    @Output()
    openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    headerLine: boolean = true;

    @ContentChild(PanelHeaderDirective)
    header: PanelHeaderDirective;

    @ContentChild(PanelContentDirective)
    content: PanelContentDirective;

    _opened: boolean = true;

    /**
     * 关闭动画执行完成才算closed
     * @type {boolean}
     */
    closed: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    toggleState(): void {
        this.opened = !this.opened;
        this.openedChange.emit(this.opened);
    }

    animateEnd(): void {
        if (!this.opened) {
            this.closed = true;
        }
    }

}
