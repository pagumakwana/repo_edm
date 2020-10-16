// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BannerListComponent } from './bannerlist/bannerlist.component';
import { AddModifyBannerComponent } from './addmodifybanner/addmodifybanner.component';
import { ErrorModule } from './../../commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        BannerListComponent,AddModifyBannerComponent
    ],
    imports: [
        CommonModule,
        ErrorModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: BannerListComponent
            },
            {
                path: ':id',
                component: AddModifyBannerComponent
            },
        ]),
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})
export class BannerManagementModule { }
