import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ExampleDialogComponent} from './dialog/example-dialog.component';


const exampleRoutes: Routes = [
    {
        path: 'dialog',
        component: ExampleDialogComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleRoutingModule {
}
