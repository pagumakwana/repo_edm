import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
// import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';

@Injectable()
export class CartService {

    constructor(private _base: BaseServiceHelper) { }

    // public categoryArray: any;

    getCartData(userID: string) {
        let params: string = `?UserID=${userID}`
        return this._base._ApiService.get(ApiConstant.Order.Order + params)
    }
    Order(data: { ObjectList: Array<{ UserID: number; OrderID: number; ObjectID: number; ObjectType: string; OrderStatus: string; }> }) {
        return this._base._ApiService.post(`${ApiConstant.Order.Order}`, data);
    }

    // addmodifycategory(objCategoryModel: CategoryModel) {
    //     return this._base._ApiService.post(ApiConstant.category.AddModifyCategory, objCategoryModel)
    // }
    // categorylist(flag, ref_category_id, AliasName = null) {
    //     let params = `?Flag=${flag}&Ref_Category_ID=${ref_category_id}&AliasName=${AliasName}`
    //     return this._base._ApiService.get(ApiConstant.category.category + params);
    // }
}