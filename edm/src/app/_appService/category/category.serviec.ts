import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';

@Injectable()
export class CategoryService {

    constructor(private _base: BaseServiceHelper) { }

    addmodifycategory(objCategoryModel: CategoryModel) {
        return this._base._ApiService.post(ApiConstant.category.AddModifyCategory, objCategoryModel)
    }
    categorylist(objCategoryModel: CategoryModel) {
        return this._base._ApiService.post(ApiConstant.category.category, objCategoryModel);
    }
}