import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import isNaN from 'lodash-es/isNaN';
import {numAdd, numSub} from '../utils/num.util';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NumberInputComponent),
        multi: true
    }]
})
export class NumberInputComponent implements OnInit, ControlValueAccessor {

    private readonly onlyNum: RegExp = /(?:[^0-9\-.])/gi;
    private readonly notStartZero: RegExp = /^(?!-?)[^1-9]+/gi;

    @Input()
    inputClass: string = null;

    @Input()
    minValue: number;

    @Input()
    maxValue: number;

    private _value: number;
    private _disableState: boolean;

    @Output()
    onBlur: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    onFocus: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    valueChange: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    step: number = 1;

    @ViewChild('inputEle')
    inputEle: ElementRef;

    @Input()
    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    onChange: ((val: any) => void) = ((val: any): void => {
    });

    onTouch: (() => void) = ((): void => {
    });

    @Input()
    get disabled(): boolean {
        return this._disableState;
    }

    set disabled(value: boolean) {
        this._disableState = value;
    }

    constructor() {
    }

    private fixValue(): void {
        if (this.value === null || this.value === undefined) {
            return;
        }
        if (typeof this.minValue === 'number' && !isNaN(this.minValue)) {
            if (this.value < this.minValue) {
                this.value = this.minValue;
            }
        }
        if (typeof this.maxValue === 'number' && !isNaN(this.maxValue)) {
            if (this.value > this.maxValue) {
                this.value = this.maxValue;
            }
        }
    }

    ngOnInit() {
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

    onInputFocus(): void {
        this.onFocus.emit();
    }

    onInputBlur(): void {
        this.onBlur.emit();
    }

    doInputBlur(e) {
        const v = e.target.value;
        const str = v && v.replace(this.onlyNum, '').replace(this.notStartZero, '');
        const val = str ? +str : null;
        e.target.value = String(str || '');
        if (val !== this.value) {
            this.value = val;
            this.fixValue();
            this.inputEle.nativeElement.value = this.getValueStr();
            this.valueChange.emit(this.value);
            this.onTouch();
            this.onChange(this.value);
        }
    }

    add(e: MouseEvent): void {
        e.stopPropagation();
        if (this.disabled) {
            return;
        }
        if (!this.value) {
            this.value = 0;
        }
        this.value = numAdd(this.value, this.step);
        this.fixValue();
        this.valueChange.emit(this.value);
        this.onChange(this.value);
    }

    sub(e: MouseEvent): void {
        e.stopPropagation();
        if (this.disabled) {
            return;
        }
        if (!this.value) {
            this.value = 0;
        }
        this.value = numSub(this.value, this.step);
        this.fixValue();
        this.onChange(this.value);
        this.valueChange.emit(this.value);
    }

    getValueStr(): string | number {
        if (this._value === 0) {
            return 0;
        }
        if (!this._value) {
            return '';
        }
        return this._value;
    }
}
