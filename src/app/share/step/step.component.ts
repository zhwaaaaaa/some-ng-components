import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface StepOption {
    label: string;
    active: boolean;
}

@Component({
    selector: 'app-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

    @Input()
    stepOptions: StepOption[];

    @Input()
    showIndex: number;

    @Output()
    showIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    responsive: boolean = true;

    @Input()
    small: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    onClickStep(s: StepOption, index: number): void {
        if (this.responsive && s.active) {
            this.showIndex = index;
            this.showIndexChange.emit(index);
        }
    }

}
