import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
    selector: 'su-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})
export class CheckboxComponent implements ControlValueAccessor {

    @Input()
    value: any;

    @Input()
    name: string;

    @Input()
    disabled: boolean;

    @Input()
    binary: string;

    @Input()
    label: string;

    @Input()
    tabindex: number;

    @Input()
    inputId: string;

    @Input()
    style: any;

    @Input()
    styleClass: string;

    @Input()
    formControl: FormControl;

    @Output()
    onChange: EventEmitter<any> = new EventEmitter();

    model: any;

    onModelChange: Function = (() => {
    });

    onModelTouched: Function = (() => {
    });

    focused: boolean = false;

    checked: boolean = false;

    constructor(private cd: ChangeDetectorRef) {
    }

    onClick(event, checkbox, focus: boolean) {
        event.preventDefault();

        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.updateModel();

        if (focus) {
            checkbox.focus();
        }
    }

    updateModel() {
        if (!this.binary) {
            if (this.checked) {
                this.addValue();
            } else {
                this.removeValue();
            }

            this.onModelChange(this.model);

            if (this.formControl) {
                this.formControl.setValue(this.model);
            }
        } else {
            this.onModelChange(this.checked);
        }

        this.onChange.emit(this.checked);
    }

    handleChange(event) {
        this.checked = event.target.checked;
        this.updateModel();
    }

    isChecked(): boolean {
        if (this.binary) {
            return this.model;
        } else {
            return this.model && this.model.indexOf(this.value) > -1;
        }
    }

    removeValue() {
        this.model = this.model.filter(val => val !== this.value);
    }

    addValue() {
        if (this.model) {
            this.model = [...this.model, this.value];
        } else {
            this.model = [this.value];
        }
    }

    onFocus(event) {
        this.focused = true;
    }

    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }

    writeValue(model: any): void {
        this.model = model;
        this.checked = this.isChecked();
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
}
