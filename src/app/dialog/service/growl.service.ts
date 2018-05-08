import {ComponentFactoryResolver, ComponentRef, Injectable, NgModuleRef} from '@angular/core';
import {Growl, GrowlRef, GrowlState} from '../growl-api';
import {DialogModule} from '../dialog.module';
import {GrowlComponent} from '../growl/growl.component';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import remove from 'lodash-es/remove';

type Theme = 'danger' | 'warning' | 'info' | 'success' | 'primary';

export abstract class GrowlService {

    abstract createInfo(text: string, liveTime?: number): GrowlRef;

    abstract createSuccess(text: string, liveTime?: number): GrowlRef;

    abstract createDanger(text: string, liveTime?: number): GrowlRef;

    abstract createWarning(text: string, liveTime?: number): GrowlRef;

    abstract createPrimary(text: string, liveTime?: number): GrowlRef;
}


class GrowImp implements Growl {
    get theme() {
        return this._theme;
    }


    private timeout;

    get text(): string {
        return this._text;
    }

    get liveTime(): number {
        return this._liveTime;
    }

    private _liveTime: number;
    private _text: string;
    private _theme: Theme;


    private sub: ReplaySubject<GrowlState> = new ReplaySubject<GrowlState>(1);

    constructor(private container: GrowlComponent, text: string, theme: Theme, liveTime: number) {
        this._text = text;
        this._liveTime = liveTime;
        this._theme = theme;
        this.container.value.push(this);

        if (liveTime > 0) {
            this.timeout = setTimeout(() => {
                this.dismiss();
            }, liveTime);
        }
        this.sendState(GrowlState.Init);
        this.container.refresh();
    }

    sendState(state: GrowlState): void {
        this.sub.next(state);
    }

    getState(): Observable<GrowlState> {
        return this.sub.asObservable();
    }

    dismiss(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.sendState(GrowlState.Dismissing);
        remove(this.container.value, this);
        this.container.refresh();
    }

}

@Injectable()
export class GrowlServiceAdapter implements GrowlService {

    private container: ComponentRef<GrowlComponent>;

    constructor(private cfr: ComponentFactoryResolver,
                private moduleRef: NgModuleRef<DialogModule>) {
    }

    private createContainer(): void {
        const cf = this.cfr.resolveComponentFactory(GrowlComponent);
        this.container = cf.create(this.moduleRef.injector);
    }

    createGrowl(text: string, theme: Theme, liveTime: number = 3000): GrowlRef {
        if (!this.container) {
            this.createContainer();
        }
        return new GrowImp(this.container.instance, text, theme, liveTime);
    }

    createInfo(text: string, liveTime: number = 3000): GrowlRef {
        return this.createGrowl(text, 'info', liveTime);
    }

    createSuccess(text: string, liveTime: number = 3000): GrowlRef {
        return this.createGrowl(text, 'success', liveTime);
    }

    createDanger(text: string, liveTime: number = 3000): GrowlRef {
        return this.createGrowl(text, 'danger', liveTime);
    }

    createWarning(text: string, liveTime: number = 3000): GrowlRef {
        return this.createGrowl(text, 'warning', liveTime);
    }

    createPrimary(text: string, liveTime: number = 3000): GrowlRef {
        return this.createGrowl(text, 'primary', liveTime);
    }

}

export const GROWL_SERVICE_PRO = {provide: GrowlService, useClass: GrowlServiceAdapter};
