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
        return this._base._ApiService.get(`${ApiConstant.MasterManagement.UserMasterData}?UserMasterID=${UserMasterID}&UserMasterDataID=0`);
    }

    setProfileInfo(data: ProfileUpdateModel): void {

        this._base._encryptedStorage.set(enAppSession.FullName, data.FullName);
        this._base._encryptedStorage.set(enAppSession.EmailID, data.EmailID);
        this._base._encryptedStorage.set(enAppSession.UserCode, data.UserCode);
        this._base._encryptedStorage.set(enAppSession.ProfilePhoto, data.ProfilePhoto);
        this._base._encryptedStorage.set(enAppSession.Bio, data.Bio);
        this._base._encryptedStorage.set(enAppSession.SocialProfileUrl, data.SocialProfileUrl);
        this._base._encryptedStorage.set(enAppSession.StudioGears, data.StudioGears);
        this._base._encryptedStorage.set(enAppSession.GovitID, data.GovitID);
        this._base._encryptedStorage.set(enAppSession.PayPalEmailID, data.PayPalEmailID);
        this._base._encryptedStorage.set(enAppSession.UserMasterDataIDs, data.UserMasterDataIDs);
        this._base._encryptedStorage.set(enAppSession.FileUrls, JSON.stringify(data.FileManager));
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
                                                                        this._base._encryptedStorage.get(enAppSession.FileUrls).then(FileUrls => {
                                                                            this._base._encryptedStorage.get(enAppSession.FileManager).then(FileManager => {
                                                                                let profileData: ProfileUpdateModel = {
                                                                                    Ref_User_ID: Ref_User_ID,
                                                                                    UserCode: null,
                                                                                    FullName: FullName,
                                                                                    EmailID: EmailID,
                                                                                    ProfilePhoto: ProfilePic,
                                                                                    MobileNumber: MobileNumber,
                                                                                    Password: null,
                                                                                    Bio: Bio,
                                                                                    FileUrls: this._base._commonService.tryParseJSON(FileUrls) ? JSON.parse(FileUrls) : [],
                                                                                    FileManager: this._base._commonService.tryParseJSON(FileManager) ? JSON.parse(FileManager) : [],
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
            })


        })
    }

    CustomServices(ProducersID: string) {
        return this._base._ApiService.get(`${ApiConstant.customer.CustomServices}?ProducersID=${ProducersID}`);
    }
    Producers(UserID: string) {
        return this._base._ApiService.get(`${ApiConstant.customer.Producers}?UserID=${UserID}&StartCount=1&EndCount=1`);
    }
    TrackAndBeat(ProducersID: string, UserID: string) {
        return this._base._ApiService.get(`${ApiConstant.customer.TrackAndBeat}?ProducersID=${ProducersID}&UserID=${UserID}`);
    }
    UserAction(data: { UserID: number, ObjectID: number, ObjectType: string, Action: string }) {
        return this._base._ApiService.post(`${ApiConstant.Order.UserAction}`, data);
    }

    Order(data: { ObjectList: Array<{ UserID: number; OrderID: number; ObjectID: number; ObjectType: string; OrderStatus: string; }> }) {
        return this._base._ApiService.post(`${ApiConstant.Order.Order}`, data);
    }


}