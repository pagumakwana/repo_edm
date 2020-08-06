
import { Injectable, EventEmitter, Output } from '@angular/core';
import { EncryptedStorage } from '../_appModel/encryptedstorage';
import { enAppSession } from '../_appModel/enAppSession';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';


@Injectable()
export class AppSessionService {
    // @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    constructor(public _encryptedStorage: EncryptedStorage, private _commonSerice: CommonService) { }
    setUserSession(responseData): Observable<any> {
        return new Observable(observer => {
            this._encryptedStorage.set(enAppSession.Ref_User_ID, responseData.Ref_User_ID);
            this._encryptedStorage.set(enAppSession.FullName, responseData.FullName);
            this._encryptedStorage.set(enAppSession.MobileNumber, responseData.MobileNumber);
            this._encryptedStorage.set(enAppSession.EmailID, responseData.EmailID);
            this._encryptedStorage.set(enAppSession.ProfilePic, responseData.Profile_Photo);
            this._encryptedStorage.set(enAppSession.HasLogin, true);
            this._encryptedStorage.set(enAppSession.AuthorityIDs, responseData.AuthorityIDs);
            this._encryptedStorage.set(enAppSession.Bio, responseData.Bio);
            this._encryptedStorage.set(enAppSession.CreatedBy, responseData.CreatedBy);
            this._encryptedStorage.set(enAppSession.Gender, responseData.Gender);
            this._encryptedStorage.set(enAppSession.GovitID, responseData.GovitID);
            this._encryptedStorage.set(enAppSession.Password, responseData.Password);
            this._encryptedStorage.set(enAppSession.PayPalEmailID, responseData.PayPalEmailID);
            this._encryptedStorage.set(enAppSession.ProfilePhoto, responseData.ProfilePhoto);
            this._encryptedStorage.set(enAppSession.Response, responseData.Response);
            this._encryptedStorage.set(enAppSession.SocialProfileUrl, responseData.SocialProfileUrl);
            this._encryptedStorage.set(enAppSession.StudioGears, responseData.StudioGears);
            this._encryptedStorage.set(enAppSession.UserCode, responseData.UserCode);
            this._encryptedStorage.set(enAppSession.UserMasterDataIDs, responseData.UserMasterDataIDs);
            this._encryptedStorage.set(enAppSession.FileUrls, JSON.stringify(responseData.FileUrls));



            setTimeout(() => {
                observer.next(true);
                observer.complete();
            }, 100);
        });
    }

    clearUserSession() {

        this._encryptedStorage.set(enAppSession.FullName, '');
        this._encryptedStorage.set(enAppSession.MobileNumber, '');
        this._encryptedStorage.set(enAppSession.EmailID, '');
        this._encryptedStorage.set(enAppSession.Ref_User_ID, 0);
        this._encryptedStorage.set(enAppSession.HasLogin, false);
        this._encryptedStorage.set(enAppSession.ProfilePic, '');

        this._encryptedStorage.set(enAppSession.AuthorityIDs, '');
        this._encryptedStorage.set(enAppSession.Bio, '');
        this._encryptedStorage.set(enAppSession.CreatedBy, '');
        this._encryptedStorage.set(enAppSession.Gender, '');
        this._encryptedStorage.set(enAppSession.GovitID, '');
        this._encryptedStorage.set(enAppSession.Password, '');
        this._encryptedStorage.set(enAppSession.PayPalEmailID, '');
        this._encryptedStorage.set(enAppSession.ProfilePhoto, '');
        this._encryptedStorage.set(enAppSession.Response, '');
        this._encryptedStorage.set(enAppSession.SocialProfileUrl, '');
        this._encryptedStorage.set(enAppSession.StudioGears, '');
        this._encryptedStorage.set(enAppSession.UserCode, '');
        this._encryptedStorage.set(enAppSession.UserMasterDataIDs, '');
        this._encryptedStorage.set(enAppSession.FileUrls, '[]');
    }

}