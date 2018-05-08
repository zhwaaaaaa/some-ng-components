import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList
} from '@angular/core';
import {TabTitleDirective} from '../directive/tab-title.directive';
import {TabContentDirective} from '../directive/tab-content.directive';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit, AfterContentInit {

    @ContentChildren(TabTitleDirective)
    titleList: QueryList<TabTitleDirective>;

    @ContentChildren(TabContentDirective)
    contentList: QueryList<TabContentDirective>;

    @Input()
    showBorder: boolean = false;

    @Input()
    currentIndex: number = 0;

    @Output()
    currentIndexChange: EventEmitter<number> = new EventEmitter<number>();

    contentTemp: TabContentDirective;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        // 初始化显示一个
        this.showIndex(this.titleList.find((item, i) => i === this.currentIndex), this.currentIndex);
    }

    getTabSize(): number {
        if (this.titleList && this.contentList) {
            return Math.min(this.titleList.length, this.contentList.length);
        }
        return 0;
    }

    showIndex(title: TabTitleDirective, index: number): void {
        if (this.currentIndex !== index || !this.contentTemp) {
            this.contentTemp = this.contentList.find((item, i) => {
                if (item.tabKey || item.tabKey === 0) {
                    return item.tabKey === title.tabKey;
                }
                return index === i;
            });
            this.currentIndex = index;
            this.currentIndexChange.emit(index);
        }
    }

}
