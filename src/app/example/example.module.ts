import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleRoutingModule} from './example-routing.module';
import {ExampleDialogComponent} from './dialog/example-dialog.component';
import {CustomDialogContentComponent} from './dialog/custom-dialog-content.component';
import {ShareModule} from '../share/share.module';
import {ButtonExpComponent} from './button/button-exp.component';

const CPNT: any[] = [
    ExampleDialogComponent,
    ButtonExpComponent
];

const EN_CPNT: any[] = [CustomDialogContentComponent];

@NgModule({
    imports: [
        CommonModule,
        ExampleRoutingModule,
        ShareModule
    ],
    declarations: CPNT.concat(EN_CPNT),
    entryComponents: [EN_CPNT]
})
export class ExampleModule {
}
