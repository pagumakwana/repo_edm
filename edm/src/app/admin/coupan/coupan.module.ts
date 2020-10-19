// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoupanListComponent } from './coupanlist/coupanlist.component';
import { AddModifyCoupanComponent } from './addmodifycoupan/addmodifycoupan.component';
import { CouponService } from 'src/app/_appService/coupon/coupon.service';
import { DatatablesModule } from 'src/app/commonmodule/datatables/datatables.module';
@NgModule({
    declarations: [
        CoupanListComponent,
        AddModifyCoupanComponent
    ],
    imports: [
        CommonModule,
        DatatablesModule,
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
    providers: [CouponService]
})
export class CoupanModule { }
