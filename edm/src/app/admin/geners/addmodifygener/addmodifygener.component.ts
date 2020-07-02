import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { ActivatedRoute } from '@angular/router';

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
    CategoryUserBy: ['']
  })

  ngAfterViewInit(): void {
    this._base._pageTitleService.setTitle('Category', this.btnTitle + ' GENRE / Category');
  }
  ngOnInit(): void {
    this.bindCategory();
    debugger
    let aliasName = this._activatedRouter.snapshot.paramMap.get('slug');
    if (aliasName != 'new') {
      this.getCategory();
      this.btnTitle="MODIFY"
    } else {
      this.intialise();
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
          ImageUrls: [],
          Ref_User_ID: Ref_User_ID,
          CreatedName: FullName
        }
      });
    });
  }

  getCategory() {
    this._categoryModel = this._categoryService.categoryArray;
    this.isCategoryModify = true;
    this.btnTitle = 'Modify'
    this.formCategory.controls.Ref_Parent_ID.setValue(this._categoryModel.Ref_Parent_ID);
    this.formCategory.controls.CategoryName.setValue(this._categoryModel.CategoryName);
    this.formCategory.controls.AliasName.setValue(this._categoryModel.AliasName);
    this.formCategory.controls.CategoryDescription.setValue(this._categoryModel.Description);
    this.formCategory.controls.CategoryUseBy.setValue(this._categoryModel.CategoryUseBy);
  }

  setCategoryModel() {
    this._base._commonService.markFormGroupTouched(this.formCategory)
    if (this.formCategory.valid) {
      this._base._commonService.filesUpload(this.fileData, 'Category').then((ImageUrls: string) => {
        this._categoryModel.Ref_Parent_ID = this.formCategory.value.Ref_Parent_ID;
        this._categoryModel.CategoryName = this.formCategory.value.CategoryName;
        this._categoryModel.AliasName = this.formCategory.value.AliasName;
        this._categoryModel.Description = this.formCategory.value.CategoryDescription;
        this._categoryModel.CategoryUseBy = this.formCategory.value.CategoryUseBy;
        this._categoryModel.ImageUrls = ImageUrls;
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

  bindCategory() {
    this._categoryService.categorylist('ALL',0).subscribe((resData: any) => {
      resData.filter((res) => {
        if (res.Ref_Parent_ID == 0) {
          this.categoryData.push(res);
        }
      });
    });
  }
  fileChoosen($event) {
    this.fileData = $event.target.files;
  }

}
