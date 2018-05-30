import {Component, ContentChild, EventEmitter, forwardRef, Input, OnInit, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Option} from '../common-class/option.class';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {SingleMapPipe} from '../pipe/single-map.pipe';


@Component({
    selector: 'su-auto-select',
    templateUrl: './auto-select.component.html',
    styleUrls: ['./auto-select.component.scss'],
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
    ],
    providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => AutoSelectComponent)}]
})
export class AutoSelectComponent implements OnInit, ControlValueAccessor {
    @Input()
    get selectOption(): Option[] {
        return this._selectOption;
    }

    set selectOption(value: Option[]) {
        this._selectOption = value || [];
        this.labelValue = SingleMapPipe.INSTANCE.transform(this.value, this._selectOption);
    }


    @Input()
    get value(): number | string {
        return this._value;
    }

    set value(value: number | string) {
        this._value = value;
        this.labelValue = SingleMapPipe.INSTANCE.transform(value, this.selectOption);
    }

    @Input()
    inputClass: string = 'block-form-control';

    @Input()
    placeholder: string = '';

    private _selectOption: Option[];

    private _value: number | string;

    @Input()
    panelWidth: string = '100%';

    @Input()
    maxHeight: string = '280px';

    @Input()
    matchMode: 'startsWith' | 'contains';

    labelValue: string = '';

    private _disableState: boolean = false;


    private onSelect: EventEmitter<number | string> = new EventEmitter<number | string>();

    @Input()
    get disabled(): boolean {
        return this._disableState;
    }

    set disabled(value: boolean) {
        if (value) {
            this.closePanel();
        }
        this._disableState = value;
    }

    onChange: ((val: any) => void) = ((val: any): void => {
    });

    onTouch: (() => void) = ((): void => {
    });

    @ContentChild(TemplateRef)
    itemTemplate: TemplateRef<any>;

    matchedList: Option[];

    panelShowing: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    closePanel(): void {
        this.panelShowing = false;
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

    selectOne(opt: Option, e?: MouseEvent): void {
        e.stopPropagation();
        this._value = opt.value;
        this.onSelect.emit(this._value);
        this.onChange(this._value);
        this.labelValue = opt.label;
        this.closePanel();
        this.matchedList = null;
    }

    togglePanel(): void {
        this.panelShowing = !this.panelShowing;
    }

    showPanel(): void {
        if (this.disabled) {
            return;
        }
        this.filterList();
        // 显示panel
        if (!this.panelShowing) {
            this.togglePanel();
        }
    }

    onClickIcon(e: MouseEvent): void {
        this.showPanel();
        e.stopPropagation();
    }

    onInputBlur(e): void {
        this.onTouch();
        if (this.matchedList && this.matchedList.length === 1) {
            const opt = this.matchedList[0];
            if (e.target.value === opt.label) {
                this._value = opt.value;
                this.labelValue = opt.label;
                this.onChange(this._value);
                return;
            }
        }
        this.labelValue = '';
        this.value = null;
        this.onChange(null);
    }

    onInputFocus(): void {
        this.filterList();
    }

    onInputInput(e): void {
        this.labelValue = e.target.value;
        this.filterList();
    }

    filterList(): void {
        if (!this.labelValue) {
            this.matchedList = [...this._selectOption];
        } else if (Array.isArray(this._selectOption)) {

            this.matchedList = this._selectOption
                .filter(opt => {
                    if (this.matchMode === 'contains') {
                        return opt.label.indexOf(this.labelValue) !== -1;
                    } else {
                        return opt.label.indexOf(this.labelValue) === 0;
                    }
                });
        }
    }
}
