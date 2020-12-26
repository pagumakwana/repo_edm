import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceModel, fileChoosenDataModel } from 'src/app/_appModel/genservices/service.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { formatDate } from '@angular/common';
import * as _ from "lodash";
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { ValidationService } from 'src/app/commonmodule/errorComponent/validation.service';
import { SaveModuleFileModel } from 'src/app/_appModel/common.model';

declare var $: any;

@Component({
  selector: 'appAdmin-addmodifyservices',
  templateUrl: './addmodifyservices.component.html',
  styleUrls: ['./addmodifyservices.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class AddModifyServicesComponent implements OnInit, OnDestroy {

  constructor(public _base: BaseServiceHelper,
    private _activatedRouter: ActivatedRoute,
    private _service: GenService,
    private _categoryService: CategoryService,
    private dragulaService: DragulaService,
    private fb: FormBuilder) { }



  categoryData: Array<any> = []
  fileURL = this._base._commonService.cdnURL;
  btnTitle: string = 'ADD'
  isServiceModify: boolean = false;
  addServiceForm: FormGroup = this.fb.group({
    ServiceTitle: ['', [Validators.required]],
    AliasName: ['', [Validators.required]],
    Category: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    Price: ['', [Validators.required, ValidationService.ValidateNumberPriceType(5000)]],
    PriceWithProjectFiles: ['', [Validators.required, ValidationService.ValidateNumberPriceType(5000)]],
    Revision: ['', [Validators.required]],
    DeliveryDate: ['', [Validators.required]],
    // ProjectFilesUrl: ['', [Validators.required]],
    ServiceVideoUrl: ['', [Validators.required]],
    thumbnail: ['', [Validators.required]],
    // ThumbnailImageUrl: ['', [Validators.required]],
    // IsActive: ['', [Validators.required]],
    FAQDetails: this.fb.array([]),
    MetaTitle: [''],
    MetaKeywords: [''],
    MetaDescription: [''],
  })

  dragItems = [1, 2, 3]
  subs = new Subscription();



  fileChoosenData: { [key: string]: Array<fileChoosenDataModel> } = {
    ServiceVideoUrl: [],
    thumbnail: []
  }

  bannerImg: string = '';
  addService: ServiceModel
  aliasName: string;

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Manage Service", this.btnTitle + " Service");
    this.aliasName = this._activatedRouter.snapshot.paramMap.get('slug');
    console.log("service")
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

    this.addServiceForm.controls.Price.valueChanges.subscribe((value: string) => {
      console.log("Price_control", this.addServiceForm.controls.Price, value)
      // this.addServiceForm.controls.AliasName.setValue(value.replace(/ /g, '-').toLowerCase())
      // this.addServiceForm.controls.AliasName.updateValueAndValidity()
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

  ngOnDestroy(): void {
    this.subs.unsubscribe()
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
          this.addServiceForm.controls.MetaTitle.setValue(this.addService.MetaTitle);
          this.addServiceForm.controls.MetaKeywords.setValue(this.addService.MetaKeywords);
          this.addServiceForm.controls.MetaDescription.setValue(this.addService.MetaDescription);
          // this.addService.FileUrls = Array.isArray(this.addService.FileUrls) ? this.addService.FileUrls : []
          this.addService.FileManager = Array.isArray(this.addService.FileManager) ? this.addService.FileManager : []
          this.initFilesUrl(this.addService.FileManager)
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
  initFilesUrl(FileManager: Array<any>) {
    console.log("initFileManager")
    for (let i in FileManager) {
      FileManager[i].FileIdentifier = FileManager[i].FileIdentifier == 'BigImage' ? 'thumbnail' : FileManager[i].FileIdentifier
      FileManager[i].FileIdentifier = FileManager[i].FileIdentifier == 'ServiceVideo' ? 'ServiceVideoUrl' : FileManager[i].FileIdentifier
      if (FileManager[i].FileIdentifier) {
        let filesData: fileChoosenDataModel = {
          file: null,
          thumb: this.fileURL + FileManager[i].FilePath,
          FileManagerID: FileManager[i].FileManagerID,
          Sequence: FileManager[i].Sequence,
          ModuleID: this.addService.Ref_Service_ID,
          FileIdentifier: FileManager[i].FileIdentifier,
          ModuleType: 'service'
        }
        this.fileChoosenData[FileManager[i].FileIdentifier].push(filesData)
        this.addServiceForm.controls[FileManager[i].FileIdentifier].setValue('uploaded')
        this.addServiceForm.controls[FileManager[i].FileIdentifier].updateValueAndValidity()
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
        AliasName: null,
        Price: null,
        PriceWithProjectFiles: null,
        thumbnail: null,
        // ThumbnailImageUrl: null,
        ServiceVideoUrl: null,
        ProjectFilesUrl: null,
        Revision: null,
        DeliveryDate: null,
        CreatedName: FullName,
        FAQDetails: [],
        FileUrls: [],
        MetaTitle: '',
        MetaKeywords: '',
        MetaDescription: ''
      }
      this.addFaq(0, true)
      console.log("addServiceForm", this.addServiceForm, this.FaqListArray)
    });
  }

  // justFilesArray(ArrayData: Array<fileChoosenDataModel>) {
  //   let arrayReturn = []
  //   for (let i in ArrayData) {
  //     ArrayData[i].Sequence = (1 + parseInt(i))
  //     if (ArrayData[i].FileManagerID == null)
  //       arrayReturn.push(ArrayData[i].file)
  //   }
  //   return arrayReturn
  // }

  getFilesInfo(FileIdentifier: string): SaveModuleFileModel {

    let arrayReturn: any = []
    for (let i in this.fileChoosenData[FileIdentifier]) {
      this.fileChoosenData[FileIdentifier][i].Sequence = (1 + parseInt(i))
      if (this.fileChoosenData[FileIdentifier][i].FileManagerID == 0) {
        let filesData: SaveModuleFileModel = {
          FileManagerID: this.fileChoosenData[FileIdentifier][i].FileManagerID,
          ModuleID: this.fileChoosenData[FileIdentifier][i].ModuleID,
          ModuleType: this.fileChoosenData[FileIdentifier][i].ModuleType,
          FileIdentifier: this.fileChoosenData[FileIdentifier][i].FileIdentifier,
          Sequence: this.fileChoosenData[FileIdentifier][i].Sequence,
          files: this.fileChoosenData[FileIdentifier][i].file,
        }
        arrayReturn.push(filesData)
      }
    }
    return arrayReturn
  }

  saveModuleFile_multi_helper(arrayData: Array<SaveModuleFileModel>, counter: number, resolveData: Array<any>) {
    this._base._commonService.saveModuleFile(arrayData[counter - 1].files, arrayData[counter - 1], this.addServiceForm.controls[arrayData[counter - 1].FileIdentifier].value).then((uploadResponse: Array<any>) => {
      // resolve(uploadResponse)
      resolveData.push(uploadResponse)
      if (counter > 1) {
        counter--
        this.saveModuleFile_multi_helper(arrayData, counter, resolveData)
      } else {
        this.addService.FileManager = resolveData
        this.addServices()
      }
    })
  }


  saveModuleFile_helper() {
    let fileData: Array<SaveModuleFileModel> = this._base._commonService.joinArray(this.getFilesInfo('thumbnail'), this.getFilesInfo('ServiceVideoUrl'))
    console.log("saveModuleFile_helper", fileData, this.fileChoosenData['thumbnail'])
    if (fileData.length > 0)
      this.saveModuleFile_multi_helper(fileData, fileData.length, [])
    else {
      this.addServices()
    }

    // this._base._commonService.saveModuleFile(this.justFilesArray(this.fileChoosenData.thumbnail), this.getFilesInfo('Service'), this.addServiceForm.controls.thumbnail.value).then((uploadResponse: Array<any>) => {
    //   resolve(uploadResponse)
    // })
  }

  saveService() {
    this._base._commonService.markFormGroupTouched(this.addServiceForm)
    console.log("saveService", this.addServiceForm, this.addService)

    if (this.addServiceForm.valid) {

      this._base._commonService.showLoader();
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
          // this._base._commonService.saveModuleFile(this.justFilesArray(this.fileChoosenData.ServiceVideoUrl), 'ServiceVideo', this.addServiceForm.controls.ServiceVideoUrl.value).then((serviceUrl: Array<any>) => {
          this.addService.Flag = this.isServiceModify ? 'MODIFYSERVICE' : 'ADDSERVICE';
          this.addService.CreatedName = FullName;
          this.addService.Ref_User_ID = Ref_User_ID;
          this.addService.Ref_Category_ID = this.addServiceForm.value.Category
          this.addService.AliasName = this.addServiceForm.value.AliasName
          this.addService.ServiceTitle = this.addServiceForm.value.ServiceTitle
          this.addService.Description = this.addServiceForm.value.Description
          this.addService.Price = this.addServiceForm.value.Price
          this.addService.PriceWithProjectFiles = this.addServiceForm.value.PriceWithProjectFiles
          this.addService.Revision = this.addServiceForm.value.Revision
          this.addService.DeliveryDate = this.addServiceForm.value.DeliveryDate
          this.addService.FileManager = []
          // this.addService.FileUrls = this._base._commonService.joinArray(this._base._commonService.createFileArray(ImageUrls, 'thumbnail', this.fileChoosenData['thumbnail'], this.addService.FileUrls), this._base._commonService.createFileArray(serviceUrl, 'ServiceVideoUrl', this.fileChoosenData['ServiceVideoUrl'], this.addService.FileUrls))
          this.addService.FAQDetails = this.addServiceForm.value.FAQDetails
          this.addService.MetaTitle = this.addServiceForm.value.MetaTitle;
          this.addService.MetaKeywords = this.addServiceForm.value.MetaKeywords;
          this.addService.MetaDescription = this.addServiceForm.value.MetaDescription;
          console.log("saveService_Saved", this.addServiceForm, this.addService)
          this.saveModuleFile_helper()

          // this.addServices()
          // })
        })
      })
      // })
    }
  }



  addServices() {
    console.log("addServices", this.addService)
    this._service.addmodifyService(this.addService).subscribe((res: string) => {
      this._base._commonService.hideLoader();
      let msg = {
        SERVICEADDED: "Service added successfully!",
        SERVICEUPDATED: "Service updated successfully!",
        SERVICEEXISTS: "Service already exists!"
      }
      let isRedirect: boolean = (res != "SERVICEEXISTS")
      this._base._alertMessageService[isRedirect ? 'success' : 'error'](msg[res]);
      // $('#acknowledge_popup').modal('show')
      if (isRedirect)
        setTimeout(() => { this._base._router.navigate(['admin', 'service']) }, 3000);
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
    debugger
    let fileValidationInfo: { [key: string]: { fileType: Array<string>, size: number, FileIdentifier: string } } = {
      thumbnail: {
        fileType: ['image/svg', 'image/jpeg', 'image/jpg', 'image/png'],
        size: 3145728, // 3MB
        FileIdentifier: 'thumbnail'
      },
      ServiceVideoUrl: {
        fileType: ['video/mp4'],
        size: 52428800, //50MB
        FileIdentifier: 'ServiceVideoUrl'
      }
    }

    if ($event.target.files.length > 0) {
      let isValid: boolean = false
      for (let file of $event.target.files) {

        if (ValidationService.ValidateFileType_Helper(file, fileValidationInfo[fieldName].fileType)) {
          if (ValidationService.ValidateFileSize_Helper(file, fileValidationInfo[fieldName].size)) {
            isValid = true
            this.addServiceForm.controls[fieldName].setValue('upload')
            this.addServiceForm.controls[fieldName].updateValueAndValidity()
            this._base._commonService.readImage(file).subscribe((res: any) => {
              let imgData: fileChoosenDataModel = { file: file, thumb: res, FileManagerID: 0, Sequence: null, ModuleType: "service", FileIdentifier: fileValidationInfo[fieldName].FileIdentifier, ModuleID: this.addService.Ref_Service_ID }
              console.log("imageData", imgData)
              this.fileChoosenData[fieldName].push(imgData);
            })
          }
        }

        if (!isValid) {
          this._base._alertMessageService.error(`${file.name} is Invalid`)
        }

      }
    }
  }

  getFileControlValue(fieldName) {
    let returnKey: string | null = null
    if (this.fileChoosenData[fieldName].length > 0) {
      let waitingUpload = this.fileChoosenData[fieldName].filter(item => item.FileManagerID == null)
      returnKey = waitingUpload.length > 0 ? 'upload' : 'uploaded'
    }
    return returnKey
  }

  removeFile(fieldName, fileIndex) {
    console.log("removeFile", fieldName, fileIndex)
    if (this.fileChoosenData[fieldName][fileIndex].FileManagerID != null && this.fileChoosenData[fieldName][fileIndex].FileManagerID > 0)
      this.removeThumbnail(this.fileChoosenData[fieldName][fileIndex].FileManagerID)

    this.fileChoosenData[fieldName].splice(fileIndex, 1)
    this.addServiceForm.controls[fieldName].setValue(this.getFileControlValue(fieldName))
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
