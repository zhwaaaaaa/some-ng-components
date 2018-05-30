import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExampleRoutingModule} from './example-routing.module';
import {ExampleDialogComponent} from './dialog/example-dialog.component';
import {CustomDialogContentComponent} from './dialog/custom-dialog-content.component';
import {ShareModule} from '../share/share.module';

@NgModule({
    imports: [
        CommonModule,
        ExampleRoutingModule,
        ShareModule
    ],
    declarations: [ExampleDialogComponent, CustomDialogContentComponent],
    entryComponents: [CustomDialogContentComponent]
})
export class ExampleModule {
}
