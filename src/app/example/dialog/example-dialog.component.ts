import {Component, NgModuleRef} from '@angular/core';
import {DialogService} from '../../dialog/service/dialog.service';
import {AlertDialogService} from '../../dialog/service/alert-dialog.service';
import {ConfirmDialogService} from '../../dialog/service/confirm-dialog.service';
import {ExampleModule} from '../example.module';
import {CustomDialogContentComponent} from './custom-dialog-content.component';
import {timer} from 'rxjs/observable/timer';

@Component({
    selector: 'example-dialog',
    template: `
        <div>
            <button class="btn btn-primary" (click)="showAlert()">alert 对话框</button>
            <button class="btn btn-success" (click)="showConfirm()">confirm对话框</button>
            <button class="btn btn-info" (click)="showCustom()">自定义对话框</button>
        </div>
        <hr>
        <pre>
            {{code}}
        </pre>`
})
export class ExampleDialogComponent {

    code: string = `
        @Component({
            selector: 'example-dialog',
            template:""
        })
        export class ExampleDialogComponent {
            
            
            constructor(private dialogService: DialogService,
                        private alertDialogService: AlertDialogService,
                        private confirmDialogService: ConfirmDialogService,
                        private moduleRef: NgModuleRef<ExampleModule>) {
        
            }
        
            showAlert(): void {
                this.alertDialogService.showSuccess('好哇', '成功');
            }
        
            showConfirm(): void {
                this.confirmDialogService.showInfo('What can I do for you?', '提示')
            }
        
            showCustom(): void {
                let dialogRef = this.dialogService.createDialog({
                    // not required if this module is not lazy loaded
                    hostModule: this.moduleRef,
                    width: 800,
                    component: CustomDialogContentComponent,
                    initParam: 'aaaa'
                });
        
                timer(3000).subscribe(() => {
                    dialogRef.sendParam('bbbb')
                });
                
                timer(5000).subscribe(() => {
                  dialogRef.close();
                });
            }
        }
        
        import {Component} from '@angular/core';
        import {DialogComponent, DialogHandler} from '../../dialog/dialog-api';
        
        @Component({
            template: \`
                <h1>Custom Dialog-{{param}}</h1>
                <button class="btn btn-xs btn-danger" (click)="dialogHandler.close()">关闭</button>
            \`
        })
        export class CustomDialogContentComponent implements DialogComponent<string> {
            param: string;
            // you can inject DialogHandler to control the dialog
            constructor(public dialogHandler: DialogHandler) {
            }
            // you must implements DialogComponent to getParam
            setParam(param?: string): void {
                this.param = param;
            }
        }
      `;

    constructor(private dialogService: DialogService,
                private alertDialogService: AlertDialogService,
                private confirmDialogService: ConfirmDialogService,
                private moduleRef: NgModuleRef<ExampleModule>) {

    }

    showAlert(): void {
        this.alertDialogService.showSuccess('好哇', '成功');
    }

    showConfirm(): void {
        this.confirmDialogService.showInfo('What can I do for you?', '提示')
    }

    showCustom(): void {
        let dialogRef = this.dialogService.createDialog({
            // not required if this module is not lazy loaded
            hostModule: this.moduleRef,
            width: 800,
            component: CustomDialogContentComponent,
            initParam: 'aaaa'
        });

        timer(3000).subscribe(() => {
            dialogRef.sendParam('bbbb');
        });
        timer(5000).subscribe(() => {
            dialogRef.close();
        });
    }
}
