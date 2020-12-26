import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { SupportService } from "../../../_appService/support/support.service";
import { SupportTicketType } from "../../../_appModel/support/support.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstant } from 'src/app/_appModel/apiconstant';
import { enAppSession } from 'src/app/_appModel/enAppSession';

@Component({
  selector: 'appAdmin-addmodifysupport',
  templateUrl: './addmodifysupport.component.html',
  styleUrls: ['./addmodifysupport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifySupportComponent implements OnInit {

  public ticketType: any
  typeofTicket
  TicketType_ID
  subject
  Description
  supportImg
  invlideimg: boolean = false
  invalidBannerSize: boolean = false
  bannerImguploaded: boolean = true
  formDataSupportImg
  preview
  filesData: any
  fileManager: any
  IsActive: boolean = true
  // = [
  //   {Ref_TicketType_ID: 0, TicketType: "Select ticket Type"},
  //   {Ref_TicketType_ID: 1, TicketType: "Regarding Purchased Product"},
  //   {Ref_TicketType_ID: 2, TicketType: "Regarding Suggestions for new features"},
  //   {Ref_TicketType_ID: 3, TicketType: "Regarding User Account Details"},
  //   {Ref_TicketType_ID: 4, TicketType: "Report a bug on the website"},
  //   {Ref_TicketType_ID: 5, TicketType: "Technical Support"},
  //   {Ref_TicketType_ID: 6, TicketType: "Others"},
  // ];
  public addTicket: FormGroup;
  constructor(
    public _base: BaseServiceHelper,
    private _supportService: SupportService, private fb: FormBuilder,
  ) {
    this.getTicketType()
  }

  ngOnInit(): void {
    this.addTicket = this.fb.group({
      subject: ['', [Validators.required]],
      typeofTicket: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    })
    this.supportImg = undefined;
    this._base._pageTitleService.setTitle("Ticket Support", "Ticket Support");
  }
  getTicketType() {
    this._supportService.getTicketType().subscribe(types => {
      console.log(types)
      this.ticketType = types
    })
  }
  RemoveImg(supportImg) {
    debugger
    let file = this.fileManager.filter(item => item.FilePath == supportImg)
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
      this.supportImg = undefined;
      this.formDataSupportImg = undefined
      this.preview = undefined
    } else {
      this.fileManager = [];
      this.supportImg = undefined;
      this.formDataSupportImg = undefined
      this.preview = undefined
    }

  }
  public filterfile(FileManager, fileType) {
    let file = FileManager.filter(item => item.FileIdentifier == fileType)
    if (file.length != 0)
      return file[0].FilePath
  }
  changeListenerSupportImg($event): void {
    debugger;
    var reader = new FileReader();
    if ($event.target.files[0].type == 'image/jpeg' || $event.target.files[0].type == 'image/jpg' || $event.target.files[0].type == 'image/png') {
      this.invlideimg = false;
      this.formDataSupportImg = $event.target.files[0]
      reader.readAsDataURL($event.target.files[0])
      reader.onload = (_event) => {
        var image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          var height = image.height;
          var width = image.width;
          this.preview = reader.result;
          this.invalidBannerSize = false;
          this.supportImg = $event.target.files[0].name;
          this.bannerImguploaded = true
          this.filesData = {
            FileManagerID: 0,
            ModuleID: 0,
            ModuleType: 'Support',
            FileIdentifier: "Image",
            Sequence: 0,
            files: this.formDataSupportImg,
          }
        };
      }

    } else {
      this.invlideimg = true;
      this.formDataSupportImg = undefined
    }
  }
  addmodifySupportsubmit() {
    debugger
    this._base._commonService.markFormGroupTouched(this.addTicket);
    if (this.addTicket.valid) {
      if (this.supportImg != undefined) {
        this._base._commonService.showLoader()
        debugger;
        this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
          this._base._commonService.SaveModuleFile(this.formDataSupportImg, this.filesData).subscribe((res: any) => {
            this.fileManager = res;
            this.bannerImguploaded = true
            let Obj = {
              "Ref_Ticket_ID": 0,
              "Ref_TicketType_ID": this.typeofTicket,
              "Ref_User_ID": Ref_User_ID,
              "Subject": this.subject,
              "Descripation": this.Description,
              "FileManager": this.fileManager,
            }
            this._supportService.postTicket(Obj).subscribe(data => {
              console.log(data);
              if (data == "USERTICKETSUCCESS") {
                this.addTicket.reset();
                this.fileManager = [];
                this.supportImg = undefined;
                this.formDataSupportImg = undefined;
                this.preview = undefined;
                (<any>$('#acknowledge_popup')).modal('show');
              }
              this._base._commonService.hideLoader();
            }, e => {
              this._base._commonService.hideLoader();
            })
          }, e => {
            this._base._commonService.hideLoader();
          })
        })
      } else {
        this.bannerImguploaded = false
      }
    }
  }

}
