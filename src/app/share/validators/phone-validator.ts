import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid = reg.test(control.value);
        return valid ? null : {'phonenumber': {valid: false}};
    };
}
