
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
    }

}