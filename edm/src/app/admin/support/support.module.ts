// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupportListComponent } from './supportlist/supportlist.component';
import { AddModifySupportComponent } from './addmodifysupport/addmodifysupport.component';
import { SupportService } from "../../_appService/support/support.service";
import { ErrorModule } from './../../commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        SupportListComponent,
        AddModifySupportComponent,
        
    ],
    imports: [
        CommonModule,
        ErrorModule,
        FormsModule,
        ReactiveFormsModule,
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
    providers: [SupportService],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})
export class SupportModule { }
