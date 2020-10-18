import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { producerTab } from '../model/producer.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileUpdateService } from 'src/app/_appService/profileupdate/profileupdate.service';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import configData from '../../../assets/projectConfig.json'


@Component({
    selector: 'app-producer',
    templateUrl: './producer.component.html',
    styleUrls: ['./producer.component.scss', '../../widgets/featuredProductSlider/featuredProductSlider.component.scss', '../../home/home.component.scss', '../../service/service.component.scss', '../../product/product.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ProducerProfileComponent implements OnInit {
    constructor(private _base: BaseServiceHelper,
        private _activatedRouter: ActivatedRoute, private _profileService: ProfileUpdateService
    ) { }

    ngOnInit(): void {
        this.producerReqData.producerID = this._activatedRouter.snapshot.paramMap.get('producerID');
        console.log(this.producerReqData.producerID, "producerID")
        this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(userID => {
            this.producerReqData.Ref_User_ID = userID
            this.UserActionData.UserID = parseInt(userID)
            // this.UserActionData.ObjectID = parseInt(this.producerReqData.producerID)
            this.CustomServices()
            this.TrackAndBeat()
            this.Producers()
        })
    }
    config = configData
    producerReqData: { producerID: string, Ref_User_ID: string } = {
        producerID: null,
        Ref_User_ID: null
    }
    UserActionData: { UserID: number, ObjectID: number, ObjectType: string, Action: string } = {
        UserID: null,
        ObjectID: null,
        ObjectType: "Producer",
        Action: null
    }
    producerTab = producerTab
    currentTab: producerTab = producerTab.biography;
    producerData: { [key: string]: any } = {
        CustomServices: [],
        TrackAndBeat: {
            data: null,
            tracks: [],
            soldOutTracks: [],
            beats: []
        }
    }

    changeTab(tab: producerTab) {
        console.log(typeof tab, tab)
        this.currentTab = tab
    }

    CustomServices() {
        this._profileService.CustomServices(this.producerReqData.producerID ? this.producerReqData.producerID : '0').subscribe((res: any) => {
            console.log("CustomServices", res)
            this.producerData.CustomServices = res
        })
    }
    Producers() {
        this._profileService.Producers(this.producerReqData.Ref_User_ID).subscribe((res: any) => {
            console.log("Producers", res)
        })
    }
    TrackAndBeat() {
        this._base._commonService.showLoader();
        this._profileService.TrackAndBeat(this.producerReqData.producerID, this.producerReqData.Ref_User_ID).subscribe((res: any) => {
            // let TrackAndBeat = Array.isArray(res) && res.length > 0 ? res[0] : []
            this.producerData.TrackAndBeat.data = Array.isArray(res) && res.length > 0 ? res[0] : []
            this.producerData.TrackAndBeat.data.Followed = (this.producerData.TrackAndBeat.Followed != '-')
            if (Array.isArray(this.producerData.TrackAndBeat.data.TrackAndBeat)) {
                this.producerData.TrackAndBeat.tracks = this.producerData.TrackAndBeat.data.TrackAndBeat.filter(item => item.IsTrack == 'Track')
                this.producerData.TrackAndBeat.soldOutTracks = this.producerData.TrackAndBeat.tracks.filter(item => item.SoldOut == 'IN_CART') // SOLD_OUT IN_CART ADD_TO_CART
                this.producerData.TrackAndBeat.beats = this.producerData.TrackAndBeat.data.TrackAndBeat.filter(item => item.IsTrack == 'Beat')
            }
            console.log("TrackAndBeat", res, this.producerData.TrackAndBeat)
            this._base._commonService.hideLoader();
        })
    }
    UserActionNotificationAlert(ObjectData, requestData, responseData) {
        console.log("UserActionNotificationAlert", ObjectData, requestData, responseData)
        let msg = {
            Follow: `${requestData.ObjectType} followed successfully`,
            Unfollow: `${requestData.ObjectType} unfollow successfully`,
            Favourite: `${requestData.ObjectType} added`,
            Unfavourite: `${requestData.ObjectType} removed`,
            // error: `Something Went Wrong`,
        }
        // this._base._alertMessageService[requestData.Action == responseData ? 'success' : 'error'](requestData.Action == responseData ? msg[responseData] : msg.error)
        this._base._alertMessageService['success'](msg[responseData])
        if (requestData.Action == responseData) {
            if (requestData.ObjectType == 'Producer') {
                ObjectData.Followed = (responseData == 'Follow')
                ObjectData.Followers = (responseData == 'Follow') ? ObjectData.Followers + 1 : ObjectData.Followers - 1
            } else if (requestData.ObjectType == 'track') {
                ObjectData.Favourite = (responseData == 'Favourite')
            }
        }
    }

    // UserAction(ActionType: string, actionSet: boolean, actionObj: any) {
    UserAction(Action: string, ObjectID: number | any, ObjectType: string, actionObj: any) {
        this.UserActionData.Action = Action
        this.UserActionData.ObjectID = parseInt(ObjectID)
        this.UserActionData.ObjectType = ObjectType

        // if (ActionType == 'follow')
        //     this.UserActionData.Action = actionSet ? 'Follow' : "Unfollow"
        // if (ActionType == 'favorite')
        //     this.UserActionData.Action = actionSet ? 'Favourite' : "Unfavourite"
        this._profileService.UserAction(this.UserActionData).subscribe((res: any) => {
            console.log("UserAction", res, actionObj)
            this.UserActionNotificationAlert(actionObj, this.UserActionData, res)
            // if (ActionType == 'follow') {
            //     actionObj.Followed = (res == 'Follow')
            //     actionObj.Followers = (res == 'Follow') ? actionObj.Followers + 1 : actionObj.Followers - 1
            // } else if (ActionType == 'favorite') {
            //     actionObj = (res == 'Favourite')
            // }
        })
    }

}
