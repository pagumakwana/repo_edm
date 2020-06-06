
import { Injectable } from '@angular/core';
import { EncryptedStorage } from '../_appModel/encryptedstorage';
import { enAppSession } from '../_appModel/enAppSession';
import { CommonService } from './common.service';


@Injectable()
export class AppSessionService {
    constructor(public _encryptedStorage: EncryptedStorage, private _commonSerice: CommonService) { }
    setUserSession(responseData) {
        this._encryptedStorage.set(enAppSession.Ref_User_ID, responseData.Ref_User_ID);
        this._encryptedStorage.set(enAppSession.FullName, responseData.FullName);
        this._encryptedStorage.set(enAppSession.MobileNumber, responseData.MobileNumber);
        this._encryptedStorage.set(enAppSession.EmailID, responseData.EmailID);
        this._encryptedStorage.set(enAppSession.ProfilePic, responseData.Profile_Photo);
        this._encryptedStorage.set(enAppSession.HasLogin, true);
    }

    clearUserSession() {
        this._encryptedStorage.set(enAppSession.FullName, '');
        this._encryptedStorage.set(enAppSession.MobileNumber, '');
        this._encryptedStorage.set(enAppSession.EmailID, '');
        this._encryptedStorage.set(enAppSession.Ref_User_ID, 0);
        this._encryptedStorage.set(enAppSession.HasLogin, false);
        this._encryptedStorage.set(enAppSession.ProfilePic, '');
    }

}