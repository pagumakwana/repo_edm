import { Injectable } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service'
import { ApiService } from './../../../_appService/api.service'
import { ApiConstant } from './../../../_appModel/apiconstant'
import { from } from 'rxjs';

@Injectable()

export class AuthorityServices {
    constructor (private _base: BaseServiceHelper){

    }
    getMasterlist(id){
        return this._base._ApiService.get(ApiConstant.MasterManagement.UserMaster+'?UserMasterID='+ id);
    }
    getMasterData(masterid, masterDataid){
        return this._base._ApiService.get(ApiConstant.MasterManagement.UserMasterData+'?UserMasterID='+ masterid + '&UserMasterDataID='+masterDataid);
    }
    getParentMasterlist(id){
        return this._base._ApiService.get(ApiConstant.MasterManagement.ParentUserMaster + '?UserMasterID=' + id);
    }
    getModule(){
        return this._base._ApiService.get(ApiConstant.AuthorityManagement.Module);
    }
    getAuthoritylist(){
        return this._base._ApiService.get(ApiConstant.AuthorityManagement.Authority);
     }
    getAuthorityDetails(id){
        return this._base._ApiService.get(ApiConstant.AuthorityManagement.AuthorityDetails+'?AuthorityID='+ id);
    }
    addmodifyauthority(data){
        return this._base._ApiService.post(ApiConstant.AuthorityManagement.Authority, data);
    }
   

}