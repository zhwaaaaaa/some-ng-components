import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {DialogModule} from '../dialog/dialog.module';
import {ShareModule} from '../share/share.module';
import {IndexComponent} from './index/index.component';
import {AppRoutingModule} from './app-routing.module';
import {ExampleModule} from '../example/example.module';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
    ],
    imports: [
        BrowserModule,
        DialogModule,
        ShareModule,
        ExampleModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
