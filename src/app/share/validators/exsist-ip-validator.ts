import { AbstractControl, ValidatorFn} from '@angular/forms';

export function exsistIPValidator(ips: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid = ips.includes(control.value);
        return valid ? null : {'exsistIP': { valid: false}};
    };
}
