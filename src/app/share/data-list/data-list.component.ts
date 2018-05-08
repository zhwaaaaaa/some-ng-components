import {
    AfterViewInit,
    Component,
    ContentChild,
    DoCheck,
    EventEmitter,
    Input,
    IterableDiffers,
    Output,
    TemplateRef
} from '@angular/core';
import 'rxjs/add/operator/throttleTime';
import {LazyLoadEvent} from '../common-class/lazy-load-event.class';

@Component({
    selector: 'data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements AfterViewInit, DoCheck {


    @Output()
    firstChange: EventEmitter<number> = new EventEmitter<number>();

    _value: any[];

    dataToRender: any[];

    private _first: number = 0;

    differ: any;

    @Input()
    paginator: boolean = true;

    @Input()
    rows: number;

    @Input()
    totalRecords: number;

    @Input()
    showTotalOnPage: boolean = true;

    @Input()
    pageLinks: number = 5;

    @Output()
    onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input()
    trackBy: Function = ((index: number, item: any) => item);

    @Input()
    immutable: boolean = true;


    @ContentChild(TemplateRef)
    itemTemplate: TemplateRef<any>;

    @Output()
    onPage: EventEmitter<any> = new EventEmitter();

    @Input()
    get first(): number {
        return this._first;
    }

    set first(value: number) {
        this._first = value;
    }

    constructor(public differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {

        this.onLazyLoad.emit({
            first: this._first,
            rows: this.rows,
        });
    }

    @Input() get value(): any[] {
        return this._value;
    }

    set value(val: any[]) {
        this._value = val;

        if (this.immutable) {
            this.handleDataChange();
        }
    }

    handleDataChange() {
        if (this.paginator) {
            this.updatePaginator();
        }
        this.updateDataToRender(this.value);
    }

    ngDoCheck() {
        if (!this.immutable) {
            const changes = this.differ.diff(this.value);
            if (changes) {
                this.handleDataChange();
            }
        }
    }

    updatePaginator() {
        // first
        if (this.totalRecords && this._first >= this.totalRecords) {
            const numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this._first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    }

    paginate(e) {
        this.doPaginate({...e});
    }

    doPaginate(event: LazyLoadEvent) {
        this._first = event.first;
        this.rows = event.rows;

        this.firstChange.emit(this._first);
        this.onLazyLoad.emit({
            first: this._first,
            rows: this.rows
        });

        this.onPage.emit({
            first: this._first,
            rows: this.rows
        });
    }

    updateDataToRender(datasource) {
        this.dataToRender = datasource;
    }

    isEmpty() {
        return !this.dataToRender || (this.dataToRender.length === 0);
    }

}
