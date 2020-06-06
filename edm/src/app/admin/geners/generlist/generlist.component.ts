import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';

@Component({
  selector: 'appAdmin-generlist',
  templateUrl: './generlist.component.html',
  styleUrls: ['./generlist.component.scss']
})
export class GenerListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper, private _categoryService: CategoryService) { }
  _categoryModel: CategoryModel = {};
  public categoryData: any;
  ngOnInit(): void {
    this.bindCategory();
  }
  bindCategory() {
    this._categoryModel = {
      Flag: '',
      Ref_Category_ID: 0,
      Ref_Preant_ID: 0
    }
    this._categoryService.categorylist(this._categoryModel).subscribe((resData: any) => {
      this.categoryData = resData;
    });
  }

}
