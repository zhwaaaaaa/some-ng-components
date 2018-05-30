import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ExampleDialogComponent} from './dialog/example-dialog.component';
import {ButtonExpComponent} from './button/button-exp.component';
import {NumInputComponent} from './number-input/num-input.component';
import {CalendarExpComponent} from './calendar/calendar-exp.component';
import {SelectExpComponent} from './select/select-exp.component';
import {AutoSelectExpComponent} from './auto-select/auto-select-exp.component';


const exampleRoutes: Routes = [
    {path: 'dialog', component: ExampleDialogComponent,},
    {path: 'btn', component: ButtonExpComponent},
    {path: 'num-input', component: NumInputComponent},
    {path: 'date', component: CalendarExpComponent},
    {path: 'select', component: SelectExpComponent},
    {path: 'auto-select', component: AutoSelectExpComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleRoutingModule {
}
