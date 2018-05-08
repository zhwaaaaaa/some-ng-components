import {Component, ContentChild, forwardRef, Input, OnInit, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Option} from '../common-class/option.class';

@Component({
    selector: 'app-select-btn',
    templateUrl: './select-btn.component.html',
    styleUrls: ['./select-btn.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectBtnComponent),
        multi: true
    }]
})
export class SelectBtnComponent implements OnInit, ControlValueAccessor {


    onChange: (value: any) => void = (((value: any) => {
    }));
    onTouch: () => void = (() => {
    });

    private _disable: boolean = false;

    @Input()
    get disable(): boolean {
        return this._disable;
    }

    set disable(value: boolean) {
        this._disable = value;
    }

    _value: any;

    @Input()
    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
    }

    @Input()
    options: Option[] = [];

    @ContentChild(TemplateRef)
    itemView: TemplateRef<any>;

    constructor() {
    }

    ngOnInit() {
    }

    select(value: any): void {
        this.value = value;
        this.onTouch();
        this.onChange(value);
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

    setDisabledState(state: boolean): void {
        this.disable = state;
    }

}
