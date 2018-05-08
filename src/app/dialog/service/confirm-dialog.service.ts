import {Injectable} from '@angular/core';
import {DialogConfig, DialogService} from './dialog.service';
import {DialogRef} from '../dialog-api';
import {Observable} from 'rxjs/Observable';
import {ConfirmDialogComponent, ConfirmInfo} from '../confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

    constructor(private dialogService: DialogService) {
    }

    private createConfig(title: string,
                         message: string,
                         level: 'info' | 'success' | 'warning' | 'danger'): DialogConfig<ConfirmInfo> {
        return {
            component: ConfirmDialogComponent,
            width: 400,
            initParam: {
                theme: level,
                title: title,
                message: message
            }
        };
    }

    show(config: ConfirmInfo): Observable<boolean> {
        const ref: DialogRef<ConfirmInfo> = this.dialogService.createDialog({
            component: ConfirmDialogComponent,
            width: 400,
            initParam: config
        });
        return ref.getMessage();
    }

    /**
     * 显示为info级别，
     * @param {string} message
     * @param {string} title
     * @return {Observable<boolean>} 当对话框关闭后返回，true:点击按钮关闭的，false:点击黑框关闭的
     */
    showInfo(message: string, title?: string): Observable<boolean> {
        const ref: DialogRef<ConfirmInfo> = this.dialogService.createDialog(this.createConfig(title, message, 'info'));
        return ref.getMessage();
    }

    /**
     * 显示为warning级别，
     * @param {string} message
     * @param {string} title
     * @return {Observable<boolean>} 当对话框关闭后返回，true:点击按钮关闭的，false:点击黑框关闭的
     */
    showWarning(message: string, title?: string): Observable<boolean> {
        const ref: DialogRef<ConfirmInfo> =
            this.dialogService.createDialog(this.createConfig(title, message, 'warning'));
        return ref.getMessage();
    }

    /**
     * 显示为success级别，
     * @param {string} message
     * @param {string} title
     * @return {Observable<boolean>} 当对话框关闭后返回，true:点击按钮关闭的，false:点击黑框关闭的
     */
    showSuccess(message: string, title?: string): Observable<boolean> {
        const ref: DialogRef<ConfirmInfo> =
            this.dialogService.createDialog(this.createConfig(title, message, 'success'));
        return ref.getMessage();
    }

    /**
     * 显示为danger级别，
     * @param {string} message
     * @param {string} title
     * @return {Observable<boolean>} 当对话框关闭后返回，true:点击按钮关闭的，false:点击黑框关闭的
     */
    showDanger(message: string, title?: string): Observable<boolean> {
        const ref: DialogRef<ConfirmInfo> =
            this.dialogService.createDialog(this.createConfig(title, message, 'danger'));
        return ref.getMessage();
    }


}
