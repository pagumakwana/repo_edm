import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NavigationEnd, Router } from '@angular/router';
import { EncryptedStorage } from '../_appModel/encryptedstorage';
import { enAppSession } from '../_appModel/enAppSession';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ApiConstant } from '../_appModel/apiconstant';
import { Subject, Observable } from 'rxjs';
import * as _ from "lodash";
import configData from '../../assets/projectConfig.json'
import { SaveModuleFileModel } from '../_appModel/common.model';

declare var $: any;
@Injectable()
export class CommonService {
    constructor(public _apiService: ApiService,
        public _encryptedStorage: EncryptedStorage,
        private _router: Router) {

    }
    browser
    public isOnline: boolean = true;
    public hasOnline: boolean = false;
    public ipAddress: string = "";

    public setHasLoginSubscribe = new Subject<boolean>();
    public cdnURL = configData.cdnURL;
    public FeatureProducts = "Track"
    public navigation(url: any) {
        this._router.navigate([url]);
    }

    guid() {
        return this._p8(null) + this._p8(true) + this._p8(true) + this._p8(null);
    }

    private _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    // fileImageUpload(formData, userID, domainID) {
    //     return this._ApiService.post(ApiConstant.common.uploadfile + "ModuleName=User&Ref_User_Id=" + userID, formData);
    // }
    getRef_User_ID() {
        this._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
            return Ref_User_ID
        });
    }

    isMobile(): boolean {
        if (window.location.href.indexOf('file://') >= 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**Get Public IP Address */
    getIpAddress() {
        return this._apiService.getExternal(configData.ipifyUrl);
    }

    platform(): string {
        return this.browserSpecs.name;
    }

    private browserSpecs = (function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return { name: M[0], version: M[1] };
    })();


    public randomNumber() {
        return (Math.floor((Math.random() * 899999) + 100000));
    }


    generatePaddingData(data, length) {
        let result = "";
        for (let index = 0; index < length; index++) {
            result = result + data;
        }
        return result;
    }

    padStartData(padString: any, targetLength: number, padValue: any) {
        let result = padString;
        if (targetLength > padString.length) {
            result = this.generatePaddingData(padValue, targetLength - padString.length) + padString;
        }
        return result;
    }
    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 0 : 1));
        });
    }

    numberOnly(event) {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }


    /**
* Marks all controls in a form group as touched
* @param formGroup - The form group to touch
*/
    public markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }
    showLoader() { //call this fn to show loader

        $('#mainloader').css('display', 'block');
    }
    hideLoader() { //call this fn to show loader

        $('#mainloader').css('display', 'none');
    }

    filesUpload(files: FileList | string | Array<any>, moduleName: string, type = 'upload') {
        return new Promise((resolve, reject) => {
            let isUpload: boolean = files && type == 'upload' ? (files.length > 0) : false
            if (isUpload) {
                this.uploadFile(files, moduleName).subscribe(url => {
                    resolve(url)
                })
            } else {
                // resolve(JSON.parse(JSON.stringify(this.sampleRes)))
                resolve([])
            }
        })
    }

    saveModuleFile(files: FileList | string | Array<any>, Data: SaveModuleFileModel, type = 'upload') {
        return new Promise((resolve, reject) => {
            // let isUpload: boolean = files && type == 'upload' ? (files.length > 0) : false
            let isUpload: boolean = (files && type == 'upload')
            console.log("saveModuleFile", files, Data, type)
            if (isUpload) {
                this.SaveModuleFile(files, Data).subscribe(url => {
                    resolve(url)
                })
            } else {
                // resolve(JSON.parse(JSON.stringify(this.sampleRes)))
                resolve([])
            }
        })
    }

    //check if String is json or not
    tryParseJSON(jsonString): boolean {
        try {
            var o = JSON.parse(jsonString);

            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object", 
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                return true;
            }
        }
        catch (e) { }

        return false;
    };

    //Added Identifer & displayorder in FilesUrl Array
    createFileArray(uploadedFilesArray, identiferList: string, displayOrderArray: Array<any>, filesUrl: Array<any>): Array<any> {
        debugger;
        console.log("insidecreateFileArray")
        console.log("uploadedFilesArray", uploadedFilesArray);
        console.log("displayOrderArray", displayOrderArray);
        console.log("filesUrl", filesUrl);
        let filesUrlFinal: Array<any> = []
        let counter = 0
        uploadedFilesArray = Array.isArray(uploadedFilesArray) ? uploadedFilesArray : []
        for (let i in displayOrderArray) {
            if (displayOrderArray[i].Ref_File_ID != null) {
                let index = _.findIndex(filesUrl, (o: any) => {
                    return o.Ref_File_ID == displayOrderArray[i].Ref_File_ID
                })
                if (index > -1) {
                    filesUrl[index].DisplayOrder = JSON.parse(JSON.stringify(displayOrderArray[i].DisplayOrder))
                    filesUrl[index].FileIdentifier = identiferList
                    filesUrlFinal.push(filesUrl[index])
                }
            } else {
                uploadedFilesArray[counter].DisplayOrder = JSON.parse(JSON.stringify(displayOrderArray[i].DisplayOrder))
                uploadedFilesArray[counter].FileIdentifier = identiferList
                filesUrlFinal.push(uploadedFilesArray[counter])
                if (uploadedFilesArray.length > counter)
                    counter++
            }
        }
        return filesUrlFinal
    }

    //Joins Multiple Array into One
    joinArray(...args) {
        return args.reduce((acc, val) => [...acc, ...val]);
    }

    uploadFile(filesData, ModuleName) {
        return this._apiService.postFile(ApiConstant.common.uploadFileData + "?ModuleName=" + ModuleName, filesData);
    }

    SaveModuleFile(filesData, Data: SaveModuleFileModel) {
        let params = `?FileManagerID=${Data.FileManagerID}&ModuleID=${Data.ModuleID}&ModuleType=${Data.ModuleType}&FileIdentifier=${Data.FileIdentifier}&Sequence=${Data.Sequence}`
        return this._apiService.postFile(ApiConstant.common.SaveModuleFile + params, [filesData]);
    }

    getImageDimension(fileInput): Observable<any> {
        return new Observable(observer => {
            let _URL = window.URL
            let img;
            img = new Image();
            img.onload = function () {
                img.height = this.height;
                img.width = this.width;
            }
            img.src = _URL.createObjectURL(fileInput);
            setTimeout(() => {
                let size = { width: img.width, height: img.height }
                observer.next(size);
                observer.complete();
            }, 1000);
        });
    }

    readImage(file: File): Observable<any> {
        return new Observable(observer => {
            let imageFile: any;
            // var file: File = inputValue.files[0];
            var myReader: FileReader = new FileReader();
            myReader.readAsDataURL(file);
            myReader.onloadend = (e) => {
                setTimeout(() => {
                    imageFile = myReader.result;
                    observer.next(imageFile);
                    observer.complete();
                }, 1000);
            }
        });
    }
    removeFile(ref_file_id) {
        return this._apiService.post(ApiConstant.common.removefile + "?Ref_File_ID=" + ref_file_id);
    }

    globalSearch(SearchKeyWord) {
        return this._apiService.get(`${ApiConstant.Shared.GlobalSearch}?SearchKeyWord=${SearchKeyWord}`);
    }
}
