import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '../app/index/index.component';
import {NgModule} from '@angular/core';


const exampleRoutes: Routes = [
    {
        path: 'compose',
        component: IndexComponent,
        outlet: 'index'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleRoutingModule {
}
