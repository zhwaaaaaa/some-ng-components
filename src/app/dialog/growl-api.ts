import {Observable} from 'rxjs/Observable';

export enum GrowlState {
    Init,
    Showing,
    Dismissing,
    Dismissed
}

export interface GrowlRef {
    readonly liveTime: number;

    readonly text: string;

    readonly theme: 'danger' | 'warning' | 'info' | 'success' | 'primary';

    getState(): Observable<GrowlState>;

    dismiss(): void;
}

export interface Growl extends GrowlRef {
    sendState(state: GrowlState): void;
}

