// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupportListComponent } from './supportlist/supportlist.component';
import { AddModifySupportComponent } from './addmodifysupport/addmodifysupport.component';
import { SupportService } from "../../_appService/support/support.service";

@NgModule({
    declarations: [
        SupportListComponent,
        AddModifySupportComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':ref_support_id',
                component: SupportListComponent
            },
            {
                path: '',
                component: AddModifySupportComponent
            }
        ]),
    ],
    providers: [SupportService]
})
export class SupportModule { }
