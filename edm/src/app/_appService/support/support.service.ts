import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';

@Injectable()
export class SupportService {

    constructor(private _base: BaseServiceHelper) { }

    addmodifyService() {
        return this._base._ApiService.post(ApiConstant.genService.Service)
    }
    getService(flag, ref_service_id, AliasName = null) {
        let params = `?Flag=${flag}&Ref_Service_ID=${ref_service_id}&AliasName=${AliasName}`
        return this._base._ApiService.get(ApiConstant.genService.Service + params);
    }
    ManageService(ServiceIDs, Action) {
        let params = `?ServiceIDs=${ServiceIDs}&Action=${Action}`
        return this._base._ApiService.get(ApiConstant.genService.ManageService + params);
    }
    getServiceByCategory(StartCount, EndCount, AliasName = null) {
        let params = `?StartCount=${StartCount}&EndCount=${EndCount}&AliasName=${AliasName}`
        return this._base._ApiService.get(ApiConstant.genService.servicebycatehory + params);
    }
}