import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { Meta } from '@angular/platform-browser';
import { fileChoosenDataModel } from 'src/app/_appModel/genservices/service.model';
import { ValidationService } from 'src/app/commonmodule/errorComponent/validation.service';
import { SaveModuleFileModel } from 'src/app/_appModel/common.model';


@Component({
  selector: 'appAdmin-addmodifygener',
  templateUrl: './addmodifygener.component.html',
  styleUrls: ['./addmodifygener.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifyGenersComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    private _fbGener: FormBuilder,
    private _categoryService: CategoryService,
    private _activatedRouter: ActivatedRoute, ) { }

  _categoryModel: CategoryModel = {};
  aliasName: string;
  public categoryData: any = [];
  public categoryDataWOCurrent: any = [];
  isCategoryModify: boolean = false;
  btnTitle: string = 'ADD'
  imgCategory: any;
  fileURL = this._base._commonService.cdnURL;

  // fileData: any;

  formCategory: FormGroup = this._fbGener.group({
    Ref_Parent_ID: [''],
    Ref_Category_ID: [''],
    CategoryName: ['', [Validators.required, ValidationService.ValidateWhiteSpace()]],
    AliasName: ['', [Validators.required]],
    CategoryDescription: [''],
    CategoryUseBy: ['', [Validators.required]],
    thumbnail: [''],
    MetaTitle: [''],
    MetaKeywords: [''],
    MetaDescription: [''],
  })


  fileChoosenData: { [key: string]: Array<fileChoosenDataModel> } = {
    thumbnail: []
  }

  ngAfterViewInit(): void {
    this._base._pageTitleService.setTitle('Category', this.btnTitle + ' CATEGORY');
  }
  ngOnInit(): void {
    this.aliasName = this._activatedRouter.snapshot.paramMap.get('slug');
    if (this.aliasName != '0') {
      this._base._commonService.showLoader();
      this.bindCategory('ALL', 0).then((res: any) => {
        if (res) {
          this.getCategory();
        }
      })
    } else {
      this.intialise();
      this.bindCategory('ALL', 0);
    }
    this.formCategory.controls.CategoryName.valueChanges.subscribe((value: string) => {
      console.log("CategoryName.valueChanges", value)
      this.formCategory.controls.AliasName.setValue(value.replace(/ /g, '-').toLowerCase().trim())
      this.formCategory.controls.AliasName.updateValueAndValidity()
    })
  }

  intialise() {
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        this._categoryModel = {
          Flag: '',
          Ref_Parent_ID: 0,
          Ref_Category_ID: 0,
          CategoryName: '',
          AliasName: '',
          Description: '',
          CategoryUseBy: '',
          FileUrls: [],
          Ref_User_ID: Ref_User_ID,
          CreatedName: FullName,
          MetaTitle: '',
          MetaKeywords: '',
          MetaDescription: ''
        }
      });
    });
  }

  getCategory() {
    let index = _.findIndex(this.categoryData, (o) => {
      return o.AliasName == this.aliasName
    })
    if (index > -1) {
      this._categoryModel = this.categoryData[index];
      this.categoryDataWOCurrent = JSON.parse(JSON.stringify(this.categoryData));
      this.categoryDataWOCurrent.splice(index, 1);
      this.isCategoryModify = true;
      this.btnTitle = 'Modify'
      this.formCategory.controls.MetaTitle.setValue(this._categoryModel.MetaTitle);
      this.formCategory.controls.MetaKeywords.setValue(this._categoryModel.MetaKeywords);
      this.formCategory.controls.MetaDescription.setValue(this._categoryModel.MetaDescription);
      this.formCategory.controls.Ref_Parent_ID.setValue(this._categoryModel.Ref_Parent_ID);
      this.formCategory.controls.Ref_Category_ID.setValue(this._categoryModel.Ref_Category_ID);
      this.formCategory.controls.CategoryName.setValue(this._categoryModel.CategoryName);
      this.formCategory.controls.AliasName.setValue(this._categoryModel.AliasName);
      this.formCategory.controls.CategoryDescription.setValue(this._categoryModel.Description);
      this.formCategory.controls.CategoryUseBy.setValue(this._categoryModel.CategoryUseBy);
      this._categoryModel.FileManager = Array.isArray(this._categoryModel.FileManager) ? this._categoryModel.FileManager : []
      this.initFilesUrl(this._categoryModel.FileManager)
      this._base._commonService.hideLoader();
    }
  }

  //setting up files during modify
  initFilesUrl(FileManager: Array<any>) {
    console.log("initFileManager")
    for (let i in FileManager) {
      FileManager[i].FileIdentifier = FileManager[i].FileIdentifier == 'Image' ? 'thumbnail' : FileManager[i].FileIdentifier
      if (FileManager[i].FileIdentifier) {
        let filesData: fileChoosenDataModel = {
          file: null,
          thumb: this.fileURL + FileManager[i].FilePath,
          FileManagerID: FileManager[i].FileManagerID,
          Sequence: FileManager[i].Sequence,
          ModuleID: this._categoryModel.Ref_Category_ID,
          FileIdentifier: FileManager[i].FileIdentifier,
          ModuleType: 'category'
        }
        this.fileChoosenData[FileManager[i].FileIdentifier].push(filesData)
        this.formCategory.controls[FileManager[i].FileIdentifier].setValue('uploaded')
        this.formCategory.controls[FileManager[i].FileIdentifier].updateValueAndValidity()
      }
    }
  }

  // justFilesArray(ArrayData: Array<fileChoosenDataModel | any>) {
  //   let arrayReturn = []
  //   for (let i in ArrayData) {
  //     ArrayData[i].DisplayOrder = (1 + parseInt(i))
  //     if (ArrayData[i].Ref_File_ID == null)
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
    this._base._commonService.saveModuleFile(arrayData[counter - 1].files, arrayData[counter - 1], this.formCategory.controls[arrayData[counter - 1].FileIdentifier].value).then((uploadResponse: Array<any>) => {
      // resolve(uploadResponse)
      resolveData.push(uploadResponse)
      if (counter > 1) {
        counter--
        this.saveModuleFile_multi_helper(arrayData, counter, resolveData)
      } else {
        this._categoryModel.FileManager = resolveData
        this.addmodifycategory();
      }
    })
  }

  saveModuleFile_helper() {
    let fileData: Array<SaveModuleFileModel> = this._base._commonService.joinArray(this.getFilesInfo('thumbnail'))
    console.log("saveModuleFile_helper", fileData, this.fileChoosenData['thumbnail'])
    if (fileData.length > 0)
      this.saveModuleFile_multi_helper(fileData, fileData.length, [])
    else {
      this.addmodifycategory();
    }

    // this._base._commonService.saveModuleFile(this.justFilesArray(this.fileChoosenData.thumbnail), this.getFilesInfo('Service'), this.addServiceForm.controls.thumbnail.value).then((uploadResponse: Array<any>) => {
    //   resolve(uploadResponse)
    // })
  }

  setCategoryModel() {
    this._base._commonService.markFormGroupTouched(this.formCategory)
    if (this.formCategory.valid) {
      // this._base._commonService.filesUpload(this.justFilesArray(this.fileChoosenData.ImageUrl), 'Category', this.formCategory.controls.ImageUrl.value).then((ImageUrls: Array<any>) => {
      this._categoryModel.Ref_Parent_ID = this.formCategory.value.Ref_Parent_ID;
      this._categoryModel.Ref_Category_ID = this.formCategory.value.Ref_Category_ID;
      this._categoryModel.CategoryName = this.formCategory.value.CategoryName;
      this._categoryModel.AliasName = this.formCategory.value.AliasName;
      this._categoryModel.Description = this.formCategory.value.CategoryDescription;
      this._categoryModel.CategoryUseBy = this.formCategory.value.CategoryUseBy;
      // this._categoryModel.FileUrls = this._base._commonService.joinArray(this._base._commonService.createFileArray(ImageUrls, 'ImageUrl', this.fileChoosenData['ImageUrl'], this._categoryModel.FileUrls))
      this._categoryModel.MetaTitle = this.formCategory.value.MetaTitle;
      this._categoryModel.MetaKeywords = this.formCategory.value.MetaKeywords;
      this._categoryModel.MetaDescription = this.formCategory.value.MetaDescription;
      this.saveModuleFile_helper()

      // });
    }
  }

  addmodifycategory() {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._categoryModel.Flag = this.isCategoryModify ? 'MODIFYCATEGORY' : 'ADDCATEGORY';
        this._categoryModel.CreatedName = FullName;
        this._categoryModel.Ref_User_ID = Ref_User_ID;
        this._categoryService.addmodifycategory(this._categoryModel).subscribe((response: any) => {
          let isRedirect: boolean = true
          if (response == 'CATEGORYADDED') {
            this._base._alertMessageService.success("Category added successfully!");
          } else if (response == 'CATEGORYUPDATED') {
            this._base._alertMessageService.success("Category updated successfully!");
          } else if (response == 'CATEGORYNAMEEXISTS') {
            this._base._alertMessageService.error("Category Name Already Exist");
            isRedirect = false
          }
          if (isRedirect)
            setTimeout(() => { this._base._router.navigate(['/admin/category']); }, 1000);
        });
      });
    });
  }

  bindCategory(flag, ref_category_id, aliasName = null) {
    return new Promise((resolve, rej) => {
      this._categoryService.categorylist(flag, ref_category_id, aliasName).subscribe((resData: any) => {
        resData.filter((res) => {
          this.categoryData.push(res);
        });
        this.categoryDataWOCurrent = JSON.parse(JSON.stringify(this.categoryData));
        resolve(true);
      });
    })
  }


  fileChoosen($event, fieldName) {
    console.log("fileChoosen", $event, typeof this.fileChoosenData[fieldName])

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

            this.formCategory.controls[fieldName].setValue('upload')
            this.formCategory.controls[fieldName].updateValueAndValidity()
            this._base._commonService.readImage(file).subscribe((res: any) => {
              // let imgData: fileChoosenDataModel | any = { file: file, thumb: res, Ref_File_ID: null, DisplayOrder: null }
              let imgData: fileChoosenDataModel = { file: file, thumb: res, FileManagerID: 0, Sequence: null, ModuleType: "category", FileIdentifier: fileValidationInfo[fieldName].FileIdentifier, ModuleID: this._categoryModel.Ref_Category_ID }

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
    if (this.fileChoosenData[fieldName][fileIndex].FileManagerID != null)
      this.removeThumbnail(this.fileChoosenData[fieldName][fileIndex].FileManagerID)

    this.fileChoosenData[fieldName].splice(fileIndex, 1)
    this.formCategory.controls[fieldName].setValue(this.getFileControlValue(fieldName))
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

}
