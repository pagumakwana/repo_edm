import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment.prod';
import { NavigationEnd, Router } from '@angular/router';
import { EncryptedStorage } from '../_appModel/encryptedstorage';
import { enAppSession } from '../_appModel/enAppSession';
import { FormGroup } from '@angular/forms';
import { ApiConstant } from '../_appModel/apiconstant';
import { Subject } from 'rxjs';
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
        return this._apiService.getExternal(environment.ipifyUrl);
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

    //image Upload
    uploadFile(files: FileList | string, moduleName: string) {
        return new Promise((resolve, reject) => {
            if (typeof files == 'string') {
                resolve(files)
            } else {
                let file: File = files ? (files.length > 0 ? files[0] : null) : null
                if (file) {
                    let formData: FormData = new FormData()
                    formData.append('uploadFile', file, file.name)
                    this.commonImageUpload(formData, moduleName).subscribe(url => {
                        resolve(url)
                    })
                } else {
                    resolve(null)
                }
            }
        })
    }

    commonImageUpload(formData: FormData, ModuleName: string) {
        return this._apiService.postFile(`${ApiConstant.common.thumbnail}?ModuleName=${ModuleName}`, formData)
    }
}
