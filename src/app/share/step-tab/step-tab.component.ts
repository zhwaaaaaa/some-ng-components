import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, QueryList} from '@angular/core';
import {StepOption} from '../step/step.component';
import {TabContentDirective} from '../directive/tab-content.directive';

export interface StepTabOption extends StepOption {
    tabKey?: string | number;
}

@Component({
    selector: 'app-step-tab',
    templateUrl: './step-tab.component.html',
    styleUrls: ['./step-tab.component.scss'],
})
export class StepTabComponent implements OnInit, AfterContentInit {
    @Input()
    get currentIndex(): number {
        return this._currentIndex;
    }

    set currentIndex(value: number) {
        this._currentIndex = value;
        this.changeTab(this._currentIndex);
    }


    @Input()
    stepTabOptions: StepTabOption[];

    _currentIndex: number = 0;

    @Input()
    currentIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(TabContentDirective)
    tabContentList: QueryList<TabContentDirective>;

    contentTemp: TabContentDirective;

    constructor() {
    }

    private isUndefined(v: any): boolean {
        return v === undefined || v === null;
    }

    ngOnInit() {
    }


    ngAfterContentInit(): void {
        this.changeTab(this._currentIndex);
    }

    changeTab(e: number): void {
        if (this.tabContentList && this.stepTabOptions && this.stepTabOptions[e]) {
            const tabKey = this.stepTabOptions[e].tabKey;
            if (this.isUndefined(tabKey)) {
                // 以index参照
                this.contentTemp = this.tabContentList.find((item, index) => index === e);
            } else {
                this.contentTemp = this.tabContentList.find((item, index) => item.tabKey === tabKey);
            }
        }
    }

    onClickChangeTab(e: number): void {
        this._currentIndex = e;
        this.changeTab(e);
        this.currentIndexChange.emit(e);
    }

}
