// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoupanListComponent } from './couponlist/couponlist.component';
import { AddModifyCouponComponent } from './addmodifycoupon/addmodifycoupon.component';
import { CouponService } from 'src/app/_appService/coupon/coupon.service';
import { DatatablesModule } from 'src/app/commonmodule/datatables/datatables.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
@NgModule({
    declarations: [
        CoupanListComponent,
        AddModifyCouponComponent
    ],
    imports: [
        CommonModule,
        DatatablesModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorModule,
        RouterModule.forChild([
            {
                path: '',
                component: CoupanListComponent
            },
            {
                path: ':Ref_Coupon_ID',
                component: AddModifyCouponComponent
            }
        ]),
    ],
    providers: [CouponService]
})
export class CouponModule { }
