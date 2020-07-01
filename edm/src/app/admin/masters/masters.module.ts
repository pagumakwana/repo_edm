// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MastersServices } from './_services/master.services'
import { MasterListComponent } from './masterlist/masterlist.component';
import { MasterDataListComponent } from './masterdatalist/masterdatalist.component';
import { AddModifyMasterComponent } from './addmodifymaster/addmodifymaster.component';
import { AddModifyMasterDataComponent } from './addmodifymasterdata/addmodifymasterdata.component';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        MasterListComponent,
        MasterDataListComponent,
        AddModifyMasterComponent,
        AddModifyMasterDataComponent
    ],
    imports: [
        CommonModule,
        ErrorModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: 'masters/:module',
                component: MasterListComponent
            },
            {
                path: 'addmodifymasters/:module/:id',
                component: AddModifyMasterComponent
            },
            // {
            //     path: 'masterdatas',
            //     component: MasterDataListComponent
            // },
            // {
            //     path: 'addmodifymasterdata/:id',
            //     component: AddModifyMasterDataComponent
            // }
        ]),
    ],
    providers: [MastersServices]
})
export class MastersModule { }
