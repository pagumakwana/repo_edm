// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesListComponent } from './servicesslist/servicesslist.component';
import { AddModifyServicesComponent } from './addmodifyservices/addmodifyservices.component';
@NgModule({
    declarations: [
        ServicesListComponent,
        AddModifyServicesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ServicesListComponent
            },
            {
                path: ':Ref_Service_ID',
                component: AddModifyServicesComponent
            }
        ]),
    ],
    providers: []
})
export class GenServiceModule { }
