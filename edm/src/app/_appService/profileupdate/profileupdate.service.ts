import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';
import { ServiceModel } from 'src/app/_appModel/genservices/service.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { Observable } from 'rxjs';
import { ProfileUpdateModel } from 'src/app/_appModel/profileupdate/profileupdate.model';

@Injectable()
export class ProfileUpdateService {

    constructor(private _base: BaseServiceHelper) { }

    SignUp(data: ProfileUpdateModel) {
        return this._base._ApiService.post(ApiConstant.customer.registerCustomer, data)
    }

    DAW() {
        return this._base._ApiService.get(ApiConstant.MasterManagement.DAW);
    }

    UserMasterData(UserMasterID: string) {
        return this._base._ApiService.get(`${ApiConstant.MasterManagement.UserMasterData}?UserMasterID=${UserMasterID}`);
    }



    //Gets stored Data during session login
    getProfileInfo(): Observable<ProfileUpdateModel> {
        return new Observable<ProfileUpdateModel>(observer => {
            this._base._encryptedStorage.get(enAppSession.EmailID).then(EmailID => {
                this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
                    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
                        this._base._encryptedStorage.get(enAppSession.ProfilePic).then(ProfilePic => {
                            this._base._encryptedStorage.get(enAppSession.MobileNumber).then(MobileNumber => {
                                this._base._encryptedStorage.get(enAppSession.Bio).then(Bio => {
                                    this._base._encryptedStorage.get(enAppSession.Gender).then(Gender => {
                                        this._base._encryptedStorage.get(enAppSession.SocialProfileUrl).then(SocialProfileUrl => {
                                            this._base._encryptedStorage.get(enAppSession.StudioGears).then(StudioGears => {
                                                this._base._encryptedStorage.get(enAppSession.GovitID).then(GovitID => {
                                                    this._base._encryptedStorage.get(enAppSession.PayPalEmailID).then(PayPalEmailID => {
                                                        this._base._encryptedStorage.get(enAppSession.AuthorityIDs).then(AuthorityIDs => {
                                                            this._base._encryptedStorage.get(enAppSession.UserMasterDataIDs).then(UserMasterDataIDs => {
                                                                this._base._encryptedStorage.get(enAppSession.CreatedBy).then(CreatedBy => {
                                                                    this._base._encryptedStorage.get(enAppSession.Response).then(Response => {
                                                                        let profileData: ProfileUpdateModel = {
                                                                            Ref_User_ID: Ref_User_ID,
                                                                            UserCode: null,
                                                                            FullName: FullName,
                                                                            EmailID: EmailID,
                                                                            ProfilePhoto: ProfilePic,
                                                                            MobileNumber: MobileNumber,
                                                                            Password: null,
                                                                            Bio: Bio,
                                                                            Gender: Gender,
                                                                            SocialProfileUrl: SocialProfileUrl,
                                                                            StudioGears: StudioGears,
                                                                            GovitID: GovitID,
                                                                            PayPalEmailID: PayPalEmailID,
                                                                            AuthorityIDs: AuthorityIDs,
                                                                            UserMasterDataIDs: UserMasterDataIDs,
                                                                            CreatedBy: CreatedBy,
                                                                            Response: Response
                                                                        }
                                                                        observer.next(profileData)
                                                                        observer.complete();
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })


        })
    }


}