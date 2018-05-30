import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleRoutingModule} from './example-routing.module';
import {ExampleDialogComponent} from './dialog/example-dialog.component';
import {CustomDialogContentComponent} from './dialog/custom-dialog-content.component';
import {ShareModule} from '../share/share.module';
import {ButtonExpComponent} from './button/button-exp.component';
import {NumInputComponent} from './number-input/num-input.component';
import {FormsModule} from '@angular/forms';
import {CalendarExpComponent} from './calendar/calendar-exp.component';
import {SelectExpComponent} from './select/select-exp.component';
import {AutoSelectExpComponent} from './auto-select/auto-select-exp.component';


const EN_CPNT: any[] = [CustomDialogContentComponent];

const CPNT: any[] = [
    ...EN_CPNT,
    ExampleDialogComponent,
    ButtonExpComponent,
    NumInputComponent,
    CalendarExpComponent,
    SelectExpComponent,
    AutoSelectExpComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ExampleRoutingModule,
        ShareModule
    ],
    declarations: CPNT,
    entryComponents: EN_CPNT
})
export class ExampleModule {
}
