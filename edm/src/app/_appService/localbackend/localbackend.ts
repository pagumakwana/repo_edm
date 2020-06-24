// Created Date: 01/08/2018
// Created By: Santosh Yadav
// Usage: store offline data in json file from here.
// Copyright: Violet InfoSystems Pvt.Ltd.
// Reviewed by:
// Review Date:
import { CommonService } from "../common/common";
import { constTableName } from "./entablename";
import { File } from "@ionic-native/file/ngx";
import { FileManagerService } from "../fileManager/fileManager";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { UserApiConstant } from "../../_model/apiconstant";
import { ApiService } from "../api/apiservice";

@Injectable()
export class LocalBackendService {
  public basePath: string = "";
  liveData;
  offlinedata;
  constructor(
    private _commonService: CommonService,
    private _file: File,
    private _FileManagerServicetwe: FileManagerService,
    private http: HttpClient,
    private _apiService: ApiService,
  ) {
  }
  isMobile() {
    return this._commonService.isMobile();
  }
  get(fileName: constTableName) {
    return this.http.get(this._FileManagerServicetwe.folderDirectory + fileName.toString()).map((res:any) => res.text().length > 0 ? res.json() : null);
  }

  set(dataJson, fileName: constTableName) {
    //write file in local package path
    if (this.isMobile()) {
      return this._FileManagerServicetwe.createFile(fileName, true).then(() => {
        return this._FileManagerServicetwe.writeExistingFile('', fileName, JSON.stringify(dataJson)).then(() => {
          return dataJson;
        });
      });
    }
    else
      return dataJson

  };
  // getElearnData(domainID) {

  //   let isCatalogue = false;
  //   var params = "?DomainID=" + domainID
  //   return this._apiService.get(UserApiConstant.elearn.getCourseList + params);//"v1/User/Courses"
  // }
  // getLatestElearnData(domainID,courseId, LastSyncDate) {

  //   let isCatalogue = false;
  //   var params = "?DomainID=" + domainID +"&CourseID="+courseId+"&LastSyncDate="+LastSyncDate;
  //   return this._apiService.get(UserApiConstant.elearn.getLatestElearnData + params);//"v1/User/Courses"
  // }
  // postSyncedcall(domainID,courseId) {
  //   let isCatalogue = false;
  //   var params = "?DomainID=" + domainID +"&CourseID="+courseId;
  //   return this._apiService.post(UserApiConstant.elearn.postSyncedcall + params,null,null);
  // }
}
