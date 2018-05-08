import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogComponent, DialogHandler} from '../dialog-api';

export interface AlertInfo {
    icon?: string;
    title?: string;
    message?: string;
    button?: string;
}

@Component({
    templateUrl: './alert-dialog.component.html',
})
export class AlertDialogComponent implements OnInit, DialogComponent<AlertInfo>, OnDestroy {


    icon: string = 'info';
    title: string = '';
    message: string = '';
    button: string = 'info';

    constructor(private dialogHandler: DialogHandler) {
        dialogHandler.onClickOuter().subscribe((e: MouseEvent) => {
            this.dialogHandler.sendMessage(false);
            dialogHandler.close();
        });
    }

    ngOnInit() {
    }

    setParam(param?: AlertInfo): void {

        if (!param) {
            return;
        }
        if (param.icon) {
            this.icon = param.icon;
        }
        if (param.title) {
            this.title = param.title;
        }
        if (param.message) {
            this.message = param.message;
        }
        if (param.button) {
            this.button = param.button;
        }
    }

    btnClick() {
        this.dialogHandler.sendMessage(true);
        this.dialogHandler.close();
    }

    ngOnDestroy(): void {
    }
}
