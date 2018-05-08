import {Injectable} from '@angular/core';
import {DialogService} from './dialog.service';
import {Observable} from 'rxjs/Observable';
import {AlertDialogComponent, AlertInfo} from '../alert-dialog/alert-dialog.component';
import {DialogRef} from '../dialog-api';

@Injectable()
export class AlertDialogService {

    constructor(private dialogService: DialogService) {
    }

    private createConfig(title: string, message: string, level: 'info' | 'success' | 'warning' | 'danger') {
        return {
            component: AlertDialogComponent,
            width: 400,
            initParam: {
                icon: level,
                title: title,
                message: message,
                button: level
            }
        };
    }

    /**
     * 显示为info级别，
     * @param {string} message
     * @param {string} title
     * @return {Observable<boolean>} 当对话框关闭后返回，true:点击按钮关闭的，false:点击黑框关闭的
     */
    showInfo(message: string, title?: string): Observable<boolean> {
        const ref: DialogRef<AlertInfo> = this.dialogService.createDialog(this.createConfig(title, message, 'info'));
        return ref.getMessage();
    }

    /**
     * 显示为warning级别，
     * @param {string} message
     * @param {string} title
     * @return {Observable<boolean>} 当对话框关闭后返回，true:点击按钮关闭的，false:点击黑框关闭的
     */
    showWarning(message: string, title?: string): Observable<boolean> {
        const ref: DialogRef<AlertInfo> =
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
        const ref: DialogRef<AlertInfo> =
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
        const ref: DialogRef<AlertInfo> =
            this.dialogService.createDialog(this.createConfig(title, message, 'danger'));
        return ref.getMessage();
    }


}
