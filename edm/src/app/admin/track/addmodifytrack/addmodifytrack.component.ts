import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { FileUploadService } from './../../../_appService/fileUploadService/fileUploadService'
import { ApiConstant } from './../../../_appModel/apiconstant'
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { CommonService } from './../../../_appService/common.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../_appService/category/category.serviec'
@Component({
  selector: 'appAdmin-addmodifytrack',
  templateUrl: './addmodifytrack.component.html',
  styleUrls: ['./addmodifytrack.component.scss']
})
export class AddModifyTrackComponent implements OnInit {
  model: any = {};
  model2: any = {};
  moduleName
  trackId = 0;
  imgFile
  formDataTrackImg
  uploadImage
  audioFile
  formDataaudio
  uploadAudio;
  trackImg: any;
  uploadmasterfile: any;
  uploadunmasterfile: any;
  uploadmixdowfile: any;
  uploadstemsfile: any;
  uploadmidifile: any;
  uploadprojectfile: any;
  masterfileurl: any;
  unmasterfileurl: any;
  mixdowfileurl: any;
  stemsfileurl: any;
  midifileurl: any;
  projectfileurl: any;
  uploadurtoggedfile:any;
  urtoggedfile:any;
  finalsubmition: boolean = false;
  genrelist;
  selectedGenreName;
  Category_ID;
  MoodID;
  KeyID;
  DAWID;
  moodlist = [
    {"Ref_User_ID":0,"Ref_Mood_ID":1,"Ref_Parent_ID":0,"MoodName":"Accomplished","AliasName":"Accomplished","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":2,"Ref_Parent_ID":0,"MoodName":"Adored","AliasName":"Adored","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":3,"Ref_Parent_ID":0,"MoodName":"Angry","AliasName":"Angry","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":4,"Ref_Parent_ID":0,"MoodName":"Annoyed","AliasName":"Annoyed","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":5,"Ref_Parent_ID":0,"MoodName":"Anxious","AliasName":"Anxious","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":6,"Ref_Parent_ID":0,"MoodName":"Bouncy","AliasName":"Bouncy","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":7,"Ref_Parent_ID":0,"MoodName":"Calm","AliasName":"Calm","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":8,"Ref_Parent_ID":0,"MoodName":"Confident","AliasName":"Confident","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":9,"Ref_Parent_ID":0,"MoodName":"Crazy","AliasName":"Crazy","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":10,"Ref_Parent_ID":0,"MoodName":"Crunk","AliasName":"Crunk","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":11,"Ref_Parent_ID":0,"MoodName":"Dark","AliasName":"Dark","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":12,"Ref_Parent_ID":0,"MoodName":"Depressed","AliasName":"Depressed","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":13,"Ref_Parent_ID":0,"MoodName":"Determined","AliasName":"Determined","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":14,"Ref_Parent_ID":0,"MoodName":"Disappointed","AliasName":"Disappointed","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":15,"Ref_Parent_ID":0,"MoodName":"Eccentric","AliasName":"Eccentric","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":16,"Ref_Parent_ID":0,"MoodName":"Energetic","AliasName":"Energetic","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":17,"Ref_Parent_ID":0,"MoodName":"Enraged","AliasName":"Enraged","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":18,"Ref_Parent_ID":0,"MoodName":"Epic","AliasName":"Epic","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":19,"Ref_Parent_ID":0,"MoodName":"Evil","AliasName":"Evil","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":20,"Ref_Parent_ID":0,"MoodName":"Flirty","AliasName":"Flirty","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":21,"Ref_Parent_ID":0,"MoodName":"Frantic","AliasName":"Frantic","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":22,"Ref_Parent_ID":0,"MoodName":"Giddy","AliasName":"Giddy","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":23,"Ref_Parent_ID":0,"MoodName":"Gloomy","AliasName":"Gloomy","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":24,"Ref_Parent_ID":0,"MoodName":"Grateful","AliasName":"Grateful","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":25,"Ref_Parent_ID":0,"MoodName":"Happy","AliasName":"Happy","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":26,"Ref_Parent_ID":0,"MoodName":"Hyper","AliasName":"Hyper","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":27,"Ref_Parent_ID":0,"MoodName":"Inspiring","AliasName":"Inspiring","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":28,"Ref_Parent_ID":0,"MoodName":"Intense","AliasName":"Intense","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":29,"Ref_Parent_ID":0,"MoodName":"Lazy","AliasName":"Lazy","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":30,"Ref_Parent_ID":0,"MoodName":"Lonely","AliasName":"Lonely","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":31,"Ref_Parent_ID":0,"MoodName":"Loved","AliasName":"Loved","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":32,"Ref_Parent_ID":0,"MoodName":"Mellow","AliasName":"Mellow","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":33,"Ref_Parent_ID":0,"MoodName":"Peaceful","AliasName":"Peaceful","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":34,"Ref_Parent_ID":0,"MoodName":"Rebellious","AliasName":"Rebellious","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":35,"Ref_Parent_ID":0,"MoodName":"Relaxed","AliasName":"Relaxed","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":36,"Ref_Parent_ID":0,"MoodName":"Sad","AliasName":"Sad","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":37,"Ref_Parent_ID":0,"MoodName":"Scared","AliasName":"Scared","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":38,"Ref_Parent_ID":0,"MoodName":"Silly","AliasName":"Silly","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Mood_ID":39,"Ref_Parent_ID":0,"MoodName":"Soulful","AliasName":"Soulful","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true}
  ]
  keylist = [
    {"Ref_User_ID":0,"Ref_Key_ID":1,"Ref_Parent_ID":0,"KeyName":"A major","AliasName":"A major","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Key_ID":2,"Ref_Parent_ID":0,"KeyName":"A minor","AliasName":"A minor","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Key_ID":1,"Ref_Parent_ID":0,"KeyName":"B major","AliasName":"B major","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Key_ID":2,"Ref_Parent_ID":0,"KeyName":"B minor","AliasName":"B minor","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Key_ID":1,"Ref_Parent_ID":0,"KeyName":"C major","AliasName":"C major","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Key_ID":2,"Ref_Parent_ID":0,"KeyName":"C minor","AliasName":"C minor","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Key_ID":1,"Ref_Parent_ID":0,"KeyName":"D major","AliasName":"D major","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
    {"Ref_User_ID":0,"Ref_Key_ID":2,"Ref_Parent_ID":0,"KeyName":"D minor","AliasName":"D minor","CategoryUseBy":"","Description":"For Beat upload","ThumbnailImageUrl":"","IsActive":true},
  ]
  DAWlist 
  //= [
    //{"Ref_User_ID":0,"Ref_DAW_ID":1,"Ref_Parent_ID":0,"DAWName":"For Track1","AliasName":"for-Beat1","CategoryUseBy":"","Description":"For Track upload","ThumbnailImageUrl":"","IsActive":true},
    //{"Ref_User_ID":0,"Ref_DAW_ID":2,"Ref_Parent_ID":0,"DAWName":"For Track2","AliasName":"for-Beat2","CategoryUseBy":"","Description":"For Track upload","ThumbnailImageUrl":"","IsActive":true}
  //]
  constructor(public _base: BaseServiceHelper,
    public fileUploadService: FileUploadService,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private _categoryService: CategoryService) {

  }

  ngOnInit(): void {
    //this.model.trackname = "ddd"
    this.route.params.subscribe(params => {
      this.moduleName = params['module']
      // if(params['module'] == 'Track'){
      //   this.moduleName = 'Track'
      // }else{
      //   this.moduleName = 'Beat'
      // }
      this.trackId = params['id'];
      if (this.trackId != 0) {
        this.getTrackDetails(this.trackId);
      } else {
        this.trackId = 0;
        this.Category_ID = 0;
        this.MoodID = 0;
      this.KeyID = 0;
      this.DAWID = 0;
      }
    });
    console.log(this.trackId);
    this.bindCategory()
    this.bindDAW()
  }
  onGenreChange(e) {
    debugger;
    let activeGroupName = this.genrelist.filter(items => items.Ref_Category_ID == this.Category_ID)
    if (activeGroupName.length) {
      this.selectedGenreName = activeGroupName["0"].CategoryName;
    } else {
      this.selectedGenreName = 'Select' + this.moduleName + 'genre';
    }

  }
  bindCategory() {
    this._categoryService.categorylist().subscribe((resData: any) => {
      let categoryData = []
      categoryData = Array.isArray(resData) ? resData : []
      console.log("categoryData", categoryData);
      this.genrelist = categoryData;
    });
  }
  bindDAW() {
    this._base._ApiService.get(ApiConstant.MasterManagement.DAW).subscribe((data: any) => {
      this.DAWlist = data;
    });
  }
  public getTrackDetails(trackId) {
    this._base._ApiService.get(ApiConstant.TrackManagement.Track + '?TrackID=' + trackId).subscribe((data: any) => {
      console.log(data);
      this.model.trackdjstyle = data[0].TrackType
      this.model.trackname = data[0].TrackName
      this.model.trackshortBio = data[0].Bio
      this.model.trackduration = data[0].Duration
      this.model.trackbmp = data[0].BMP
      this.model.trackvocals = data[0].IsVocals
      this.model.trackprice = data[0].Price
      this.model.trackImg = data[0].ThumbnailImageUrl
      this.trackImg = data[0].ThumbnailImageUrl
      this.model2.masterfile = data[0].MasterFileUrl
      this.model2.unmasterfile = data[0].UnmasteredFileUrl
      this.model2.mixdowfile = data[0].MixdowFileUrl
      this.model2.stemsfile = data[0].StemsUrl
      //this.model2.MIDIfile= data[0].MIDIfile
      this.model2.projectfile = data[0].ProjectFilesUrl;
      this.masterfileurl = data[0].MasterFileUrl
       this.unmasterfileurl = data[0].UnmasteredFileUrl
      this.mixdowfileurl= data[0].MixdowFileUrl
      this.stemsfileurl = data[0].StemsUrl
     // this.midifileurl,
      this.projectfileurl = data[0].ProjectFilesUrl;
      this.Category_ID = data[0].Ref_Category_ID;
      this.MoodID = data[0].Mood;
      this.KeyID = data[0].Key;
      this.DAWID = data[0].DAW;
      this.model.mood = data[0].Mood
      this.model.beatkey = data[0].Key
      this.model.trackDaw = data[0].DAW
      this.model.trackgenre = data[0].Ref_Category_ID
      this.model.tags = data[0].Tag;
      
    })
  }
  changeListenerTrackImg($event): void {
    debugger;
    this.imgFile = $event.target.files[0];
    console.log(this.imgFile);
    var that = this;
    var reader = new FileReader();
    if (this.imgFile) {
      if (this.imgFile.type == 'image/jpeg' || this.imgFile.type == 'image/jpg' || this.imgFile.type == 'image/png') {
        that.formDataTrackImg = new FormData();
        that.formDataTrackImg.append('uploadFile', this.imgFile, this.imgFile.name);
        reader.readAsDataURL(this.imgFile)
        reader.onload = (_event) => {
          // this.uploadImage = reader.result;
          // this.fileUploadService.uploadImageonServer = reader.result;
        }
      } else {
        alert('invalid formate');
      }
    }
  }
  changeListenerfile($event, fileType): void {
    debugger;
    this.commonService.showLoader()
    this.audioFile = $event.target.files[0];
    console.log(this.audioFile);
    // var that = this;
    // var readerAudio = new FileReader();
    if (this.audioFile) {
      if (this.audioFile.type == 'audio/mpeg') {
        if (fileType == 'Masterfile') {
          this.uploadmasterfile = new FormData();
          this.uploadmasterfile.append('uploadFile', this.audioFile, this.audioFile.name);
        } else if (fileType == 'Unmasterfile') {
          this.uploadunmasterfile = new FormData();
          this.uploadunmasterfile.append('uploadFile', this.audioFile, this.audioFile.name);
        } else if (fileType == 'Mixdowfile') {
          this.uploadmixdowfile = new FormData();
          this.uploadmixdowfile.append('uploadFile', this.audioFile, this.audioFile.name);
        } else if (fileType == 'Stemsfile') {
          this.uploadstemsfile = new FormData();
          this.uploadstemsfile.append('uploadFile', this.audioFile, this.audioFile.name);
        } else if (fileType == 'MIDIfile') {
          this.uploadmidifile = new FormData();
          this.uploadmidifile.append('uploadFile', this.audioFile, this.audioFile.name);
        } else if (fileType == 'Projectfile') {
          this.uploadprojectfile = new FormData();
          this.uploadprojectfile.append('uploadFile', this.audioFile, this.audioFile.name);
        }else if (fileType == 'Urtoggedfile') {
          this.uploadurtoggedfile = new FormData();
          this.uploadurtoggedfile.append('uploadFile', this.audioFile, this.audioFile.name);
        }
        this.uploadfile(fileType)
        //that.formDataaudio = new FormData();
        // that.formDataaudio.append('uploadFile', this.audioFile, this.audioFile.name);
        // readerAudio.onload = (_event) => { 
        // this.fileUploadService.uploadAudioonServer = readerAudio.result;

        // }
      } else {
        alert('invalid formate');
        this.audioFile = "";
      }
    }
  }
  uploadfile(fileType) {

    if (fileType == 'Masterfile') {
      this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadmasterfile, '').then(data => {
        console.log(data);
        this.uploadmasterfile = data;
        this.commonService.hideLoader();
      })
    } else if (fileType == 'Unmasterfile') {
      this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadunmasterfile, '').then(data => {
        console.log(data);
        this.unmasterfileurl = data;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'Mixdowfile') {
      this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadmixdowfile, '').then(data => {
        console.log(data);
        this.mixdowfileurl = data;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'Stemsfile') {
      this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadstemsfile, '').then(data => {
        console.log(data);
        this.stemsfileurl = data;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'MIDIfile') {
      this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadmidifile, '').then(data => {
        console.log(data);
        this.midifileurl = data;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'Projectfile') {
      this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadprojectfile, '').then(data => {
        console.log(data);
        this.projectfileurl = data;
        this.commonService.hideLoader()
      })
    }else if (fileType == 'Urtoggedfile') {
      this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadurtoggedfile, '').then(data => {
        console.log(data);
        this.urtoggedfile = data;
        this.commonService.hideLoader()
      })
    }
    // this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadtrackfile,'').then(data => {
    //   console.log(data);
    //   this.trackfileurl = data;
    // })
  }
  onSubmit() {
    this.commonService.showLoader()
    this.fileUploadService.uploadonServer('Track', 'Image', '', this.formDataTrackImg, '').then(trackcover => {
      console.log(trackcover);
      this.trackImg = trackcover;
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      let ObjTrackDetails = {
        "Ref_Track_ID": this.trackId,
        "Ref_Category_ID": this.model.trackgenre,
        "TrackType": this.model.trackdjstyle,
        "TrackName": this.model.trackname,
        "Bio": this.model.trackshortBio,
        "Mood": this.model.mood,
        "Key": this.model.beatkey,
        "Tag": this.model.tags,
        "Duration": this.model.trackduration,
        "BMP": this.model.trackbmp,
        "DAW": this.model.trackDaw,
        "IsVocals": this.moduleName == 'Track' ? JSON.parse(this.model.trackvocals) : '' ,
        "IsTrack": this.moduleName == 'Track' ? true : false,
        "Price": this.model.trackprice,
        "PriceWithProjectFiles": 0,
        "BigImageUrl": this.trackImg,
        "ThumbnailImageUrl": this.trackImg,
        "MasterFileUrl": this.masterfileurl,
        "UnmasteredFileUrl": this.unmasterfileurl,
        "MixdowFileUrl": this.mixdowfileurl,
        "StemsUrl": this.stemsfileurl,
        "MIDIUrl": this.midifileurl,
        "ProjectFilesUrl": this.projectfileurl,
        "IsActive": true,
        "CreatedBy": FullName
      }
      console.log(ObjTrackDetails)
    })
    
      this.commonService.hideLoader()
      this.finalsubmition = true;
    }, e => {
      this.commonService.hideLoader();
    })
  }
  finaltrackSubmit() {
    this.commonService.showLoader()
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      let ObjTrackDetails = {
        "Ref_Track_ID": this.trackId,
        "Ref_Category_ID": this.model.trackgenre,
        "TrackType": this.model.trackdjstyle == undefined ? '' : this.model.trackdjstyle ,
        "TrackName": this.model.trackname,
        "Bio": this.model.trackshortBio,
        "Mood": this.model.mood == undefined ? '' : this.model.mood ,
        "Key": this.model.beatkey == undefined ? '' : this.model.beatkey ,
        "Tag": this.model.tags == undefined ? '' : this.model.tags ,
        "Duration": this.model.trackduration == undefined ? '' : this.model.trackduration ,
        "BMP": this.model.trackbmp,
        "DAW": this.model.trackDaw == undefined ? '' : this.model.trackDaw ,
        "IsVocals": this.moduleName == 'Track' ? JSON.parse(this.model.trackvocals) : '' ,
        "IsTrack": this.moduleName == 'Track' ? true : false,
        "Price": this.model.trackprice,
        "PriceWithProjectFiles": 0,
        "BigImageUrl": this.trackImg,
        "ThumbnailImageUrl": this.trackImg,
        "MasterFileUrl": this.masterfileurl== undefined ? '' : this.masterfileurl ,
        "UnmasteredFileUrl": this.unmasterfileurl== undefined ? '' : this.unmasterfileurl ,
        "MixdowFileUrl": this.mixdowfileurl== undefined ? '' : this.mixdowfileurl ,
        "StemsUrl": this.stemsfileurl== undefined ? '' : this.stemsfileurl ,
        "MIDIUrl": this.midifileurl== undefined ? '' : this.midifileurl ,
        "ProjectFilesUrl": this.projectfileurl== undefined ? '' : this.projectfileurl ,
        "IsActive": true,
        "CreatedBy": FullName
      }
      this._base._ApiService.post(ApiConstant.TrackManagement.Track, ObjTrackDetails).subscribe(data => {
        console.log(data);
        this.commonService.hideLoader();
        // $('#acknowledge_popup').modal('show');
      }, e => {
        this.commonService.hideLoader();
      })
    })
  }

}
