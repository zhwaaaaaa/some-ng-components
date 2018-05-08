import {NgModule, Optional, SkipSelf} from '@angular/core';
import {DialogContainerComponent} from './dialog-container/dialog-container.component';
import {DialogHostDirective} from './directive/dialog-host.directive';
import {DialogService} from './service/dialog.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {AlertDialogComponent} from './alert-dialog/alert-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {AlertDialogService} from './service/alert-dialog.service';
import {ConfirmDialogService} from './service/confirm-dialog.service';
import {GrowlComponent} from './growl/growl.component';
import {GROWL_SERVICE_PRO} from './service/growl.service';

@NgModule({
    imports: [CommonModule, BrowserAnimationsModule],
    declarations: [
        DialogHostDirective,
        DialogContainerComponent,
        ConfirmDialogComponent,
        AlertDialogComponent,
        GrowlComponent,
    ],
    providers: [
        DialogService,
        AlertDialogService,
        ConfirmDialogService,
        GROWL_SERVICE_PRO
    ],
    entryComponents: [
        DialogContainerComponent,
        ConfirmDialogComponent,
        AlertDialogComponent,
        GrowlComponent
    ]
})
export class DialogModule {
    constructor(@SkipSelf() @Optional() parent: DialogModule) {
        if (parent) {
            throw new Error('DialogModule cannot be imported twice');
        }
    }
}
