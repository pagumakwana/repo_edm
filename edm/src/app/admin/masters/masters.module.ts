// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MasterListComponent } from './masterlist/masterlist.component';
import { MasterDataListComponent } from './masterdatalist/masterdatalist.component';
import { AddModifyMasterComponent } from './addmodifymaster/addmodifymaster.component';
import { AddModifyMasterDataComponent } from './addmodifymasterdata/addmodifymasterdata.component';
@NgModule({
    declarations: [
        MasterListComponent,
        MasterDataListComponent,
        AddModifyMasterComponent,
        AddModifyMasterDataComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'masters',
                component: MasterListComponent
            },
            {
                path: 'addmodifymaster',
                component: AddModifyMasterComponent
            },
            {
                path: 'masterdatas',
                component: MasterDataListComponent
            },
            {
                path: 'addmodifymasterdata',
                component: AddModifyMasterDataComponent
            }
        ]),
    ],
    providers: []
})
export class MastersModule { }
