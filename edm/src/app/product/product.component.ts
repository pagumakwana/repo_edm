import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { ApiConstant } from '../_appModel/apiconstant';
import { CategoryService } from './../_appService/category/category.serviec';
import { Options, LabelType } from 'ng5-slider';
import { enAppSession } from '../_appModel/enAppSession';
import { ActivatedRoute } from '@angular/router';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ProfileUpdateService } from '../_appService/profileupdate/profileupdate.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss', '../widgets/featuredProductSlider/featuredProductSlider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ProductComponent implements OnInit {
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
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
        slidesPerView: 4.4,
        spaceBetween: 40,
      },
    }
  };
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
  minValue: number = 0;
  maxValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<span class="range_price"> $' + value + '</span>';
        case LabelType.High:
          return '<span class="range_price"> $' + value + '</span>';
        default:
          return '$' + value;
      }
    }
  };
  public storetype: any;
  public DAWlist: any
  public products: any
  public Productlist: any;
  public ProductWithPricelist: any;
  public filtersproducts: any
  public genrelist: any;
  public selectedGenre = []
  public selectedDAW = []
  public selectedMOOD = []
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
    private _categoryService: CategoryService,
    private route: ActivatedRoute, private _profileService: ProfileUpdateService) {
    this.bindDAW()
  }
  public isFilterDisplay: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storetype = params['type'];
      this._base._commonService.showLoader();
      this._categoryService.categorylist(this.storetype == 'CustomTrack' ? 'Track' : this.storetype, 0).subscribe((resData: any) => {
        let categoryData = []
        categoryData = Array.isArray(resData) ? resData : []
        console.log("categoryData", categoryData);
        this.genrelist = categoryData;
        this.getProductlist();
      }, e => {
        this._base._commonService.hideLoader();
      });
      console.log(this.minValue, this.maxValue)
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(userID => {
        this.UserActionData.UserID = parseInt(userID)
      })
    }, e => {
      this._base._commonService.hideLoader();
    });
   

  }
  getProductlist() {
    debugger;
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._ApiService.get(ApiConstant.Track.FilterTrack + '?UserID=' + Ref_User_ID + '&StartCount=0&EndCount=0').subscribe((data: any) => {
        if (this.storetype == "Beats") {
          this.products = data.filter(res => res.IsTrack == "Beat");
        } else {
         
          this.products = data.filter(res => res.IsTrack == "Track");
        }
        this._base._commonService.hideLoader();
        this.Productlist = this.products;
        this.ProductWithPricelist = this.Productlist;
        this.filtersproducts = this.ProductWithPricelist;
        this.Productlist.map(item => {
          item.ThumbnailImageUrl = this._base._commonService.cdnURL + item.ThumbnailImageUrl;
        })
      })
    })
  }
  public filterfile(FileManager, fileType){
    let file = FileManager.filter(item => item.FileIdentifier == fileType)
      if(file.length != 0){
        const lastItem = file[file.length - 1]
        return this._base._commonService.cdnURL +  lastItem.FilePath
      }
    }
  bindDAW() {
    this._base._ApiService.get(ApiConstant.MasterManagement.DAW).subscribe((data: any) => {
      this.DAWlist = data;
    });
  }
  onGenreFilter(e) {
    let index = this.selectedGenre.indexOf(e); // get index if value found otherwise -1
    if (index > -1) { //if found
      this.selectedGenre.splice(index, 1);
    } else {
      this.selectedGenre.push(e)
    }
    if (this.selectedGenre.length == 0) {
      this.Productlist = this.products;
      this.ProductWithPricelist = this.Productlist;
      this.filtersproducts = this.Productlist;
    } else {
      this.Productlist = this.filterObjectArray(this.products, this.selectedGenre, 'CategoryName');
      this.ProductWithPricelist = this.Productlist;
      this.filtersproducts = this.ProductWithPricelist;
    }
    this.pricefilter();
    console.log(this.selectedGenre);
    console.log(this.minValue, this.maxValue)
  }
  filterObjectArray = (arr, filterArr, type) => {
    if (type == "DAW") {
      return arr.filter(el =>
        filterArr.some(f =>
          f == el.DAW
        )
      )
    } else if (type == "MOOD") {
      return arr.filter(el =>
        filterArr.some(f =>
          f == el.Mood
        )
      )
    }
    else {
      return arr.filter(el =>
        filterArr.some(f =>
          f === el.CategoryName
        )
      )
    }

  }
  selectedOption(ID, option) {
    let index
    if (option == 'Genre') {
      index = this.selectedGenre.indexOf(ID); // get index if value found otherwise -1
    } else if (option == 'DAW') {
      index = this.selectedDAW.indexOf(ID); // get index if value found otherwise -1
    } else if (option == 'MOOD') {
      index = this.selectedMOOD.indexOf(ID); // get index if value found otherwise -1
    }
    if (index > -1) { //if found
      return 'selected_options';
    } else {
      return '';
    }
  }
  filtersDisplay() {
    debugger
    if (this.isFilterDisplay) {
      this.isFilterDisplay = false;
    } else {
      this.isFilterDisplay = true;
    }
  }
  pricefilter() {
    var filtered = [];
    this.Productlist.filter(d => {
      if (d.Price >= this.minValue && d.Price <= this.maxValue)
        filtered.push(d);
    })
    this.ProductWithPricelist = filtered;
    this.filtersproducts = this.ProductWithPricelist;
    this.onDAWFilterS();
    this.onMOODFilterS();
  }
  onDAWFilter(e) {
    let index = this.selectedDAW.indexOf(e); // get index if value found otherwise -1
    if (index > -1) { //if found
      this.selectedDAW.splice(index, 1);
    } else {
      this.selectedDAW.push(e)
    }
    this.onDAWFilterS()
  }
  onDAWFilterS() {
    if (this.selectedDAW.length == 0) {
      this.filtersproducts = this.ProductWithPricelist;
    } else {
      this.filtersproducts = this.filterObjectArray(this.ProductWithPricelist, this.selectedDAW, 'DAW')
    }
    console.log(this.selectedDAW);
    console.log(this.minValue, this.maxValue)
  }
  onMOODFilter(e) {
    let index = this.selectedMOOD.indexOf(e); // get index if value found otherwise -1
    if (index > -1) { //if found
      this.selectedMOOD.splice(index, 1);
    } else {
      this.selectedMOOD.push(e)
    }
    this.onMOODFilterS()
  }
  onMOODFilterS() {
    if (this.selectedMOOD.length == 0) {
      this.filtersproducts = this.ProductWithPricelist;
    } else {
      this.filtersproducts = this.filterObjectArray(this.ProductWithPricelist, this.selectedMOOD, 'MOOD')
    }
    console.log(this.selectedMOOD);
    console.log(this.minValue, this.maxValue)
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
        if(Action == "Favourite" || Action == "Unfavourite"){
          this.Addonwhishlist(Ref_User_ID,ObjectID,ObjectType, Action)
      }else{
        this.getProductlist();
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
  playaudio(path, id, data) {
    debugger
    if ($('.playpause_' + id).hasClass('pausee')) {
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pausee');
        $('.playpause_' + item.Ref_Track_ID).addClass('playy');
      })
      this.audio.pause();
      this.audio = new Audio();
      this.playpause = 'Play';
      this.playpauseImg = '../../../assets/images/play_video.svg'
    } else
     if ($('.playpause_' + id).hasClass('playy')) {
      this.audio.src = this._base._commonService.cdnURL + path;
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pausee');
        $('.playpause_' + item.Ref_Track_ID).addClass('playy');
      })
      this.audio.pause();
      this.audio.load();
      this.audio.play();
      this.playpause = 'Pause';
      this.playpauseImg = '../../../assets/images/pause.svg'
      $('.playpause_' + id).removeClass('playy');
      $('.playpause_' + id).addClass('pausee');
    }
  }
  setImg(id){
    if ($('.playpause_' + id).hasClass('play')) {
      return '../../../assets/images/play_video.svg'
    }else{
      return '../../../assets/images/pause.svg'
    }
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
        console.log("Order", res, actionObj)
       //this._base._commonService.UserActionNotificationAlert(actionObj, this.UserActionData, res);
       this._base._alertMessageService.success("Added in cart successfully!");
      }, e=>{
          this._base._commonService.hideLoader()
      })
}
}
