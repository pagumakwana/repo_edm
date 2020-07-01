import { Injectable } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service'
import { ApiService } from './../../../_appService/api.service'
import { ApiConstant } from './../../../_appModel/apiconstant'
import { from } from 'rxjs';

@Injectable()

export class MastersServices {
    constructor (private _base: BaseServiceHelper){

    }
    getMasterlist(id){
       return this._base._ApiService.get(ApiConstant.MasterManagement.UserMaster + '?UserMasterID=' + id);
    }
    getParentMasterlist(id){
        return this._base._ApiService.get(ApiConstant.MasterManagement.ParentUserMaster + '?UserMasterID=' + id);
    }
    getMasterDatalist(id){
        return this._base._ApiService.get(ApiConstant.MasterManagement.UserMasterData + '?UserMasterID=' + id);
    }
    addmodifyMasterData(data){
        return this._base._ApiService.post(ApiConstant.MasterManagement.UserMasterData, data);
    }
    addmodifyMaster(data){
        return this._base._ApiService.post(ApiConstant.MasterManagement.UserMaster, data);
    }

}