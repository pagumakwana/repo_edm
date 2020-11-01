import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
// import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';
import { CouponModel } from 'src/app/_appModel/coupon/coupon.model';

@Injectable()
export class CouponService {

    constructor(private _base: BaseServiceHelper) { }

    // public categoryArray: any;

    CouponCode() {
        return this._base._ApiService.get(ApiConstant.CouponCode.CouponCode)
    }

    saveCouponCode(data: CouponModel) {
        return this._base._ApiService.post(ApiConstant.CouponCode.CouponCode, data)
    }

    ManageCouponCode(data: { CouponIDs: number, Action: string }) {
        let params: string = `?CouponIDs=${data.CouponIDs}&Action=${data.Action}`
        return this._base._ApiService.get(ApiConstant.CouponCode.ManageCouponCode + params)
    }

    // getCartData(userID: string) {
    //     let params: string = `?UserID=${userID}`
    //     return this._base._ApiService.get(ApiConstant.Order.Order + params)
    // }

    // addmodifycategory(objCategoryModel: CategoryModel) {
    //     return this._base._ApiService.post(ApiConstant.category.AddModifyCategory, objCategoryModel)
    // }
    // categorylist(flag, ref_category_id, AliasName = null) {
    //     let params = `?Flag=${flag}&Ref_Category_ID=${ref_category_id}&AliasName=${AliasName}`
    //     return this._base._ApiService.get(ApiConstant.category.category + params);
    // }
}