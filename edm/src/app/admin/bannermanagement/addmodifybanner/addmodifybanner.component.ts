import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { ApiConstant } from './../../../_appModel/apiconstant'
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { ActivatedRoute } from '@angular/router';
import { SaveModuleFileModel } from 'src/app/_appModel/common.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'appAdmin-addmodifybanner',
  templateUrl: './addmodifybanner.component.html',
  styleUrls: ['./addmodifybanner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifyBannerComponent implements OnInit {
  bannerId
  fileManager: any
  bannerImg
  bannerdata
  invlideimg: boolean = false
  invalidBannerSize:boolean = false
  bannerImguploaded: boolean = true
  formDataBannerImg
  preview
  filesData: any
  BannerTitle
  BannerPageName
  BannerDescription
  IsActive: boolean = true
  public addmodifybanner: FormGroup;
  constructor(public _base: BaseServiceHelper,
    public route: ActivatedRoute,
    private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.addmodifybanner = this.fb.group({
      BannerTitle: ['', [Validators.required]],
      BannerPageName: ['', [Validators.required]],
      BannerDescription: ['', [Validators.required]]
    })
    this.route.params.subscribe(params => {
      this.bannerId = params['id'];
      
      if (this.bannerId != 0) {
        this._base._pageTitleService.setTitle("Modify Banner", "Modify Banner");
        this._base._commonService.showLoader()
        this.getBannerDetails(this.bannerId);
      } else {
        this.fileManager = [];
        this._base._pageTitleService.setTitle("Add Banner", "Add Banner");
        this.bannerImg = undefined;

      }
    });


  }

  public getBannerDetails(bannerId) {
    debugger
    this._base._ApiService.get(ApiConstant.MasterManagement.CarouselList + '?CarouselID=' + bannerId).subscribe((data: any) => {
      this.bannerdata = data;
      this.BannerTitle = data[0].BannerTitle
      this.BannerPageName = data[0].BannerPageName
      this.BannerDescription = data[0].Descripation
      this.IsActive = data[0].IsActive
      this.bannerImg = this.filterfile(data[0].FileManager, 'Image')
      this.preview = this._base._commonService.cdnURL + this.filterfile(data[0].FileManager, 'Image')
      this.fileManager = data[0].FileManager
      this.bannerImguploaded = true
      this._base._commonService.hideLoader()
    }, e => {
      this._base._commonService.hideLoader()
    })
  }
  RemoveImg(bannerImg) {
    debugger
    let file = this.fileManager.filter(item => item.FilePath == bannerImg)
    if (file.length != 0) {
      let fileId = file[0].FileManagerID
      this._base._commonService.showLoader()
      this._base._ApiService.post(ApiConstant.common.removefile + '?Ref_File_ID=' + fileId).subscribe(data => {
        console.log(data);
        this._base._commonService.hideLoader()
      }, e => {
        this._base._commonService.hideLoader()
      })
      this.fileManager = [];
      this.bannerImg = undefined;
      this.formDataBannerImg = undefined
      this.preview = undefined
    } else {
      this.fileManager = [];
      this.bannerImg = undefined;
      this.formDataBannerImg = undefined
      this.preview = undefined
    }

  }
  public filterfile(FileManager, fileType) {
    let file = FileManager.filter(item => item.FileIdentifier == fileType)
    if (file.length != 0){
      const lastItem = file[file.length - 1]
      return this._base._commonService.cdnURL +  lastItem.FilePath
    }
    
  }
  changeListenerBannerImg($event): void {
    debugger;
    var reader = new FileReader();
    if ($event.target.files[0].type == 'image/jpeg' || $event.target.files[0].type == 'image/jpg' || $event.target.files[0].type == 'image/png') {
        this.invlideimg = false;
        this.formDataBannerImg = $event.target.files[0]
        reader.readAsDataURL($event.target.files[0])
        reader.onload = (_event) => {
          var image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
              var height = image.height;
              var width = image.width;
              if (height == 627 && width == 1115) {
                this.preview = reader.result;
                this.invalidBannerSize = false;
                this.bannerImg = $event.target.files[0].name;
                this.filesData = {
                  FileManagerID: 0,
                  ModuleID: 0,
                  ModuleType: 'Banner',
                  FileIdentifier: "Image",
                  Sequence: 0,
                  files: this.formDataBannerImg,
                }
              }else{
                this.invalidBannerSize = true;
                this.bannerImg = undefined
              }
          };
        }
      
    } else {
      this.invlideimg = true;
      this.bannerImg = undefined
    }
  }
  addmodifybannersubmit() {
    this._base._commonService.markFormGroupTouched(this.addmodifybanner);
    if (this.addmodifybanner.valid) {
    if (this.bannerImg != undefined ) {
      this._base._commonService.showLoader()
      debugger;
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        if (this.formDataBannerImg != undefined) {
          this._base._commonService.SaveModuleFile(this.formDataBannerImg, this.filesData).subscribe((res: any) => {
            this.fileManager = res;
            this.bannerImguploaded = true
            let Obj = {
              "Ref_Banner_ID": this.bannerId,
              "BannerTitle": this.BannerTitle,
              "BannerPageName": this.BannerPageName,
              "Descripation": this.BannerDescription,
              "IsActive": this.IsActive,
              "CreatedBy": Ref_User_ID,
              "FileManager": this.fileManager,
            }
            this._base._ApiService.post(ApiConstant.MasterManagement.Carousel, Obj).subscribe(data => {
              console.log(data);
              if (data == "BANNERADDED") {
                this._base._alertMessageService.success(" Banner Added successfully!");
                this.addmodifybanner.reset();
                this.fileManager = [];
                this.bannerImg = undefined;
                this.formDataBannerImg = undefined
                this.preview = undefined
              }
              if (data == "BANNERUPDATED") {
                this._base._alertMessageService.success(" Banner Modify successfully!");
              }
              this._base._commonService.hideLoader();
            }, e => {
              this._base._commonService.hideLoader();
            })
          })
        } else {
          let Obj = {
            "Ref_Banner_ID": this.bannerId,
            "BannerTitle": this.BannerTitle,
            "BannerPageName": this.BannerPageName,
            "Descripation": this.BannerDescription,
            "IsActive": this.IsActive,
            "CreatedBy": Ref_User_ID,
            "FileManager": this.fileManager,
          }
          this._base._ApiService.post(ApiConstant.MasterManagement.Carousel, Obj).subscribe(data => {
            console.log(data);
            if (data == "BANNERADDED") {
              this._base._alertMessageService.success(" Banner Added successfully!");
              this.addmodifybanner.reset();
              this.fileManager = [];
              this.bannerImg = undefined;
              this.formDataBannerImg = undefined
              this.preview = undefined
            }
            if (data == "BANNERUPDATED") {
              this._base._alertMessageService.success(" Banner Modify successfully!");
            }
            this._base._commonService.hideLoader();
          }, e => {
            this._base._commonService.hideLoader();
          })
        }
      })
    } else {
      this.bannerImguploaded = false
    }
  }
  }

}
