import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';
import { ServiceModel } from 'src/app/_appModel/genservices/service.model';

@Injectable()
export class GenService {

    constructor(private _base: BaseServiceHelper) { }

    addmodifyService(objServiceModel: ServiceModel) {
        return this._base._ApiService.post(ApiConstant.genService.Service, objServiceModel)
    }
    getService(flag, ref_service_id, AliasName = null) {
        let params = `?Flag=${flag}&Ref_Service_ID=${ref_service_id}&AliasName=${AliasName}`
        return this._base._ApiService.get(ApiConstant.genService.Service + params);
    }
    getServiceByCategory(StartCount, EndCount, AliasName = null) {
        let params = `?StartCount=${StartCount}&EndCount=${EndCount}&AliasName=${AliasName}`
        return this._base._ApiService.get(ApiConstant.genService.servicebycatehory + params);
    }
}