// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoupanListComponent } from './coupanlist/coupanlist.component';
import { AddModifyCoupanComponent } from './addmodifycoupan/addmodifycoupan.component';
@NgModule({
    declarations: [
        CoupanListComponent,
        AddModifyCoupanComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: CoupanListComponent
            },
            {
                path: 'addmodify',
                component: AddModifyCoupanComponent
            }
        ]),
    ],
    providers: []
})
export class CoupanModule { }
