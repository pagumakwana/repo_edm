import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';

@Injectable()
export class CategoryService {

    constructor(private _base: BaseServiceHelper) { }

    public categoryArray: any;

    addmodifycategory(objCategoryModel: CategoryModel) {
        return this._base._ApiService.post(ApiConstant.category.AddModifyCategory, objCategoryModel)
    }
    categorylist(flag, ref_category_id) {
        var params = "?Flag=" + flag;
        params += "&Ref_Category_ID=" + ref_category_id;
        return this._base._ApiService.get(ApiConstant.category.category + params);
    }
}