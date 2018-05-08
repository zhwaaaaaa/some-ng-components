import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogHandler} from '../dialog-api';
import assign from 'lodash-es/assign';

export interface ConfirmInfo {
    theme?: string;
    title?: string;
    message?: string;
    positiveBtn?: string;
    negativeBtn?: string;
}

@Component({
    templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit, DialogComponent<ConfirmInfo> {

    config: ConfirmInfo = {
        theme: 'info',
        title: '提示',
        message: '',
        positiveBtn: '确定',
        negativeBtn: '取消'
    };


    constructor(private dialogHandler: DialogHandler) {
    }

    ngOnInit() {
    }

    setParam(data: ConfirmInfo): void {
        assign(this.config, data || {});
    }

    clickYes(): void {
        this.dialogHandler.sendMessage(true);
        this.dialogHandler.close();
    }

    clickNo(): void {
        this.dialogHandler.sendMessage(false);
        this.dialogHandler.close();
    }
}
