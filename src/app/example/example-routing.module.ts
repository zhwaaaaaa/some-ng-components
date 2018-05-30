import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ExampleDialogComponent} from './dialog/example-dialog.component';
import {ButtonExpComponent} from './button/button-exp.component';


const exampleRoutes: Routes = [
    {
        path: 'dialog',
        component: ExampleDialogComponent,
    },
    {
        path: 'btn',
        component: ButtonExpComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleRoutingModule {
}
