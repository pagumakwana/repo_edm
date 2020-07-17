import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";


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
    private _activatedRouter: ActivatedRoute) { }

  _categoryModel: CategoryModel = {};
  aliasName: string;
  public categoryData: any = [];
  isCategoryModify: boolean = false;
  btnTitle: string = 'ADD'
  imgCategory: any;
  fileData: any;
  formCategory: FormGroup = this._fbGener.group({
    Ref_Parent_ID: ['',],
    CategoryName: ['', [Validators.required]],
    AliasName: ['', [Validators.required]],
    CategoryDescription: [''],
    CategoryUseBy: ['']
  })

  ngAfterViewInit(): void {
    this._base._pageTitleService.setTitle('Category', this.btnTitle + ' GENRE / Category');
  }
  ngOnInit(): void {
    this.aliasName = this._activatedRouter.snapshot.paramMap.get('slug');
    if (this.aliasName != '0') {
      this.bindCategory('ALL', 0).then((res: any) => {
        if (res) {
          this.getCategory();
        }
      })
    } else {
      this.intialise();
      this.bindCategory('ALL', 0);
    }
  }

  intialise() {
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        this._categoryModel = {
          Flag: '',
          Ref_Parent_ID: 0,
          CategoryName: '',
          AliasName: '',
          Description: '',
          CategoryUseBy: '',
          FileUrls: [],
          Ref_User_ID: Ref_User_ID,
          CreatedName: FullName
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
      console.log("catData", this._categoryModel);
      this.isCategoryModify = true;
      this.btnTitle = 'Modify'
      this.formCategory.controls.Ref_Parent_ID.setValue(this._categoryModel.Ref_Parent_ID);
      this.formCategory.controls.CategoryName.setValue(this._categoryModel.CategoryName);
      this.formCategory.controls.AliasName.setValue(this._categoryModel.AliasName);
      this.formCategory.controls.CategoryDescription.setValue(this._categoryModel.Description);
      this.formCategory.controls.CategoryUseBy.setValue(this._categoryModel.CategoryUseBy);
    }
  }

  setCategoryModel() {
    this._base._commonService.markFormGroupTouched(this.formCategory)
    if (this.formCategory.valid) {
      this._base._commonService.filesUpload(this.fileData, 'Category').then((FileUrls: string) => {
        this._categoryModel.Ref_Parent_ID = this.formCategory.value.Ref_Parent_ID;
        this._categoryModel.CategoryName = this.formCategory.value.CategoryName;
        this._categoryModel.AliasName = this.formCategory.value.AliasName;
        this._categoryModel.Description = this.formCategory.value.CategoryDescription;
        this._categoryModel.CategoryUseBy = this.formCategory.value.CategoryUseBy;
        this._categoryModel.FileUrls = FileUrls;
        this.addmodifycategory();
      });
    }
  }

  addmodifycategory() {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._categoryModel.Flag = this.isCategoryModify ? 'MODIFYCATEGORY' : 'ADDCATEGORY';
        this._categoryModel.CreatedName = FullName;
        this._categoryModel.Ref_User_ID = Ref_User_ID;
        this._categoryService.addmodifycategory(this._categoryModel).subscribe((response: any) => {
          if (response == 'CATEGORYADDED') {
            this._base._alertMessageService.success("Category added successfully!");
          } else if (response == 'CATEGORYUPDATED') {
            this._base._alertMessageService.success("Category updated successfully!");
          }
          setTimeout(() => {
            this._base._router.navigate(['/admin/category']);
          }, 1000);
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
        resolve(true);
      });
    })
  }
  fileChoosen($event) {
    this.fileData = $event.target.files;
  }

}
