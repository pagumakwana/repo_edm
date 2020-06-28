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
    getService(ServiceID) {
        return this._base._ApiService.get(`${ApiConstant.genService.Service}?ServiceID=${ServiceID}`);
    }
}