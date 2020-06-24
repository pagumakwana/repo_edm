import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { FileUploadService } from './../../../_appService/fileUploadService/fileUploadService'
import { ApiConstant } from './../../../_appModel/apiconstant'
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { CommonService } from './../../../_appService/common.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'appAdmin-addmodifytrack',
  templateUrl: './addmodifytrack.component.html',
  styleUrls: ['./addmodifytrack.component.scss']
})
export class AddModifyTrackComponent implements OnInit {
  model: any = {};
  model2: any = {};
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
  finalsubmition:boolean=false;
  constructor(public _base: BaseServiceHelper,
    public fileUploadService: FileUploadService,
    public commonService: CommonService,
    public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    //this.model.trackname = "ddd"
    this.route.params.subscribe(params => {
      this.trackId = params['id'];
      if (this.trackId != 0) {
        this.getTrackDetails(this.trackId);
      }else{
        this.trackId = 0;
      }
    });
    console.log(this.trackId);

  }
  public getTrackDetails(trackId){
    this._base._ApiService.get(ApiConstant.TrackManagement.Track + '?TrackID=' + trackId).subscribe((data:any) =>{
      console.log(data);
      this.model.trackdjstyle = data[0].TrackType
      this.model.trackname= data[0].TrackName
      this.model.trackshortBio= data[0].Bio
       this.model.Key= data[0].Key
      this.model.trackduration= data[0].Duration
      this.model.trackbmp= data[0].BMP
      this.model.trackvocals= data[0].IsVocals
      this.model.trackprice= data[0].Price
      this.model.trackImg= "C:\Users\Tanishk\Downloads\Dubstep - Space force\Dubstep - Space force.mp3" //data[0].ThumbnailImageUrl
      this.trackImg= data[0].ThumbnailImageUrl
      this.model2.masterfile= data[0].MasterFileUrl
      this.model2.unmasterfile= data[0].UnmasteredFileUrl
      this.model2.mixdowfile= data[0].MixdowFileUrl
      this.model2.stemsfile= data[0].StemsUrl
      this.model2.projectfile= data[0].ProjectFilesUrl
      //this.model2.MIDIfile= data[0].MIDIfile
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
      this.commonService.hideLoader()
      this.finalsubmition= true;
    },e=>{
      this.commonService.hideLoader();
    })
  }
  finaltrackSubmit() {
    this.commonService.showLoader()
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      let ObjTrackDetails = {
        "Ref_Track_ID": this.trackId,
        "Ref_Category_ID": 0,
        "TrackType": this.model.trackdjstyle,
        "TrackName": this.model.trackname,
        "Bio": this.model.trackshortBio,
        "Mood": this.model.trackname,
        "Key": this.model.Key,
        "Tag": this.model.trackname,
        "Duration": this.model.trackduration,
        "BMP": this.model.trackbmp,
        "DAW": this.model.trackname,
        "IsVocals": JSON.parse(this.model.trackvocals),
        "IsTrack": true,
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
      this._base._ApiService.post(ApiConstant.TrackManagement.Track, ObjTrackDetails).subscribe(data => {
        console.log(data);
        this.commonService.hideLoader();
        $('#acknowledge_popup').modal('show');
      },e=>{
        this.commonService.hideLoader();
      })
    })
  }

}
