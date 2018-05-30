import {
    AfterViewChecked,
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';
import {Option} from '../common-class/option.class';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'su-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
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
    providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectComponent)}]

})
export class SelectComponent implements OnInit, AfterViewChecked, ControlValueAccessor {
    @Input()
    get selectOption(): Option[] {
        return this._selectOption;
    }

    set selectOption(value: Option[]) {
        if (!Array.isArray(value) || value.map(item => item.value).indexOf(this.value) === -1) {
            this.writeValue(null);
        }
        this._selectOption = value;
    }


    private _disableState: boolean = false;

    @Input()
    inputClass: string = 'block-form-control';

    @Input()
    value: string | number;

    _selectOption: Option[];

    panelShowing: boolean = false;

    onChange: ((val: any) => void) = ((val: any): void => {
    });

    onTouch: (() => void) = ((): void => {
    });

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

    @Input()
    panelWidth: string = '100%';

    @Input()
    maxHeight: string = '280px';


    @Input()
    trackByFun: Function = ((index, item) => item);

    @ContentChild(TemplateRef)
    itemTemplate: TemplateRef<any>;

    @Output()
    onSelect: EventEmitter<string | number> = new EventEmitter<string | number>();


    constructor() {
    }

    ngOnInit() {
    }

    onClickIcon(e: MouseEvent): void {
        this.togglePanel();
        e.stopPropagation();
    }

    togglePanel(): void {
        this.panelShowing = !this.panelShowing;
    }

    showPanel(): void {
        if (this.disabled) {
            return;
        }
        // 显示panel
        if (!this.panelShowing) {
            this.togglePanel();
        }
    }

    closePanel(): void {
        if (this.panelShowing) {
            this.togglePanel();
        }
    }

    ngAfterViewChecked(): void {
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

    selectOne(opt: Option, e: MouseEvent): void {
        e.stopPropagation();
        this.value = opt.value;
        this.onSelect.emit(this.value);
        this.onChange(this.value);
        this.closePanel();
    }

    onInputBlur(): void {
        this.onTouch();
    }
}
