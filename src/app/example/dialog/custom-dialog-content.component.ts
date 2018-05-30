import {Component} from '@angular/core';
import {DialogComponent, DialogHandler} from '../../dialog/dialog-api';
import {Option} from '../../share/common-class/option.class';

@Component({
    template: `
        <h1>Custom Dialog-{{param}}</h1>
        <button class="btn btn-xs btn-danger" (click)="dialogHandler.close()">关闭</button>
    `
})
export class CustomDialogContentComponent implements DialogComponent<string> {
    param: string;


    constructor(public dialogHandler: DialogHandler) {
    }

    setParam(param?: string): void {
        this.param = param;
    }
}
