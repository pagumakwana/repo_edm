import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel, fileChoosenDataModel } from 'src/app/_appModel/genservices/service.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import * as _ from "lodash";
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

declare var $: any;

@Component({
  selector: 'appAdmin-addmodifyservices',
  templateUrl: './addmodifyservices.component.html',
  styleUrls: ['./addmodifyservices.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class AddModifyServicesComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    private _activatedRouter: ActivatedRoute,
    private _service: GenService,
    private _categoryService: CategoryService,
    private dragulaService: DragulaService,
    private fb: FormBuilder) { }

  categoryData: []
  fileURL = environment.cdnURL;
  btnTitle: string = 'ADD'
  isServiceModify: boolean = false;
  addServiceForm: FormGroup = this.fb.group({
    ServiceTitle: ['', [Validators.required]],
    AliasName: ['', [Validators.required]],
    Category: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    Price: ['', [Validators.required]],
    PriceWithProjectFiles: ['', [Validators.required]],
    Revision: ['', [Validators.required]],
    DeliveryDate: ['', [Validators.required]],
    // ProjectFilesUrl: ['', [Validators.required]],
    ServiceVideoUrl: ['', [Validators.required]],
    BigImageUrl: ['', [Validators.required]],
    // ThumbnailImageUrl: ['', [Validators.required]],
    // IsActive: ['', [Validators.required]],
    FAQDetails: this.fb.array([])
  })

  dragItems = [1, 2, 3]
  subs = new Subscription();


  fileChoosenData = {
    ServiceVideoUrl: {
      file: null,
      thumb: null,
    },
    BigImageUrl: {
      file: [],
      thumb: [],
    }
  }
  bannerImg: string = '';
  addService: ServiceModel
  aliasName: string;

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Manage Service", this.btnTitle + " Service");
    this.aliasName = this._activatedRouter.snapshot.paramMap.get('slug');
    this.getCategory()
    if (this.aliasName != '0') {
      this.bindService('SERVICEDETAILS', 0, this.aliasName);
    } else {
      this.initialize();
    }

    this.addServiceForm.controls.ServiceTitle.valueChanges.subscribe((value: string) => {
      this.addServiceForm.controls.AliasName.setValue(value.replace(/ /g, '-').toLowerCase())
      this.addServiceForm.controls.AliasName.updateValueAndValidity()
    })

    this.subs.add(this.dragulaService.dropModel('MANY_ITEMS')
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        console.log('dropModel:');
        console.log(el);
        console.log(source);
        console.log(target);
        console.log(sourceModel);
        console.log(targetModel);
        console.log(item);
      })
    );
    this.subs.add(this.dragulaService.removeModel('MANY_ITEMS')
      .subscribe(({ el, source, item, sourceModel }) => {
        console.log('removeModel:');
        console.log(el);
        console.log(source);
        console.log(sourceModel);
        console.log(item);
      })
    );
  }


  getCategory() {
    this._categoryService.categorylist('ALL', 0).subscribe((resData: any) => {
      this.categoryData = resData
    });
  }

  bindService(flag, ref_service_id, aliasName = null) {
    return new Promise((resolve, rej) => {
      this._service.getService(flag, ref_service_id, aliasName).subscribe((res: any) => {
        this.addService = Array.isArray(res) ? res[0] : null
        if (this.addService) {
          this.isServiceModify = true;
          this.btnTitle = 'Modify'
          this.addServiceForm.controls.ServiceTitle.setValue(this.addService.ServiceTitle)
          this.addServiceForm.controls.AliasName.setValue(this.addService.AliasName);
          this.addServiceForm.controls.Category.setValue(this.addService.Ref_Category_ID)
          this.addServiceForm.controls.Description.setValue(this.addService.Description)
          this.addServiceForm.controls.Price.setValue(this.addService.Price)
          this.addServiceForm.controls.PriceWithProjectFiles.setValue(this.addService.PriceWithProjectFiles)
          this.addServiceForm.controls.Revision.setValue(this.addService.Revision)
          this.addServiceForm.controls.DeliveryDate.setValue(formatDate(this.addService.DeliveryDate, 'yyyy-MM-dd', 'en'))

          this.addService.FileUrls = Array.isArray(this.addService.FileUrls) ? this.addService.FileUrls : []
          this.initFilesUrl(this.addService.FileUrls)
          if (Array.isArray(this.addService.FAQDetails)) {
            if (this.addService.FAQDetails.length > 0)
              this.addService.FAQDetails.filter((item, index) => { this.addFaq(index, true, item.Questions, item.Answer) })
            else
              this.addFaq(0, true)
          }
          setTimeout(() => {
            resolve(true);
          }, 500);
        }
      })
    })
  }

  //setting up files during modify
  initFilesUrl(filesUrl: Array<any>) {
    console.log("initFilesUrl")
    for (let i in filesUrl) {
      if (filesUrl[i].FileIdentifier) {
        this.fileChoosenData[filesUrl[i].FileIdentifier].thumb = this.fileURL + filesUrl[i].FilePath
        this.addServiceForm.controls[filesUrl[i].FileIdentifier].setValue('uploaded')
        this.addServiceForm.controls[filesUrl[i].FileIdentifier].updateValueAndValidity()
      }
    }
  }

  initialize() {
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      this.addService = {
        Ref_Service_ID: 0,
        Ref_Category_ID: null,
        ServiceTitle: null,
        Description: null,
        Price: null,
        PriceWithProjectFiles: null,
        BigImageUrl: null,
        ThumbnailImageUrl: null,
        ServiceVideoUrl: null,
        ProjectFilesUrl: null,
        Revision: null,
        DeliveryDate: null,
        CreatedName: FullName,
        FAQDetails: [],
        FileUrls: []
      }
      this.addFaq(0, true)
    });
  }

  saveService() {
    this._base._commonService.markFormGroupTouched(this.addServiceForm)
    console.log("saveService", this.addServiceForm, this.addService)

    if (this.addServiceForm.valid) {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        // this._base._commonService.filesUpload(this.fileChoosenData.BigImageUrl, 'Service', this.addServiceForm.controls.BigImageUrl.value).then((ImageUrls: Array<any>) => {
        this._base._commonService.filesUpload(this.fileChoosenData.ServiceVideoUrl.file, 'ServiceVideo', this.addServiceForm.controls.ServiceVideoUrl.value).then((serviceUrl: Array<any>) => {

          this.addService.Ref_Category_ID = this.addServiceForm.value.Category
          this.addService.ServiceTitle = this.addServiceForm.value.ServiceTitle
          this.addService.Description = this.addServiceForm.value.Description
          this.addService.Price = this.addServiceForm.value.Price
          this.addService.PriceWithProjectFiles = this.addServiceForm.value.PriceWithProjectFiles
          // this.addService.FileUrls = ImageUrls
          this.addService.Revision = this.addServiceForm.value.Revision
          this.addService.DeliveryDate = this.addServiceForm.value.DeliveryDate
          this.addService.CreatedName = FullName
          // this.addService.FileUrls = this._base._commonService.joinArray(this._base._commonService.createFileArray(ImageUrls, 'BigImageUrl'), this._base._commonService.createFileArray(serviceUrl, 'ServiceVideoUrl'))
          this.addService.FAQDetails = this.addServiceForm.value.FAQDetails
          console.log("saveService", this.addServiceForm, this.addService)
          // this.addServices()
        })
        // })
      })
    }
  }



  addServices() {
    this._service.addmodifyService(this.addService).subscribe((res: any) => {
      let msg = {
        SERVICEADDED: "Service added successfully!",
        SERVICEUPDATED: "Service updated successfully!",
        SERVICENAMEEXISTS: "Service already exists!"
      }
      this._base._alertMessageService.success(msg[res]);
      $('#acknowledge_popup').modal('show')
      setTimeout(() => { $('#acknowledge_popup').modal('hide'); this._base._router.navigate(['admin', 'services']) }, 3000);
    })
  }



  get FaqListArray(): FormArray {
    return this.addServiceForm.get("FAQDetails") as FormArray
  }

  //add remove FAQ
  addFaq(index: number, isAdd: boolean, Questions: string = '', Answer: string = '') {
    if (isAdd) {
      let control: FormGroup
      control = this.fb.group({
        Questions: [Questions, [Validators.required]],
        Answer: [Answer, [Validators.required]]
      })
      this.FaqListArray.insert(index, control)
    } else {
      this.FaqListArray.removeAt(index)
    }
  }

  fileChoosen($event, fieldName) {
    console.log("fileChoosen", $event, typeof this.fileChoosenData[fieldName])


    this.fileChoosenData[fieldName].file = $event.target.files;

    this.addServiceForm.controls[fieldName].setValue('upload')
    this.addServiceForm.controls[fieldName].updateValueAndValidity()
    this._base._commonService.readImage($event.target).subscribe(res => {
      this.fileChoosenData[fieldName].thumb = res;
    })
  }

  removeFile(fieldName) {
    console.log("removeFile", fieldName)
    this.fileChoosenData[fieldName].file = null
    this.fileChoosenData[fieldName].thumb = null
    if (this.addServiceForm.controls[fieldName].value == 'uploaded') {
      let index = _.findIndex(this.addService.FileUrls, (o: any) => {
        return o.FileIdentifier == fieldName
      })
      if (index > -1)
        this.removeThumbnail(this.addService.FileUrls[index].Ref_File_ID)
    }
    this.addServiceForm.controls[fieldName].setValue(null)
  }

  removeThumbnail(ref_image_id) {
    this._base._commonService.removeFile(ref_image_id).subscribe((res: any) => {
      if (res == 'SUCCESS') {
        this._base._alertMessageService.success('File removed successfully!');
      } else {
        this._base._alertMessageService.error('Something went wrong!');
      }
    })
  }

  // switchControl() {
  //   // this.FaqListArray.moveControl(event.previousIndex, event.currentIndex);
  //   moveItemInFormArray
  //   this.FaqListArray
  // }


}
