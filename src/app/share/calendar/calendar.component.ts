import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {DomHelperService} from '../utils/dom-helper.service';

export interface CalendarLocal {
    months?: string[];
    monthsShort?: string[];
    weekdays?: string[];
    weekdaysShort?: string[];
    weekdaysMin?: string[];
}

const LOCAL: CalendarLocal = {
    months: ['一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十一月',
        '十二月'
    ],
    monthsShort: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
    ],
    weekdays: [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
    ],
    weekdaysShort: [
        '周日',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六'
    ],
    weekdaysMin: [
        '日',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六'
    ],
};

interface DateDes {
    date: Date;
    day: number;
    isToday: boolean;
    isCurrentMouth: boolean;
    isCurrentDay: boolean;
    isOutRange: boolean;
}

@Component({
    selector: 'su-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    animations: [
        trigger('panelInout', [
            state('in', style({opacity: 1})),
            transition('void => *', [
                animate(200, keyframes([
                    style({opacity: 0, offset: 0}),
                    style({opacity: 1, offset: 1.0})
                ]))
            ]),
            transition('* => void', [
                animate(200, keyframes([
                    style({opacity: 1, offset: 0}),
                    style({opacity: 0, offset: 1.0})
                ]))
            ])
        ]),
    ],
    providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => CalendarComponent)}]
})
export class CalendarComponent implements OnInit, ControlValueAccessor, AfterViewInit, AfterViewChecked, OnChanges {

    private static zIndex: number = 1000;

    private static isBetween(d: Moment, s?: Moment, e?: Moment): boolean {
        if (e) {
            if (e.isBefore(d)) {
                return false;
            }
        }
        if (s) {
            if (s.isAfter(d)) {
                return false;
            }
        }
        return true;
    }

    private _maxDate: Moment;

    private _minDate: Moment;

    dateCenter: Moment;

    onChange: ((val: any) => void) = ((val: any): void => {
    });

    onTouch: (() => void) = ((): void => {
    });

    private _disableState: boolean = false;

    @Input()
    value: Date;

    @Input()
    format: string = 'yyyy-MM-dd';

    @Input()
    inputClass: string = 'block-form-control';

    @Input()
    placeholder: string = '请选择日期';

    @Input()
    get disabled(): boolean {
        return this._disableState;
    }

    set disabled(value: boolean) {
        if (this.value) {
            this.closePanel();
        }
        this._disableState = value;
    }

    @Input()
    get maxDate(): Date {
        return this._maxDate && this._maxDate.toDate();
    }

    set maxDate(value: Date) {
        this._maxDate = value && moment(value);
    }

    @Input()
    get minDate(): Date {
        return this._minDate && this._minDate.toDate();
    }

    set minDate(value: Date) {
        this._minDate = value && moment(value);
    }

    @Input()
    weekList: string[] = LOCAL.weekdaysMin;

    @Input()
    monthList: string[] = LOCAL.monthsShort;

    @ViewChild('calendar')
    calendar: ElementRef;
    @ViewChild('datepicker')
    datepicker: ElementRef;

    dates: DateDes[][] = [[], [], [], [], [], []];


    constructor() {
    }

    private isOutRange(m: Moment): boolean {
        return !CalendarComponent.isBetween(m, this._minDate, this._maxDate);
    }

    private togglePanel() {
        if (!this.dateCenter) {
            this.dateCenter = moment(this.value || undefined);
            this.computeDate();
        } else {
            this.dateCenter = null;
        }
    }

    private computeDate(): void {
        const today = moment();
        const v = this.value && moment(this.value || new Date()) || null;
        // 获取本月开始的本周开始
        const mStart = moment(this.dateCenter).startOf('month');
        const mEnd = moment(this.dateCenter).endOf('month');

        const d = moment(this.dateCenter).startOf('month').startOf('week');
        for (let i = 0; i < 6; ++i) {
            const week = this.dates[i];
            week.length = 0;
            for (let j = 0; j < 7; ++j) {
                // XXX:这里的Add容易误解，add会返回对象this，而当前的对象会被改变。
                const isToday = today.isSame(d, 'day');
                const isCur: boolean = v && v.isSame(d, 'day') || false;
                week.push({
                    date: d.toDate(),
                    day: d.date(),
                    isToday: isToday,
                    isCurrentDay: isCur,
                    isOutRange: this.isOutRange(d),
                    isCurrentMouth: CalendarComponent.isBetween(d, mStart, mEnd)
                });
                d.add(1, 'd');
            }
        }
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
    }


    ngAfterViewChecked(): void {
    }

    ngAfterViewInit(): void {
    }

    onClickIcon(e: MouseEvent): void {
        if (this.disabled) {
            return;
        }
        this.togglePanel();
    }

    onInputFocus(): void {
        this.togglePanel();
    }

    onInputBlur(e): void {
        this.onTouch();
        const v = e.target.value && moment(e.target.value);
        if (v && v.isValid() && !this.isOutRange(v)) {
            if (!this.value || !moment(this.value).isSame(v, 'd')) {
                this.value = v.toDate();
                this.onChange(this.value);
            }
        } else {
            if (this.value) {
                this.onChange(null);
            }
            this.value = null;
        }
    }

    showPanel(): void {
        if (this.disabled) {
            return;
        }
        // 显示panel
        if (!this.dateCenter) {
            this.togglePanel();
        }
    }

    closePanel(): void {
        // 显示panel
        if (this.dateCenter) {
            this.togglePanel();
        }

    }

    clickPanel(): void {
    }


    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    clickLastYear(): void {
        if (!this.canClickLast()) {
            return;
        }
        this.dateCenter.subtract(1, 'year');
        // 最大值最小值检查
        if (this._minDate && this._minDate.isAfter(this.dateCenter)) {
            this.dateCenter = moment(this._minDate);
        }
        this.computeDate();
    }

    clickLastMonth(): void {
        if (!this.canClickLast()) {
            return;
        }
        this.dateCenter.subtract(1, 'month');
        // 最大值最小值检查
        if (this._minDate && this._minDate.isAfter(this.dateCenter)) {
            this.dateCenter = moment(this._minDate);
        }
        this.computeDate();
    }

    clickNextMonth(): void {
        if (!this.canClickNext()) {
            return;
        }
        this.dateCenter.add(1, 'month');
        if (this._maxDate && this._maxDate.isBefore(this.dateCenter)) {
            this.dateCenter = moment(this._maxDate);
        }
        this.computeDate();
    }

    clickNextYear(): void {
        if (!this.canClickNext()) {
            return;
        }
        this.dateCenter.add(1, 'year');
        if (this._maxDate && this._maxDate.isBefore(this.dateCenter)) {
            this.dateCenter = moment(this._maxDate);
        }
        this.computeDate();
    }

    canClickNext(): boolean {
        return !this._maxDate || !this._maxDate.isSame(this.dateCenter, 'month');
    }

    canClickLast(): boolean {
        return !this._minDate || !this._minDate.isSame(this.dateCenter, 'month');
    }

    selectDay(evt, d: DateDes): void {
        // 阻止事件冒泡。
        evt.stopPropagation();
        this.onTouch();
        if (!this.value || !moment(this.value).isSame(d.date, 'd')) {
            this.value = d.date;
            this.onChange(this.value);
        }
        this.closePanel();
    }
}
