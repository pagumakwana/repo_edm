import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';

@Component({
  selector: 'appAdmin-generlist',
  templateUrl: './generlist.component.html',
  styleUrls: ['./generlist.component.scss']
})
export class GenerListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper, private _categoryService: CategoryService) { }
  _categoryModel: CategoryModel = {};
  public categoryData: any;
  ngAfterViewInit(): void {
    this._base._pageTitleService.setTitle('ALL Genre', 'ALL GENRE');
  }
  ngOnInit(): void {
    this.bindCategory();
  }
  bindCategory() {
    this._categoryModel = {
      Flag: '',
      Ref_Category_ID: 0,
      Ref_Parent_ID: 0
    }
    this._categoryService.categorylist(this._categoryModel).subscribe((resData: any) => {
      this.categoryData = resData;
    });
  }
  modifycategory(data, flag) {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        debugger
        this._categoryModel.Flag = flag;
        this._categoryModel.Ref_User_ID = Ref_User_ID;
        this._categoryModel.Ref_Category_ID = data.Ref_Category_ID;
        this._categoryModel.Ref_Parent_ID = data.Ref_Parent_ID;
        this._categoryModel.CategoryName = data.CategoryName;
        this._categoryModel.Description = data.Description;
        this._categoryModel.ThumbnailImageUrl = data.ThumbnailImageUrl;
        this._categoryModel.CreatedName = FullName;
        if (flag == 'MODIFYCATEGORY') {
          this._categoryService.categoryArray = this._categoryModel;
          this._base._router.navigate(['/admin/gener/' + data.Ref_Category_ID]);
        }
      });
    });
  }

  removeGenre() {
    this._categoryService.addmodifycategory(this._categoryModel).subscribe(response => {
      if (response == 'CATEGORYDELETED') {
        this._base._alertMessageService.success("Genre deleted successfully!");
        this.categoryData.filter((res: any) => {
          if (res.Ref_Category_ID === this._categoryModel.Ref_Category_ID) {
            this.categoryData.splice(res, 1);
          }
        });
      }
    }, error => {
      this._base._alertMessageService.error("Something went wrong !!");
    })
  }

  cancelGenre() {
    this._categoryModel.Flag = '';
    this._categoryModel.Ref_Category_ID = 0;
    this._categoryModel.Ref_Parent_ID = 0;
    this._categoryModel.CategoryName = '';
    this._categoryModel.Description = '';
    this._categoryModel.ThumbnailImageUrl = '';
  }
}
