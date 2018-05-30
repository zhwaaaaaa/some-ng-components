import {Component} from '@angular/core';


@Component({
    templateUrl: './num-input.component.html'
})
export class NumInputComponent {
    val: number = 1;
    step: number = 0.2;
}
