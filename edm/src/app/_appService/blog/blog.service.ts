import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';
import { ServiceModel } from 'src/app/_appModel/genservices/service.model';
import { BlogModel } from 'src/app/_appModel/blog/blog.model';

@Injectable()
export class BlogService {

    constructor(private _base: BaseServiceHelper) { }

    // addmodifyService(objServiceModel: ServiceModel) {
    //     return this._base._ApiService.post(ApiConstant.genService.Service, objServiceModel)
    // }

    getBlog(Ref_Blog_ID = 0) {
        let params = `?Ref_Blog_ID=${Ref_Blog_ID}`
        return this._base._ApiService.get(ApiConstant.category.Blog + params);
    }

    addmodifyBlog(data: BlogModel) {
        return this._base._ApiService.post(ApiConstant.category.Blog, data);
    }
    ManageBlog(BlogIDs, Action) {
        let params = `?BlogIDs=${BlogIDs}&Action=${Action}`
        return this._base._ApiService.get(ApiConstant.category.ManageBlog + params);
    }
    // getServiceByCategory(StartCount, EndCount, AliasName = null) {
    //     let params = `?StartCount=${StartCount}&EndCount=${EndCount}&AliasName=${AliasName}`
    //     return this._base._ApiService.get(ApiConstant.genService.servicebycatehory + params);
    // }
}