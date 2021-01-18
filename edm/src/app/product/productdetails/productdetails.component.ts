import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../_appService/baseHelper.service';
import { FileUploadService } from './../../_appService/fileUploadService/fileUploadService'
import { ApiConstant } from './../../_appModel/apiconstant'
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { CommonService } from './../../_appService/common.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../_appService/category/category.serviec';
import { ProfileUpdateService } from '../../_appService/profileupdate/profileupdate.service';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  moodlist = [
    { "Ref_User_ID": 0, "Ref_Mood_ID": 1, "Ref_Parent_ID": 0, "MoodName": "Accomplished", "AliasName": "Accomplished", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 2, "Ref_Parent_ID": 0, "MoodName": "Adored", "AliasName": "Adored", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 3, "Ref_Parent_ID": 0, "MoodName": "Angry", "AliasName": "Angry", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 4, "Ref_Parent_ID": 0, "MoodName": "Annoyed", "AliasName": "Annoyed", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 5, "Ref_Parent_ID": 0, "MoodName": "Anxious", "AliasName": "Anxious", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 6, "Ref_Parent_ID": 0, "MoodName": "Bouncy", "AliasName": "Bouncy", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 7, "Ref_Parent_ID": 0, "MoodName": "Calm", "AliasName": "Calm", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 8, "Ref_Parent_ID": 0, "MoodName": "Confident", "AliasName": "Confident", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 9, "Ref_Parent_ID": 0, "MoodName": "Crazy", "AliasName": "Crazy", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 10, "Ref_Parent_ID": 0, "MoodName": "Crunk", "AliasName": "Crunk", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 11, "Ref_Parent_ID": 0, "MoodName": "Dark", "AliasName": "Dark", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 12, "Ref_Parent_ID": 0, "MoodName": "Depressed", "AliasName": "Depressed", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 13, "Ref_Parent_ID": 0, "MoodName": "Determined", "AliasName": "Determined", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 14, "Ref_Parent_ID": 0, "MoodName": "Disappointed", "AliasName": "Disappointed", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 15, "Ref_Parent_ID": 0, "MoodName": "Eccentric", "AliasName": "Eccentric", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 16, "Ref_Parent_ID": 0, "MoodName": "Energetic", "AliasName": "Energetic", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 17, "Ref_Parent_ID": 0, "MoodName": "Enraged", "AliasName": "Enraged", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 18, "Ref_Parent_ID": 0, "MoodName": "Epic", "AliasName": "Epic", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 19, "Ref_Parent_ID": 0, "MoodName": "Evil", "AliasName": "Evil", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 20, "Ref_Parent_ID": 0, "MoodName": "Flirty", "AliasName": "Flirty", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 21, "Ref_Parent_ID": 0, "MoodName": "Frantic", "AliasName": "Frantic", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 22, "Ref_Parent_ID": 0, "MoodName": "Giddy", "AliasName": "Giddy", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 23, "Ref_Parent_ID": 0, "MoodName": "Gloomy", "AliasName": "Gloomy", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 24, "Ref_Parent_ID": 0, "MoodName": "Grateful", "AliasName": "Grateful", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 25, "Ref_Parent_ID": 0, "MoodName": "Happy", "AliasName": "Happy", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 26, "Ref_Parent_ID": 0, "MoodName": "Hyper", "AliasName": "Hyper", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 27, "Ref_Parent_ID": 0, "MoodName": "Inspiring", "AliasName": "Inspiring", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 28, "Ref_Parent_ID": 0, "MoodName": "Intense", "AliasName": "Intense", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 29, "Ref_Parent_ID": 0, "MoodName": "Lazy", "AliasName": "Lazy", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 30, "Ref_Parent_ID": 0, "MoodName": "Lonely", "AliasName": "Lonely", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 31, "Ref_Parent_ID": 0, "MoodName": "Loved", "AliasName": "Loved", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 32, "Ref_Parent_ID": 0, "MoodName": "Mellow", "AliasName": "Mellow", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 33, "Ref_Parent_ID": 0, "MoodName": "Peaceful", "AliasName": "Peaceful", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 34, "Ref_Parent_ID": 0, "MoodName": "Rebellious", "AliasName": "Rebellious", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 35, "Ref_Parent_ID": 0, "MoodName": "Relaxed", "AliasName": "Relaxed", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 36, "Ref_Parent_ID": 0, "MoodName": "Sad", "AliasName": "Sad", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 37, "Ref_Parent_ID": 0, "MoodName": "Scared", "AliasName": "Scared", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 38, "Ref_Parent_ID": 0, "MoodName": "Silly", "AliasName": "Silly", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Mood_ID": 39, "Ref_Parent_ID": 0, "MoodName": "Soulful", "AliasName": "Soulful", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true }
  ]
  productId
  productDetails
  DAWlist
  audio = new Audio();
  audioplay: boolean = false;
  playpause: string = 'play'
  storetype
  playpauseImg: string = '../../../assets/images/play_video.svg'
  UserActionData: { UserID: number, ObjectID: number, ObjectType: string, Action: string } = {
    UserID: null,
    ObjectID: null,
    ObjectType: "Producer",
    Action: null
  }
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
  constructor(public _base: BaseServiceHelper,
    public fileUploadService: FileUploadService,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private _categoryService: CategoryService, private _profileService: ProfileUpdateService,
    private router: Router) {
    this.bindDAW()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['type'] == "CustomTrack") {
        this.storetype = "Track";
      } else {
        this.storetype = params['type'];
      }
      this.productId = params['ID'];
      this._base._commonService.FeatureProducts = this.storetype
      debugger;
      this.getProductDetails(this.productId);
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(userID => {
        this.UserActionData.UserID = parseInt(userID)
      })
    })
  }
  public bindDAW() {
    this._base._ApiService.get(ApiConstant.MasterManagement.DAW).subscribe((data: any) => {
      this.DAWlist = data
    });
  }
  public getDawName(id) {
    let list = this.DAWlist.filter(a => a.Ref_DAW_ID == id);
    if (list.length != 0) {
      return list[0].DAW
    } else {
      return '-'
    }

  }
  public getMoodName(id) {
    let list = this.moodlist.filter(a => a.Ref_Mood_ID == id);
    if (list.length != 0) {
      return list[0].MoodName
    } else {
      return '-'
    }

  }
  public getProductDetails(productId) {
    debugger
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._ApiService.get(ApiConstant.Track.TrackAndBeatDetails + '?UserID=' + Ref_User_ID + '&TrackID=' + productId).subscribe((data: any) => {
        console.log(data);
        this.productDetails = data;
        this.productDetails.map(item => {
          item.ThumbnailImageUrl = this._base._commonService.cdnURL + item.ThumbnailImageUrl;
          item.DAWName = this.getDawName(item.DAW);
          item.MoodName = this.getMoodName(item.Mood);
        })
        console.log(this.productDetails);
      })
    })
  }
  public filterfile(FileManager, fileType) {
    let file = FileManager.filter(item => item.FileIdentifier == fileType)
    const lastItem = file[file.length - 1]
    return this._base._commonService.cdnURL + lastItem.FilePath
  }
  playaudio(path, id, data) {
    debugger
    if ($('.playpause_' + id).hasClass('pause')) {
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pause');
        $('.playpause_' + item.Ref_Track_ID).addClass('play');
        if (item.RelatedTrack.length != 0) {
          item.RelatedTrack.filter(items => {
            $('.playpause_' + items.Ref_Track_ID).removeClass('pause');
            $('.playpause_' + items.Ref_Track_ID).addClass('play');

          })
        }
      })
      this.audio.pause();
      this.audio = new Audio();
      this.playpause = 'Play';
      this.playpauseImg = '../../../assets/images/play_video.svg'
      // $('.playpause_' + id).removeClass('pause');
      //$('.playpause_' + id).addClass('play');
    } else if ($('.playpause_' + id).hasClass('play')) {
      let file = path.filter(item => item.FileIdentifier == "MasterFile")
      this.audio.src = this._base._commonService.cdnURL + file[0].FilePath;;
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pause');
        $('.playpause_' + item.Ref_Track_ID).addClass('play');
        if (item.RelatedTrack.length != 0) {
          item.RelatedTrack.filter(items => {
            $('.playpause_' + items.Ref_Track_ID).removeClass('pause');
            $('.playpause_' + items.Ref_Track_ID).addClass('play');

          })
        }
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
  playaudio2(path, id, data) {
    debugger
    if ($('.playpause_' + id).hasClass('pause')) {
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pause');
        $('.playpause_' + item.Ref_Track_ID).addClass('play');
      })
      this.productDetails.filter(item => {
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
      this.productDetails.filter(item => {
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
  useraction(ObjectID, ObjectType, Action) {
    this._base._commonService.showLoader();
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      let ObjUseraction = {
        "UserID": Ref_User_ID,
        "ObjectID": ObjectID,
        "ObjectType": ObjectType == "Beats" ? "Beat" : ObjectType,
        "Action": Action
      }
      this._base._ApiService.post(ApiConstant.Order.UserAction, ObjUseraction).subscribe((data: any) => {
        console.log(data)
        this.getProductDetails(this.productId);
        this._base._commonService.hideLoader();
      }, e => {
        this._base._commonService.hideLoader();
      })
    })
  }
  Order(Action: string, ObjectID: number | any, ObjectType: string, actionObj: any) {
    this._base._commonService.showLoader()
    this.UserActionData.Action = Action
    this.UserActionData.ObjectID = parseInt(ObjectID)
    this.UserActionData.ObjectType = ObjectType == "Beats" ? "Beat" : ObjectType
    let Object = {
      UserID: this.UserActionData.UserID,
      OrderID: 0,
      ObjectID: parseInt(ObjectID),
      ObjectType: ObjectType == "Beats" ? "Beat" : ObjectType,
      OrderStatus: Action
    }

    let Data: { ObjectList: Array<{ UserID: number; OrderID: number; ObjectID: number; ObjectType: string; OrderStatus: string; }> } = { ObjectList: [] }

    Data.ObjectList.push(Object)

    this._profileService.Order(Data).subscribe((res: any) => {
      this._base._commonService.hideLoader()
      this._base._commonService.checkCartValue()
      console.log("Order", res, actionObj)
      //this._base._commonService.UserActionNotificationAlert(actionObj, this.UserActionData, res);
      this._base._alertMessageService.success("Added in cart successfully!");
    }, e => {
      this._base._commonService.hideLoader()
    })
  }
  setImg(id) {
    if ($('.playpause_' + id).hasClass('play')) {
      return '../../../assets/images/play_video.svg'
    } else {
      return '../../../assets/images/pause.svg'
    }
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
}
