import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { Router } from '@angular/router';
import { enAppSession } from '../_appModel/enAppSession';
import { ApiConstant } from '../_appModel/apiconstant';
import { ProfileUpdateService } from '../_appService/profileupdate/profileupdate.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss', '../product/product.component.scss', '../widgets/featuredProductSlider/featuredProductSlider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WishlistComponent implements OnInit {

  requestData = {
    userId: null
  }
  wishlist
  beatlist
  tracklist
  audio = new Audio();
  audioplay: boolean = false;
  playpause: string = 'play';
  playpauseImg: string = '../../../assets/images/play_video.svg';
  UserActionData: { UserID: number, ObjectID: number, ObjectType: string, Action: string } = {
    UserID: null,
    ObjectID: null,
    ObjectType: "Producer",
    Action: null
}
  constructor(public _base: BaseServiceHelper,
    public router: Router,private _profileService: ProfileUpdateService
  ) { }
  ngOnInit(): void {
    this.getwishlistlist()
  }

  getwishlistlist() {
    debugger;
    this._base._commonService.showLoader()
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this.UserActionData.UserID = parseInt(Ref_User_ID)
      this._base._ApiService.get(ApiConstant.Order.UserAction + '?UserID=' + Ref_User_ID + '&Action=Wishlist').subscribe((data: any) => {
        data.map(item => {
          item.Thumbnail = this._base._commonService.cdnURL + item.Thumbnail;
        })
        this.wishlist = data
        this.beatlist = data.filter(res => res.ObjectType == "Beat");
        this.tracklist = data.filter(res => res.ObjectType == "Track");
        this._base._commonService.hideLoader()
        console.log(data)
      }, e => {
        console.log(e)
        this._base._commonService.hideLoader()
      })
    })
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
        console.log(data);
        this.getwishlistlist();
        this._base._commonService.hideLoader()
      }, e => {
        this._base._commonService.hideLoader()
      })
    })
  }
  playaudio(path, id, playtxt, pausetxt) {
    debugger
    if ($('.playpause_' + id).hasClass(pausetxt)) {
      this.wishlist.filter(item => {
        $('.playpause_' + item.ObjectID).removeClass(pausetxt);
        $('.playpause_' + item.ObjectID).addClass(playtxt);
      })
      this.audio.pause();
      this.audio = new Audio();
      this.playpause = 'Play';
      this.playpauseImg = '../../../assets/images/play_video.svg'
    } else
      if ($('.playpause_' + id).hasClass(playtxt)) {
        this.audio.src = this._base._commonService.cdnURL + path;
        this.wishlist.filter(item => {
          $('.playpause_' + item.ObjectID).removeClass(pausetxt);
          $('.playpause_' + item.ObjectID).addClass(playtxt);
        })
        this.audio.pause();
        this.audio.load();
        this.audio.play();
        this.playpause = 'Pause';
        this.playpauseImg = '../../../assets/images/pause.svg'
        $('.playpause_' + id).removeClass(playtxt);
        $('.playpause_' + id).addClass(pausetxt);
      }
  }
  setImg(id) {
    if ($('.playpause_' + id).hasClass('play')) {
      return '../../../assets/images/play_video.svg'
    } else {
      return '../../../assets/images/pause.svg'
    }
  }
  Order(Action: string, ObjectID: number | any, ObjectType: string, actionObj: any) {
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
        console.log("Order", res, actionObj)
        this._base._alertMessageService.success("Added in cart successfully!");
      }, e=>{
          this._base._commonService.hideLoader()
      })
}

}
