import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'appAdmin-addmodifygener',
  templateUrl: './addmodifygener.component.html',
  styleUrls: ['./addmodifygener.component.scss']
})
export class AddModifyGenersComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    private fb: FormBuilder,
    private _categoryService: CategoryService) { }
  _categoryModel: CategoryModel = {};

  formCategory: FormGroup = this.fb.group({
    CategoryName: ['', [Validators.required]],
    CategorySlug: ['', [Validators.required]],
    CategoryDescription: ['', [Validators.required]]
  })


  ngOnInit(): void {
    this._categoryModel = {
      Flag: '',
      Ref_Preant_ID: 0,
      CategoryName: '',
      CategorySlug: '',
      Descripation: '',
      ThumbnailImageUrl: '',
      Ref_User_ID: 0,
      CreatedName: ''
    }
  }


  setCategoryModel() {
    this._base._commonService.markFormGroupTouched(this.formCategory)
    if (this.formCategory.valid) {
      this._categoryModel.CategoryName = this.formCategory.value.CategoryName;
      this._categoryModel.CategorySlug = this.formCategory.value.CategorySlug;
      this._categoryModel.Descripation = this.formCategory.value.Descripation;
      this.addmodifycategory();
    }
  }

  addmodifycategory() {
    this._categoryModel.Flag = 'ADDCATEGORY';
    this._categoryModel.CreatedName = '';
    this._categoryModel.Ref_User_ID = 0;
    this._categoryService.addmodifycategory(this._categoryModel).subscribe((response: any) => {
      alert(response.Resonse);
    });
  }

}
