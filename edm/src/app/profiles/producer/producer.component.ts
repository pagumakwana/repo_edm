import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { producerTab } from '../model/producer.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileUpdateService } from 'src/app/_appService/profileupdate/profileupdate.service';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { enAppSession } from 'src/app/_appModel/enAppSession';

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
            this.CustomServices()
            this.TrackAndBeat()
        })
    }

    producerReqData: { producerID: string, Ref_User_ID: string } = {
        producerID: null,
        Ref_User_ID: null
    }
    UserActionData: { UserID: number, ObjectID: number, ObjectType: string, Action: string } = {
        UserID: parseInt(this.producerReqData.Ref_User_ID),
        ObjectID: parseInt(this.producerReqData.producerID),
        ObjectType: "Producer",
        Action: null
    }
    producerTab = producerTab
    currentTab: producerTab = producerTab.biography;
    producerData: { [key: string]: any } = {
        CustomServices: null,
        TrackAndBeat: null
    }

    changeTab(tab: producerTab) {
        console.log(typeof tab, tab)
        this.currentTab = tab
    }

    CustomServices() {
        this._profileService.CustomServices(this.producerReqData.producerID ? this.producerReqData.producerID : '0').subscribe((res: any) => {
            console.log("CustomServices", res)
        })
    }
    TrackAndBeat() {
        this._profileService.TrackAndBeat(this.producerReqData.producerID, this.producerReqData.Ref_User_ID).subscribe((res: any) => {
            console.log("TrackAndBeat", res)
            this.producerData.TrackAndBeat = Array.isArray(res) && res.length > 0 ? res[0] : []
            this.producerData.TrackAndBeat.Followed = (this.producerData.TrackAndBeat.Followed != '-')
        })
    }

    UserAction(isFollow: boolean) {
        this.UserActionData.Action = isFollow ? 'Follow' : "Unfollow"
        this._profileService.UserAction(this.UserActionData).subscribe((res: any) => {
            console.log("UserAction", res)
        })
    }

}
