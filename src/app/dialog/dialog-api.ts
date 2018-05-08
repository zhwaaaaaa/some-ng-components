import {Observable} from 'rxjs/Observable';
import {DialogService} from './service/dialog.service';

/**
 * 对话框组件实现这个接口，用来注入参数
 */
export interface DialogComponent<P> {
    /**
     * 接受外部发送过来的参数
     * @param {P} param
     */
    setParam(param?: P): void;
}

/**
 * 对话框的padding，背景，圆角，
 */
export interface DialogStyle {
    // 默认15
    padding?: string;
    // 默认#fff
    background?: string;
    // 圆角，默认6px
    borderRadius?: string;
}

/**
 * 对话框状态
 */
export enum DialogStatus {
    // 正在打开，动画正在执行
    OPENING,
    // 打开完毕
    OPENED,
    // 正在关闭，动画正在执行
    CLOSING,
    // 对话框已经关闭
    CLOSED
}


interface Dialog {

    reSetStyle(style: DialogStyle): void;

    fixBox(width?: number): void;

    close(): void;

    getStatus(): Observable<DialogStatus>;

}

/**
 * 在对话框组件内部使用。
 * usage:
 * @Component({
 *   templateUrl: './alert-dialog.component.html',
 *   })
 *  export class AlertDialogComponent implements DialogComponent<AlertInfo>{
 *      // 注入DialogHandler，可以控制对话框的状态
 *      constructor(private dialogHandler: DialogHandler) {
 *          dialogHandler.onClickOuter().subscribe((e: MouseEvent) => {
 *              dialogHandler.close();
 *          });
 *       }
 *      setParam(param?: AlertInfo): void {
 *          if (!param) {
 *              return;
 *          }
 *          if (param.icon) {
 *              this.icon = param.icon;
 *          }
 *          if (param.title) {
 *              this.title = param.title;
 *          }
 *          if (param.message) {
 *              this.message = param.message;
 *          }
 *          if (param.button) {
 *              this.button = param.button;
 *          }
 *      }
 *
 *  }
 */
export abstract class DialogHandler implements Dialog {

    /**
     * 关闭对话框
     */
    abstract close(): void ;

    /**
     * 设置对话框样式
     * @param {DialogStyle} style
     */
    abstract reSetStyle(style: DialogStyle): void;

    /**
     * 根据对话框的宽高设置修正对话框的位置
     * @param {number} width
     */
    abstract fixBox(width?: number): void;

    /**
     * 给对话框外部发送消息
     * @See {@link DialogRef#getMessage}接受消息
     * @param msg 发送的消息
     */
    abstract sendMessage(msg: any): void;

    /**
     * 获取对话框当前的状态
     * @See {@link DialogStatus}
     * @return {Observable<DialogStatus>}
     */
    abstract getStatus(): Observable<DialogStatus>;

    /**
     * 点击对话框的外部事件
     * @return {Observable<MouseEvent>}
     */
    abstract onClickOuter(): Observable<MouseEvent>;

}

/**
 * 对话框对象，用于外部控制对话框的状态，接收消息
 * @See {@link DialogService#createDialog}
 */
export interface DialogRef<T> extends Dialog {

    /**
     * 关闭对话框
     */
    close(): void;

    /**
     * 设置对话框样式
     * @param {DialogStyle} style
     */
    reSetStyle(style: DialogStyle): void;

    /**
     * 根据对话框的宽高设置修正对话框的位置
     * @param {number} width
     */
    fixBox(width?: number): void;

    /**
     * 获取对话框当前的状态
     * @See {@link DialogStatus}
     * @return {Observable<DialogStatus>}
     */
    getStatus(): Observable<DialogStatus>;

    /**
     * 获取对话框内部发出的消息
     * @See {@link DialogHandler#sendMessage}
     * @return {Observable<any>}
     */
    getMessage(): Observable<any>;

    /**
     * 给对话框内部发送参数
     * @See {@link DialogComponent#setParam}
     * @param {T} param
     */
    sendParam(param: T): void;

}
