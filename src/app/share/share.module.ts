import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstPipe} from './pipe/first.pipe';
import {MultiMapPipe} from './pipe/multi-map.pipe';
import {SingleMapPipe} from './pipe/single-map.pipe';
import {StrToArrPipe} from './pipe/str-to-arr.pipe';
import {FormsModule} from '@angular/forms';
import {DataListComponent} from './data-list/data-list.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {SelectBtnComponent} from './select-btn/select-btn.component';
import {FoldingPanelComponent} from './folding-panel/folding-panel.component';
import {PanelHeaderDirective} from './directive/panel-header.directive';
import {PanelContentDirective} from './directive/panel-content.directive';
import {TabComponent} from './tab/tab.component';
import {TabTitleDirective} from './directive/tab-title.directive';
import {TabContentDirective} from './directive/tab-content.directive';
import {CalendarComponent} from './calendar/calendar.component';
import {StepComponent} from './step/step.component';
import {StepTabComponent} from './step-tab/step-tab.component';
import {SelectComponent} from './select/select.component';
import {DomHelperService} from './utils/dom-helper.service';
import {OverlayDirective} from './directive/overlay.directive';
import {NumberInputComponent} from './number-input/number-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        // directive
        PanelHeaderDirective,
        PanelContentDirective,
        TabTitleDirective,
        TabContentDirective,
        OverlayDirective,
        // pipe
        FirstPipe,
        MultiMapPipe,
        SingleMapPipe,
        StrToArrPipe,
        // component
        DataListComponent,
        PaginatorComponent,
        SelectBtnComponent,
        FoldingPanelComponent,
        TabComponent,
        CalendarComponent,
        StepComponent,
        StepTabComponent,
        SelectComponent,
        NumberInputComponent,
    ],

    exports: [
        // module
        FormsModule,
        // directive
        PanelHeaderDirective,
        PanelContentDirective,
        TabTitleDirective,
        TabContentDirective,
        OverlayDirective,
        // pipe
        FirstPipe,
        MultiMapPipe,
        SingleMapPipe,
        StrToArrPipe,
        // component
        DataListComponent,
        PaginatorComponent,
        SelectBtnComponent,
        FoldingPanelComponent,
        TabComponent,
        CalendarComponent,
        StepComponent,
        StepTabComponent,
        SelectComponent,
        NumberInputComponent,
    ],
    providers: [DomHelperService]
})
export class ShareModule {
}
