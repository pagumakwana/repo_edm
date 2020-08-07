import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { FileUploadService } from './../../../_appService/fileUploadService/fileUploadService'
import { ApiConstant } from './../../../_appModel/apiconstant'
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { CommonService } from './../../../_appService/common.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../_appService/category/category.serviec';
import { environment } from './../../../../environments/environment.prod';
@Component({
  selector: 'appAdmin-addmodifytrack',
  templateUrl: './addmodifytrack.component.html',
  styleUrls: ['./addmodifytrack.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifyTrackComponent implements OnInit {
  model: any = {};
  model2: any = {};
  moduleName
  trackId = 0;
  imgFile;
  formDataTrackImg
  uploadImage
  audioFile
  formDataaudio
  uploadAudio;
  trackImg: any;
  trackImguploaded: boolean = true;
  masterfileuploaded: boolean = true;
  unmasterfileuploaded: boolean = true;
  mixdowfileuploaded: boolean = true;
  urtoggedfileuploaded: boolean = true;
  Wavfileuploaded: boolean = true;
  stemsfileuploaded: boolean = true;
  MIDIfileuploaded: boolean = true;
  projectfileuploaded: boolean = true;
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
  uploadurtoggedfile: any;
  urtoggedfile: any;
  urtoggedfileurl: any;
  Wavfile: any;
  uploadwavefile: any;
  wavefileurl: any;
  finalsubmition: boolean = false;
  genrelist;
  selectedGenreName;
  Category_ID;
  MoodID;
  KeyID;
  DAWID;
  preview
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
  keylist = [
    { "Ref_User_ID": 0, "Ref_Key_ID": 1, "Ref_Parent_ID": 0, "KeyName": "A major", "AliasName": "A major", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Key_ID": 2, "Ref_Parent_ID": 0, "KeyName": "A minor", "AliasName": "A minor", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Key_ID": 1, "Ref_Parent_ID": 0, "KeyName": "B major", "AliasName": "B major", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Key_ID": 2, "Ref_Parent_ID": 0, "KeyName": "B minor", "AliasName": "B minor", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Key_ID": 1, "Ref_Parent_ID": 0, "KeyName": "C major", "AliasName": "C major", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Key_ID": 2, "Ref_Parent_ID": 0, "KeyName": "C minor", "AliasName": "C minor", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Key_ID": 1, "Ref_Parent_ID": 0, "KeyName": "D major", "AliasName": "D major", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
    { "Ref_User_ID": 0, "Ref_Key_ID": 2, "Ref_Parent_ID": 0, "KeyName": "D minor", "AliasName": "D minor", "CategoryUseBy": "", "Description": "For Beat upload", "ThumbnailImageUrl": "", "IsActive": true },
  ]
  DAWlist
  RADIO_LIST = [
    { name: 'Yes', value: 'true', checked: false },
    { name: 'No', value: 'false', checked: false }
  ];
  masterfile: any;
  unmasterfile: any;
  mixdowfile: any;
  stemsfile: any;
  projectfile: any;
  MIDIfile: any
  constructor(public _base: BaseServiceHelper,
    public fileUploadService: FileUploadService,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private _categoryService: CategoryService) {
  }
  public validateNum() {
    this.model.trackduration = this.model.trackduration.replace(/\D/g, '').replace(/(\d{2})(\d*)/, '$1:$2');
   // this.model.trackduration.length.substring(0,4)
  }
  public OnlyNumber(e) {
    debugger;
    e.target.value = e.target.value.replace(/[^\d/:]/g, '')
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength)
    }
    if (e.target.value > 2001) {
      alert('Amount limit upto $2000')
      e.target.value = ''
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.moduleName = params['module'];
      this.trackId = params['id'];
      if (this.trackId != 0) {
        this._base._pageTitleService.setTitle("Modify " + this.moduleName, "Modify " + this.moduleName);
        this.getTrackDetails(this.trackId);
      } else {
        this._base._pageTitleService.setTitle("Add " + this.moduleName, "Add " + this.moduleName);
        this.model = {};
        this.trackImg = undefined;
        this.masterfile = undefined;
        this.unmasterfile = undefined;
        this.mixdowfile = undefined;
        this.MIDIfile = undefined;
        this.stemsfile = undefined;
        this.urtoggedfile = undefined;
        this.projectfile = undefined;
        this.masterfileurl = undefined
        this.unmasterfileurl = undefined
        this.wavefileurl = undefined
        this.mixdowfileurl = undefined
        this.stemsfileurl = undefined
        this.urtoggedfileurl = undefined
        this.midifileurl = undefined
        this.projectfileurl = undefined
        this.trackId = 0;
        this.Category_ID = 0;
        this.MoodID = 0;
        this.KeyID = 0;
        this.DAWID = 0;
      }
    });
    console.log(this.trackId);
    this.bindCategory()
    this.bindDAW();
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
    this._categoryService.categorylist('ALL', 0).subscribe((resData: any) => {
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
      this.preview = environment.cdnURL + data[0].ThumbnailImageUrl
      this.masterfile = data[0].MasterFileUrl
      this.urtoggedfile = data[0].MasterFileUrl
      this.unmasterfile = data[0].UnmasteredFileUrl
      this.wavefileurl = data[0].UnmasteredFileUrl
      this.mixdowfile = data[0].MixdowFileUrl
      this.stemsfile = data[0].StemsUrl
      this.MIDIfile = data[0].MIDIFileUrl
      this.midifileurl = data[0].MIDIFileUrl
      this.projectfile = data[0].ProjectFilesUrl;
      this.masterfileurl = data[0].MasterFileUrl;
      this.urtoggedfileurl = data[0].MasterFileUrl;
      this.unmasterfileurl = data[0].UnmasteredFileUrl
      this.mixdowfileurl = data[0].MixdowFileUrl;
      this.stemsfileurl = data[0].StemsUrl;
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
        // this.formDataTrackImg = new FormData();
        //  this.formDataTrackImg.append('uploadFile', this.imgFile, this.imgFile.name);
        this.formDataTrackImg = $event.target.files
        reader.readAsDataURL(this.imgFile)
        reader.onload = (_event) => {
          this.preview = reader.result;
        }
        this.trackImg = this.imgFile.name;
      } else {
        alert('invalid formate');
      }
    }
  }
  changeListenerfile($event, fileType): void {
    debugger;
    this.audioFile = $event.target.files[0];
    console.log(this.audioFile);
    if (this.audioFile) {
      if (fileType == 'Projectfile' || fileType == 'Stemsfile') {
        if (/\.(zip|rar)$/i.test(this.audioFile.name) === true) {
          if (fileType == 'Stemsfile') {
            this.stemsfile = this.audioFile.name;
            this.uploadstemsfile = $event.target.files;
          } else if (fileType == 'Projectfile') {
            this.projectfile = this.audioFile.name;
            this.uploadprojectfile = $event.target.files; //new FormData();
            // this.uploadprojectfile.append('uploadFile', this.audioFile, this.audioFile.name);
          }
        } else {
          alert('Please select .zip or .rar file');
          this.audioFile = "";
        }
      } else if (fileType == 'Masterfile' || fileType == 'Urtoggedfile') {
        if (/\.(mp3)$/i.test(this.audioFile.name) === true) {
          if (fileType == 'Masterfile') {
            this.masterfile = this.audioFile.name;
            this.uploadmasterfile = $event.target.files; //new FormData();
          } else if (fileType == 'Urtoggedfile') {
            this.urtoggedfile = this.audioFile.name;
            this.uploadurtoggedfile = $event.target.files; //new FormData();
          }
        } else {
          alert('Please select .mp3 file');
          this.audioFile = "";
        }
      } else if (fileType == 'MIDIfile') {
        if (/\.(midi)$/i.test(this.audioFile.name) === true) {
          this.midifileurl = this.audioFile.name;
          this.uploadmidifile = $event.target.files; //new FormData();
        } else {
          alert('Please select .midi file');
          this.audioFile = "";
        }
      } else {
        if (/\.(wav)$/i.test(this.audioFile.name) === true) {
          if (fileType == 'Unmasterfile') {
            this.unmasterfile = this.audioFile.name;
            this.uploadunmasterfile = $event.target.files;// new FormData();
            // this.uploadunmasterfile.append('uploadFile', this.audioFile, this.audioFile.name);
          } else if (fileType == 'Mixdowfile') {
            this.mixdowfile = this.audioFile.name;
            this.uploadmixdowfile = $event.target.files; //new FormData();
            // this.uploadmixdowfile.append('uploadFile', this.audioFile, this.audioFile.name);
          }else if (fileType == 'Wavfile') {
            this.Wavfile = this.audioFile.name;
            this.uploadwavefile = $event.target.files; //new FormData();
            // this.uploadmixdowfile.append('uploadFile', this.audioFile, this.audioFile.name);
          }
        } else {
          alert('Please select .war file');
          this.audioFile = "";
        }
      }

    }
  }
  uploadImg() {
    this.commonService.showLoader()
    this._base._commonService.filesUpload(this.formDataTrackImg, 'Track').then(res => {
      console.log(res[0].FilePath);
      this.trackImg = res[0].FilePath;
      this.trackImguploaded = true;
      this.commonService.hideLoader();
    }, e => {
      this.commonService.hideLoader();
    })
    // this.fileUploadService.uploadonServer('Track', 'Image', '', this.formDataTrackImg, '').then(trackcover => {
    //   console.log(trackcover);

    //   this.commonService.hideLoader();
    // }, e => {
    //   this.commonService.hideLoader();
    // })
  }
  uploadfile(fileType) {
    this.commonService.showLoader()
    if (fileType == 'Masterfile') {
      this._base._commonService.filesUpload(this.uploadmasterfile, 'Track').then(data => {
        // this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadmasterfile, '').then(data => {
        console.log(data[0].FilePath);
        this.masterfileurl = data[0].FilePath;
        this.masterfileuploaded = true;
        this.commonService.hideLoader();
      })
    } else if (fileType == 'Unmasterfile') {
      this._base._commonService.filesUpload(this.uploadunmasterfile, 'Track').then(data => {
        //this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadunmasterfile, '').then(data => {
        console.log(data[0].FilePath);
        this.unmasterfileurl = data[0].FilePath;
        this.unmasterfileuploaded = true;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'Mixdowfile') {
      this._base._commonService.filesUpload(this.uploadmixdowfile, 'Track').then(data => {
        // this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadmixdowfile, '').then(data => {
        console.log(data);
        this.mixdowfileurl = data[0].FilePath;
        this.mixdowfileuploaded = true;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'Stemsfile') {
      this._base._commonService.filesUpload(this.uploadstemsfile, 'Track').then(data => {
        // this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadstemsfile, '').then(data => {
        console.log(data);
        this.stemsfileurl = data[0].FilePath;
        this.stemsfileuploaded = true;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'MIDIfile') {
      this._base._commonService.filesUpload(this.uploadmidifile, 'Track').then(data => {
        //this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadmidifile, '').then(data => {
        console.log(data);
        this.midifileurl = data[0].FilePath;
        this.MIDIfileuploaded = true;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'Projectfile') {
      this._base._commonService.filesUpload(this.uploadprojectfile, 'Track').then(data => {
        // this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadprojectfile, '').then(data => {
        console.log(data);
        this.projectfileurl = data[0].FilePath;
        this.projectfileuploaded = true;
        this.commonService.hideLoader()
      })
    } else if (fileType == 'Urtoggedfile') {
      this._base._commonService.filesUpload(this.uploadurtoggedfile, 'Track').then(data => {
        // this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadurtoggedfile, '').then(data => {
        console.log(data[0].FilePath);
        this.masterfileurl = data[0].FilePath;
        this.masterfileuploaded = true;
        this.urtoggedfileuploaded = true;
        this.commonService.hideLoader();
      })
    }else if (fileType == 'Wavfile') {
      this._base._commonService.filesUpload(this.uploadurtoggedfile, 'Track').then(data => {
        // this.fileUploadService.uploadonServer('Track', 'File', '', this.uploadurtoggedfile, '').then(data => {
        console.log(data[0].FilePath);
       // this.wavefileurl = data[0].FilePath;
       // this.Wavfileuploaded = true;
       this.unmasterfileurl = data[0].FilePath;
       this.unmasterfileuploaded = true;
        this.commonService.hideLoader();
      })
    }
  }
  onSubmit() {
    if (this.trackImg != undefined) {
      this.finalsubmition = true;
    } else {
      this.trackImguploaded = false;
    }
  }
  finaltrackSubmit() {
    if (this.checkfileuploaded()) {
      this.commonService.showLoader()
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        let ObjTrackDetails = {
          "Ref_Track_ID": this.trackId,
          "Ref_Category_ID": this.model.trackgenre,
          "TrackType": this.model.trackdjstyle == undefined ? '' : this.model.trackdjstyle,
          "TrackName": this.model.trackname,
          "Bio": this.model.trackshortBio,
          "Mood": this.model.mood == undefined ? '' : this.model.mood,
          "Key": this.model.beatkey == undefined ? '' : this.model.beatkey,
          "Tag": this.model.tags == undefined ? '' : this.model.tags,
          "Duration": this.model.trackduration == undefined ? '' : this.model.trackduration,
          "BMP": this.model.trackbmp,
          "DAW": this.model.trackDaw == undefined ? '' : this.model.trackDaw,
          "IsVocals": this.moduleName == 'Track' ? JSON.parse(this.model.trackvocals) : '',
          "IsTrack": this.moduleName == 'Track' ? true : false,
          "Price": this.model.trackprice,
          "PriceWithProjectFiles": 0,
          "BigImageUrl": this.trackImg,
          "ThumbnailImageUrl": this.trackImg,
          "MasterFileUrl": this.masterfileurl == undefined ? '' : this.masterfileurl,
          "UnmasteredFileUrl": this.unmasterfileurl == undefined ? '' : this.unmasterfileurl,
          "MixdowFileUrl": this.mixdowfileurl == undefined ? '' : this.mixdowfileurl,
          "StemsUrl": this.stemsfileurl == undefined ? '' : this.stemsfileurl,
          "MIDIFileUrl": this.midifileurl == undefined ? '' : this.midifileurl,
          "ProjectFilesUrl": this.projectfileurl == undefined ? '' : this.projectfileurl,
          "IsActive": true,
          "CreatedBy": FullName
        }
        this._base._ApiService.post(ApiConstant.TrackManagement.Track, ObjTrackDetails).subscribe(data => {
          console.log(data);
          // alert(data);
          (<any>$('#acknowledge_popup')).modal('show');
          this.commonService.hideLoader();
          // $('#acknowledge_popup').modal('show');
        }, e => {
          this.commonService.hideLoader();
        })
      })
    } else {
      if (this.masterfileurl == undefined) {
        this.masterfileuploaded = false;
      }
      if (this.unmasterfileurl == undefined) {
        this.unmasterfileuploaded = false;
      }
      if (this.mixdowfileurl == undefined) {
        this.mixdowfileuploaded = false;
      }
      if (this.stemsfileurl == undefined) {
        this.stemsfileuploaded = false;
      }
      if (this.urtoggedfileurl == undefined) {
        this.urtoggedfileuploaded = false;
      }
      if (this.midifileurl == undefined) {
        this.MIDIfileuploaded = false;
      }
      //if (this.projectfileurl == undefined) {
      // this.projectfileuploaded = false;
      // }
    }
  }
  checkfileuploaded() {
    if (this.moduleName == "Track") {
      if (this.masterfileurl != undefined && this.unmasterfileurl != undefined && this.mixdowfileurl != undefined && this.stemsfileurl != undefined && this.projectfileurl != undefined && this.midifileurl != undefined) {
        return true
      } else {
        return false
      }
    } else {
      if (this.stemsfileurl != undefined && this.masterfileurl != undefined && this.Wavfileuploaded != undefined) {
        return true
      } else {
        return false
      }
    }
  }

}
