import { Injectable } from "@angular/core";
//import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { environment } from "../../../environments/environment";
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/File-transfer/ngx';
//import { WebView } from '@ionic-native/ionic-webview/ngx';
import { CommonService } from "./../common.service";
import { ApiService } from "./../api.service";
@Injectable()
export class FileUploadService {
  formData;
  selectdefaultPic;
  uploadImage: any;
  uploadImageonServer: any;
  uploadAudioonServer:any
  defaultUserPic: string = "/Data/ProfileImages/Default_Profile_Icon.png";
  constructor(
    // private camera: Camera,
    // private fileTransfer: FileTransfer,
    // private webView: WebView,
     private commonService: CommonService,
    private apiService: ApiService,
  ) {
  }
  // public defaultPic() {
  //   return new Promise((res, reject) => {
  //     this.uploadImage = environment.apiurl + this.defaultUserPic;
  //     this.selectdefaultPic = true;
  //     this.uploadImageonServer = environment.apiurl + this.defaultUserPic;
  //     res(this.uploadImage)
  //   });

  // }
  // public takePicture(sourceType: PictureSourceType) {
  //   return new Promise((res, reject) => {
  //     var options: CameraOptions = {
  //       allowEdit : true,
  //       targetWidth: 300,
  //       targetHeight: 300,
  //       quality: 100,
  //       sourceType: sourceType,
  //       saveToPhotoAlbum: false,
  //       correctOrientation: true
  //     };

  //     this.camera.getPicture(options).then(imagePath => {
  //       console.log(imagePath);
  //       this.uploadImageonServer = imagePath;
  //       this.uploadImage = this.webView.convertFileSrc(imagePath);
  //       this.selectdefaultPic = false
  //       let loadedImage = {
  //         'uploadImageonServer': imagePath,
  //         'uploadImageforDisplay': this.uploadImage,
  //         'selectdefaultPic': false
  //       }
  //       res(loadedImage)
  //     });
  //   });
  // }
  public uploadonServer(Module, fileType, browseFromMobile, browseFromWeb, lastuploadedFileURL) {
    return new Promise((resolve, reject) => {
      if(browseFromMobile != undefined || browseFromWeb != undefined){
     // if(this.uploadImageonServer != undefined || this.uploadImageonServer != ''){
        if (this.commonService.isMobile()) {
          // if (this.selectdefaultPic == false) {
          //   var url = environment.apiurl + "/Services/FileUpload?Type=" + folder;
          //   const fileTransfer: FileTransferObject = this.fileTransfer.create();
          //   let fileName
          //   let mimeType
          //   if (fileType == 'mp4') {
          //     mimeType = 'video/mp4';
          //     fileName = "filename.mp4";
          //   } else {
          //     mimeType = 'image/jpg';
          //     fileName = "filename.jpg";
          //   }
          //   let options: FileUploadOptions = {
          //     fileKey: 'uploadFile',
          //     fileName: fileName,
          //     mimeType: mimeType,
          //     chunkedMode: false,
          //     headers: {
          //       'Access-Control-Allow-Origin': "*",
          //       'authorization': "bearer " + localStorage.getItem('AccessToken')
          //     }
          //   }
          //   fileTransfer.upload(browseFromMobile, url, options,true)
          //     .then((data) => {
          //       console.log(data + " Uploaded Successfully");
          //       console.log("Code = " + data.responseCode);
          //       console.log("Response = " + data.response);
          //       var array = data.response.replace("[", "").replace("]", "");
          //       let responseImage = array.replace('"', "").replace('"', "");
          //       resolve(responseImage);
          //       //this.uploadImageonServer = '';
          //     }, (err) => {
          //       console.log(err);
          //         resolve(lastuploadedFileURL);
          //         this.uploadImageonServer = '';
          //     });
          // } else {
          //   resolve(this.defaultUserPic);
          //   this.uploadImageonServer = '';
          // }
       } else {
          this.apiService.postFile('Admin/Common/'+fileType+'?ModuleName=' + Module, browseFromWeb).subscribe((data) => {
            console.log(data);
            resolve(data);
            // this.uploadImageonServer = '';
          }, e => {
            resolve(lastuploadedFileURL);
           //  this.uploadImageonServer = '';
          });
        }
      }else{
        resolve(lastuploadedFileURL);
      }
   // }else{
   //  resolve(lastuploadedFileURL);
   // }
    })
  }
}