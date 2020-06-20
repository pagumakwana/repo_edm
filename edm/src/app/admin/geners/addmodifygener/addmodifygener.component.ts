import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'appAdmin-addmodifygener',
  templateUrl: './addmodifygener.component.html',
  styleUrls: ['./addmodifygener.component.scss']
})
export class AddModifyGenersComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    private _fbGener: FormBuilder,
    private _categoryService: CategoryService,
    private _activatedRouter: ActivatedRoute) { }
  _categoryModel: CategoryModel = {};
  public categoryData: any = [];
  isCategoryModify: boolean = false;
  btnTitle: string = 'Add Genre'
  formCategory: FormGroup = this._fbGener.group({
    Ref_Parent_ID: ['', [Validators.required]],
    CategoryName: ['', [Validators.required]],
    CategorySlug: ['', [Validators.required]],
    CategoryDescription: ['', [Validators.required]]
  })

  ngAfterViewInit(): void{
    this._base._pageTitleService.setTitle('Add modify genre', 'Add / Modify Genre');
  }
  ngOnInit(): void {
    this._categoryModel = {
      Flag: '',
      Ref_Parent_ID: 0,
      CategoryName: '',
      CategorySlug: '',
      Description: '',
      ThumbnailImageUrl: '',
      Ref_User_ID: 0,
      CreatedName: ''
    }
    
    this.bindCategory();
    let ref_category_id = parseInt(this._activatedRouter.snapshot.paramMap.get('ref_category_id'));
    if (ref_category_id > 0) {
      this._categoryModel = this._categoryService.categoryArray;
      debugger
      this.isCategoryModify = true;
      this.btnTitle = 'Modify Genre'
      this.formCategory.controls.Ref_Parent_ID.setValue(this._categoryModel.Ref_Parent_ID);
      this.formCategory.controls.CategoryName.setValue(this._categoryModel.CategoryName);
      this.formCategory.controls.CategorySlug.setValue(this._categoryModel.CategorySlug);
      this.formCategory.controls.CategoryDescription.setValue(this._categoryModel.Description);
    }
  }


  setCategoryModel() {
    this._base._commonService.markFormGroupTouched(this.formCategory)
    if (this.formCategory.valid) {
      this._categoryModel.Ref_Parent_ID = this.formCategory.value.Ref_Parent_ID;
      this._categoryModel.CategoryName = this.formCategory.value.CategoryName;
      this._categoryModel.CategorySlug = this.formCategory.value.CategorySlug;
      this._categoryModel.Description = this.formCategory.value.CategoryDescription;
      this.addmodifycategory();
    }
  }

  addmodifycategory() {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._categoryModel.Flag = this.isCategoryModify ? 'MODIFYCATEGORY' : 'ADDCATEGORY';
        this._categoryModel.CreatedName = '';
        this._categoryModel.Ref_User_ID = 0;
        this._categoryService.addmodifycategory(this._categoryModel).subscribe((response: any) => {
          console.log("response", response);
          if (response == 'CATEGORYADDED') {
            this._base._alertMessageService.success("Genre added successfully!");
          } else if (response == 'CATEGORYUPDATED') {
            this._base._alertMessageService.success("Genre updated successfully!");
          }
          setTimeout(() => {
            this._base._router.navigate(['/admin/gener']);
          }, 1000);
        });
      });
    });
  }

  bindCategory() {
    let _categoryModel = {
      Flag: '',
      Ref_Category_ID: 0,
      Ref_Parent_ID: 0
    }
    this._categoryService.categorylist(_categoryModel).subscribe((resData: any) => {
      resData.filter((res) => {
        if (res.Ref_Parent_ID == 0) {
          this.categoryData.push(res);
        }
      });
    });
  }
}
