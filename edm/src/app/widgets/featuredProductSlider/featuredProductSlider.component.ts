import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../_appService/baseHelper.service';
import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ApiConstant } from './../../_appModel/apiconstant';
import { Router } from '@angular/router';
import { TrackService } from '../../_appService/trackService';
import { enAppSession } from '../../_appModel/enAppSession';
import { ProfileUpdateService } from '../../_appService/profileupdate/profileupdate.service';

@Component({
    selector: 'app-featuredProductSlider',
    templateUrl: './featuredProductSlider.component.html',
    styleUrls: ['./featuredProductSlider.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FeaturedProductSliderComponent implements OnInit {
    @ViewChild(SwiperComponent) componentRef: SwiperComponent;
    audio = new Audio();
    audioplay: boolean = false;
    playpause: string = 'play'
    playpauseImg: string = '../../../assets/images/play_video.svg'
    UserActionData: { UserID: number, ObjectID: number, ObjectType: string, Action: string } = {
        UserID: null,
        ObjectID: null,
        ObjectType: "Producer",
        Action: null
    }
    constructor(public _base: BaseServiceHelper,
        private _trackService: TrackService,
        public router: Router,
        private _profileService: ProfileUpdateService) { }
    public featuredTrack: any = [];
    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        navigation: false,
        pagination: false,
        autoplay: false,
        centeredSlides: false,
        breakpoints: {
            501: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            701: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            951: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1201: {
                slidesPerView: 5,
                spaceBetween: 50,
            },
        }
    };

    private scrollbar: SwiperScrollbarInterface = {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true
    };

    private pagination: SwiperPaginationInterface = {
        el: '.swiper-pagination',
        clickable: true,
        hideOnClick: false
    };
    ngOnInit(): void {
        this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
            this._trackService.getFeaturedTrack(0, 5, Ref_User_ID).subscribe((data: any) => {
                this.UserActionData.UserID = parseInt(Ref_User_ID)
                if (this._base._commonService.FeatureProducts == "Beats") {
                    this.featuredTrack = data.filter(a => a.IsTrack == 'Beat');
                } else {
                    this.featuredTrack = data.filter(a => a.IsTrack == 'Track');
                }

            })
        })
    }
    redirect(id) {
        this.router.navigate(['product/' + this._base._commonService.FeatureProducts + '/details', id]).then((e) => {
            if (e) {
                console.log("Navigation is successful!");
            } else {
                console.log("Navigation has failed!");
            }
        });
    }
    playaudio(path, id, data) {
        debugger
        if ($('.playpause_' + id).hasClass('pause')) {
            data.filter(item => {
                $('.playpause_' + item.Ref_Track_ID).removeClass('pause');
                $('.playpause_' + item.Ref_Track_ID).addClass('play');
            })
            this.audio.pause();
            this.audio = new Audio();
            this.playpause = 'Play';
            this.playpauseImg = '../../../assets/images/play_video.svg'
            // $('.playpause_' + id).removeClass('pause');
            //$('.playpause_' + id).addClass('play');
        } else if ($('.playpause_' + id).hasClass('play')) {
            this.audio.src = this._base._commonService.cdnURL + path;
            data.filter(item => {
                $('.playpause_' + item.Ref_Track_ID).removeClass('pause');
                $('.playpause_' + item.Ref_Track_ID).addClass('play');
            })
            this.audio.pause();
            this.audio.load();
            this.audio.play();
            this.playpause = 'Pause';
            this.playpauseImg = '../../../assets/images/pause.svg'
            $('.playpause_' + id).removeClass('play');
            $('.playpause_' + id).addClass('pause');
        }
    }
    setImg(id){
        if ($('.playpause_' + id).hasClass('play')) {
          return '../../../assets/images/play_video.svg'
        }else{
          return '../../../assets/images/pause.svg'
        }
      }
    useraction(ObjectID, ObjectType, Action) {
        this._base._commonService.showLoader()
        this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
            let ObjUseraction = {
                "UserID": Ref_User_ID,
                "ObjectID": ObjectID,
                "ObjectType": ObjectType,
                "Action": Action
            }
            this._base._ApiService.post(ApiConstant.Order.UserAction, ObjUseraction).subscribe((data: any) => {
                console.log(data)
                if(Action == "Favourite" || Action == "Unfavourite"){
                    this.Addonwhishlist(Ref_User_ID,ObjectID,ObjectType, Action)
                }else{
                    this.ngOnInit()
                    this._base._commonService.hideLoader()
                }
            }, e => {
                this._base._commonService.hideLoader()
            })
        })
    }
    Addonwhishlist(Ref_User_ID,ObjectID,ObjectType, Action){
        let ObjUseraction = {
            "UserID": Ref_User_ID,
            "ObjectID": ObjectID,
            "ObjectType": ObjectType,
            "Action": Action == "Favourite"?"Wishlist":"Unwishlist"
        }
        this._base._ApiService.post(ApiConstant.Order.UserAction, ObjUseraction).subscribe((data: any) => {
            console.log(data)
            this.ngOnInit()
            this._base._commonService.hideLoader()
        }, e => {
            this._base._commonService.hideLoader()
        }) 
    }
    Order(Action: string, ObjectID: number | any, ObjectType: string, actionObj: any) {
        this._base._commonService.showLoader()
        this.UserActionData.Action = Action
        this.UserActionData.ObjectID = parseInt(ObjectID)
        this.UserActionData.ObjectType = ObjectType
        let Object = {
            UserID: this.UserActionData.UserID,
            OrderID: 0,
            ObjectID: parseInt(ObjectID),
            ObjectType: ObjectType,
            OrderStatus: Action
        }
    
        let Data: { ObjectList: Array<{ UserID: number; OrderID: number; ObjectID: number; ObjectType: string; OrderStatus: string; }> } = { ObjectList: [] }
    
        Data.ObjectList.push(Object)
    
        this._profileService.Order(Data).subscribe((res: any) => {
            this._base._commonService.hideLoader()
            console.log("Order", res, actionObj);
            //this._base._commonService.UserActionNotificationAlert(actionObj, this.UserActionData, res);
            this._base._alertMessageService.success("Added in cart successfully!");
        }, e=>{
            this._base._commonService.hideLoader()
        })
    }

}
