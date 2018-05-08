import {
    ApplicationRef, ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Inject,
    Injectable,
    Injector,
    NgModuleRef,
    Type
} from '@angular/core';
import {DialogContainerComponent} from '../dialog-container/dialog-container.component';
import {DialogModule} from '../dialog.module';
import {DOCUMENT} from '@angular/common';
import {DialogComponent, DialogHandler, DialogRef, DialogStatus, DialogStyle} from '../dialog-api';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


class DialogHelper implements DialogRef<any>, DialogHandler {

    private clickOuterSubject: Subject<MouseEvent> = new Subject<MouseEvent>();
    private messageSubject: ReplaySubject<any> = new ReplaySubject(1);

    private _contentInstance: DialogComponent<any>;
    private _containerRef: ComponentRef<DialogContainerComponent>;

    private statusSubject: ReplaySubject<DialogStatus> = new ReplaySubject<DialogStatus>(1);


    set contentInstance(value: DialogComponent<any>) {
        this._contentInstance = value;
    }

    set containerRef(value: ComponentRef<DialogContainerComponent>) {
        value.instance.onClickOuter = (evt: MouseEvent) => {
            this.clickOuterSubject.next(evt);
        };
        value.instance.onOpenAnimateEnd(() => {
            this.statusSubject.next(DialogStatus.OPENED);
        });

        // 注册关闭对话框的函数，确保关闭动画执行关闭才移除dom
        value.instance.onCloseAnimateEnd(() => {
            value.destroy();
            this.clickOuterSubject.complete();
            this.messageSubject.complete();
            this.statusSubject.next(DialogStatus.CLOSED);
            this.statusSubject.complete();
        });
        this._containerRef = value;
        this.statusSubject.next(DialogStatus.OPENING);
    }

    getMessage(): Observable<any> {
        return this.messageSubject.asObservable();
    }

    sendParam(param: any): void {
        this._contentInstance.setParam(param);
    }

    reSetStyle(style: DialogStyle): void {
        this._containerRef.instance.setStyle(style);
    }

    fixBox(width?: number): void {
        this._containerRef.instance.fixPosition(width);
    }

    close(): void {

        this.statusSubject.next(DialogStatus.CLOSING);
        this._containerRef.instance.doDrop();
    }

    sendMessage(msg: any): void {
        this.messageSubject.next(msg);
    }

    getStatus(): Observable<DialogStatus> {
        return this.statusSubject.asObservable();
    }

    onClickOuter(): Observable<MouseEvent> {
        return this.clickOuterSubject.asObservable();
    }
}

/**
 * 对话框配置
 * @See {@link DialogService#createDialog}
 */
export interface DialogConfig<P> {
    /**
     * 对话框组件，必须实现DialogComponent接口，
     * 要在entryComponents
     */
    component: Type<DialogComponent<P>>;
    /**
     * 对话框宽度
     * 高度是由内容自适应的
     */
    width: number;
    /**
     * 初始化的参数
     * @See {@link DialogRef#sendParam}
     */
    initParam?: P;
    /**
     * 初始化的样式
     */
    initStyle?: DialogStyle;

    /**
     * 有模块是懒加载的，创建懒加载的component的时候确保模块必须被加载
     */
    hostModule?: NgModuleRef<any>;
}

/**
 * 对话框服务,用于创建自定义的对话框，单例服务
 */
@Injectable()
export class DialogService {
    private containerEle: HTMLDivElement;

    constructor(private cfr: ComponentFactoryResolver,
                private moduleRef: NgModuleRef<DialogModule>,
                private applicationRef: ApplicationRef,
                @Inject(DOCUMENT) private doc: Document) {
    }

    /**
     * 创建对话
     * @param {DialogConfig<P>} dialogConfig 对话框配置
     * @return {DialogRef<P>} 对话框引用
     */
    createDialog<P>(dialogConfig: DialogConfig<P>): DialogRef<P> {
        const {width, component, initParam, initStyle, hostModule} = dialogConfig;

        if (!this.containerEle) {
            this.containerEle = this.doc.createElement('div');
            this.containerEle.className = 'dialog-container';
            this.doc.body.appendChild(this.containerEle);
        }
        const dialogHelper = new DialogHelper();


        const dcf: ComponentFactory<DialogContainerComponent> = this.cfr.resolveComponentFactory(DialogContainerComponent);
        const dialogContainerRef = dcf.create(this.moduleRef.injector);

        this.containerEle.appendChild(dialogContainerRef.location.nativeElement);
        // dialogContainerRef中隐含初始值，必须执行detectChanges，否则不生成子视图
        dialogContainerRef.changeDetectorRef.detectChanges();

        const conRef = dialogContainerRef.instance.getContentViewContainer();

        const staticInjector = Injector.create({
            providers: [
                {
                    provide: DialogHandler,
                    useValue: dialogHelper
                },
                {
                    provide: DialogContainerComponent,
                    useValue: dialogContainerRef.instance
                }],
            parent: hostModule && hostModule.injector || this.moduleRef.injector
        });
        const hostResolve = hostModule && hostModule.componentFactoryResolver || this.cfr;
        const componentRef = conRef.createComponent(hostResolve.resolveComponentFactory(component), 0, staticInjector);

        dialogHelper.containerRef = dialogContainerRef;
        dialogHelper.contentInstance = componentRef.instance;

        dialogHelper.sendParam(initParam);
        componentRef.changeDetectorRef.detectChanges();
        dialogHelper.fixBox(width);
        dialogHelper.reSetStyle(initStyle);

        // 挂到appRef下能够实现脏检测
        this.applicationRef.attachView(dialogContainerRef.hostView);
        return dialogHelper;
    }

}
