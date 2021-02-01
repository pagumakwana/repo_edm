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
import { BlogService } from 'src/app/_appService/blog/blog.service';
import { BlogModel } from 'src/app/_appModel/blog/blog.model';

declare var $: any;

@Component({
  selector: 'appAdmin-addmodifyblog',
  templateUrl: './addmodifyblog.component.html',
  styleUrls: ['./addmodifyblog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class AddModifyBlogComponent implements OnInit, OnDestroy {

  constructor(public _base: BaseServiceHelper,
    private _activatedRouter: ActivatedRoute,
    // private _service: GenService,
    // private _categoryService: CategoryService,
    private _blog: BlogService,

    // private dragulaService: DragulaService,
    private fb: FormBuilder) { }



  // categoryData: Array<any> = []
  fileURL = this._base._commonService.cdnURL;
  btnTitle: string = 'ADD'
  isBlogModify: boolean = false;
  addBlogForm: FormGroup = this.fb.group({
    Ref_Blog_ID: [''],
    BlogTitle: ['', [Validators.required]],
    Blog: ['', [Validators.required]],
    thumbnail: ['', [Validators.required]],
  })

  // dragItems = [1, 2, 3]
  // subs = new Subscription();



  fileChoosenData: { [key: string]: Array<fileChoosenDataModel> } = {
    ServiceVideoUrl: [],
    thumbnail: []
  }

  // bannerImg: string = '';
  addBlog: BlogModel
  aliasName: string;

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Manage Blog", this.btnTitle + " Blog");
    this.aliasName = this._activatedRouter.snapshot.paramMap.get('slug');
    console.log("blog")
    // this.getCategory()
    if (this.aliasName != '0') {
      this.getBlog(parseInt(this.aliasName))
      // this.bindService('SERVICEDETAILS', 0, this.aliasName);
    } else {
      this.initialize();
    }
  }

  ngOnDestroy(): void {
  }

  getBlog(Ref_Blog_ID: number) {
    return new Promise((resolve, rej) => {
      this._blog.getBlog(Ref_Blog_ID).subscribe((res: any) => {
        this.addBlog = Array.isArray(res) ? res[0] : null
        if (this.addBlog) {
          this.isBlogModify = true;
          this.btnTitle = 'Modify'
          this.addBlogForm.controls.BlogTitle.setValue(this.addBlog.BlogTitle)
          this.addBlogForm.controls.Ref_Blog_ID.setValue(this.addBlog.Ref_Blog_ID)
          this.addBlogForm.controls.Blog.setValue(this.addBlog.Blog)
          this.addBlog.FileManager = Array.isArray(this.addBlog.FileManager) ? this.addBlog.FileManager : []
          this.initFilesUrl(this.addBlog.FileManager)
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

      if (FileManager[i].FileIdentifier) {
        let filesData: fileChoosenDataModel = {
          file: null,
          thumb: this.fileURL + FileManager[i].FilePath,
          FileManagerID: FileManager[i].FileManagerID,
          Sequence: FileManager[i].Sequence,
          ModuleID: this.addBlog.Ref_Blog_ID,
          FileIdentifier: FileManager[i].FileIdentifier,
          ModuleType: 'blog'
        }
        this.fileChoosenData[FileManager[i].FileIdentifier].push(filesData)
        this.addBlogForm.controls[FileManager[i].FileIdentifier].setValue('uploaded')
        this.addBlogForm.controls[FileManager[i].FileIdentifier].updateValueAndValidity()
      }
    }
  }

  initialize() {
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      this.addBlog = {
        Ref_Blog_ID: 0,
        BlogTitle: null,
        Blog: null,
        CreatedBy: FullName,
        FileManager: [],
        IsActive: true
      }
      console.log("addBlogForm", this.addBlogForm, this.FaqListArray)
    });
  }

  justFilesArray(ArrayData: Array<fileChoosenDataModel>) {
    let arrayReturn = []
    for (let i in ArrayData) {
      ArrayData[i].Sequence = (1 + parseInt(i))
      if (ArrayData[i].FileManagerID == null)
        arrayReturn.push(ArrayData[i].file)
    }
    return arrayReturn
  }

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
    this._base._commonService.saveModuleFile(arrayData[counter - 1].files, arrayData[counter - 1], this.addBlogForm.controls[arrayData[counter - 1].FileIdentifier].value).then((uploadResponse: Array<any>) => {
      // resolve(uploadResponse)
      resolveData = this._base._commonService.joinArray(resolveData, uploadResponse)

      if (counter > 1) {
        counter--
        this.saveModuleFile_multi_helper(arrayData, counter, resolveData)
      } else {
        this.addBlog.FileManager = resolveData
        this.addBlogs()
      }
    })
  }


  saveModuleFile_helper() {
    let fileData: Array<SaveModuleFileModel> = this._base._commonService.joinArray(this.getFilesInfo('thumbnail'))
    console.log("saveModuleFile_helper", fileData, this.fileChoosenData['thumbnail'])
    if (fileData.length > 0)
      this.saveModuleFile_multi_helper(fileData, fileData.length, [])
    else {
      this.addBlogs()
    }

    // this._base._commonService.saveModuleFile(this.justFilesArray(this.fileChoosenData.thumbnail), this.getFilesInfo('Service'), this.addBlogForm.controls.thumbnail.value).then((uploadResponse: Array<any>) => {
    //   resolve(uploadResponse)
    // })
  }

  saveblog() {
    this._base._commonService.markFormGroupTouched(this.addBlogForm)
    console.log("saveblog", this.addBlogForm, this.addBlog)

    if (this.addBlogForm.valid) {

      this._base._commonService.showLoader();
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
          // this._base._commonService.saveModuleFile(this.justFilesArray(this.fileChoosenData.ServiceVideoUrl), 'ServiceVideo', this.addBlogForm.controls.ServiceVideoUrl.value).then((serviceUrl: Array<any>) => {
          // this.addBlog.Flag = this.isBlogModify ? 'MODIFYSERVICE' : 'ADDBlog';
          this.addBlog.CreatedBy = Ref_User_ID;
          this.addBlog.Ref_Blog_ID = this.addBlogForm.value.Ref_Blog_ID;
          this.addBlog.Blog = this.addBlogForm.value.Blog
          this.addBlog.BlogTitle = this.addBlogForm.value.BlogTitle
          this.addBlog.IsActive = true
          this.addBlog.FileManager = []
          console.log("saveService_Saved", this.addBlogForm, this.addBlog)
          this.saveModuleFile_helper()

          // this.addBlogs()
          // })
        })
      })
      // })
    }
  }



  addBlogs() {
    console.log("addBlogs", this.addBlog)
    this._blog.addmodifyBlog(this.addBlog).subscribe((res: string) => {
      this._base._commonService.hideLoader();
      let msg = {
        BLOGADDED: "Blog added successfully!",
        BLOGUPDATED: "Blog updated successfully!",
        BLOGEXISTS: "Blog already exists!"
      }
      let isRedirect: boolean = (res != "BLOGEXISTS")
      this._base._alertMessageService[isRedirect ? 'success' : 'error'](msg[res]);
      // $('#acknowledge_popup').modal('show')
      if (isRedirect)
        setTimeout(() => { this._base._router.navigate(['admin', 'blog']) }, 3000);
    })
  }



  get FaqListArray(): FormArray {
    return this.addBlogForm.get("FAQDetails") as FormArray
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
      }
    }

    if ($event.target.files.length > 0) {
      let isValid: boolean = false
      for (let file of $event.target.files) {

        if (ValidationService.ValidateFileType_Helper(file, fileValidationInfo[fieldName].fileType)) {
          if (ValidationService.ValidateFileSize_Helper(file, fileValidationInfo[fieldName].size)) {
            isValid = true
            this.addBlogForm.controls[fieldName].setValue('upload')
            this.addBlogForm.controls[fieldName].updateValueAndValidity()
            this._base._commonService.readImage(file).subscribe((res: any) => {
              let imgData: fileChoosenDataModel = { file: file, thumb: res, FileManagerID: 0, Sequence: null, ModuleType: "blog", FileIdentifier: fileValidationInfo[fieldName].FileIdentifier, ModuleID: this.addBlog.Ref_Blog_ID }
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
    this.addBlogForm.controls[fieldName].setValue(this.getFileControlValue(fieldName))
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
