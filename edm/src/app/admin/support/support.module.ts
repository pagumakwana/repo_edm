// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupportListComponent } from './supportlist/supportlist.component';
import { AddModifySupportComponent } from './addmodifysupport/addmodifysupport.component';
@NgModule({
    declarations: [
        SupportListComponent,
        AddModifySupportComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: SupportListComponent
            },
            {
                path: ':ref_support_id',
                component: AddModifySupportComponent
            }
        ]),
    ],
    providers: []
})
export class SupportModule { }
