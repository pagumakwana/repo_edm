import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { DatatablesComponent } from 'src/app/commonmodule/datatables/datatables.component';
import { dataTableConfig, tableEvent } from 'src/app/commonmodule/datatables/datatables.modal';

@Component({
  selector: 'appAdmin-generlist',
  templateUrl: './generlist.component.html',
  styleUrls: ['./generlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GenerListComponent implements OnInit {
  @ViewChild('dataTableCom', { static: false }) tableObj: DatatablesComponent;
  dataTable: any;
  constructor(public _base: BaseServiceHelper, private _categoryService: CategoryService) { }
  _categoryModel: CategoryModel = {};
  public categoryData: any;

  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      // { identifer: "Sr", title: "Sr" },
      { identifer: "ThumbnailImageUrl", title: "Thumbnail", type: "image", size: { height: "100px", width: "100px" } },
      { identifer: "CategoryName", title: "CategoryName", type: "link" },
      { identifer: "Description", title: "Description", type: "text" },
      // { identifer: "CreatedBy", title: "CreatedBy", type: "text" },
      { identifer: "IsActive", title: "IsActive", type: "flag" },
      { identifer: "", title: "Action", type: "button", buttonList: [{ name: 'Edit', class: 'global_btn primary_btn', iconClass: 'delete_icon btn_icon' }, { name: 'Delete', class: 'global_btn icon_btn red_btn', iconClass: 'delete_icon btn_icon' }] }
    ]
  }
  tableClick(dataItem: tableEvent) {
    console.log("test", dataItem);
    if (dataItem.action.type == 'link' || (dataItem.action.type == 'button' && dataItem.actionInfo.name == "Edit")) {
      this.modifycategory(dataItem.tableItem, 'MODIFYCATEGORY');
    }
  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this._base._pageTitleService.setTitle('Manage Category', 'MANAGE GENRE / CATEGORY');
    this.bindCategory();
  }
  bindCategory() {
    // this._categoryModel = {
    //   Flag: '',
    //   Ref_Category_ID: 0,
    //   Ref_Parent_ID: 0
    // }
    this._categoryService.categorylist().subscribe((resData: any) => {
      let categoryData = []
      categoryData = Array.isArray(resData) ? resData : []
      console.log("categoryData", categoryData);
      this.tableConfig.tableData = categoryData
      this.tableObj.initializeTable()
    });
  }
  modifycategory(data, flag) {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._categoryModel.Flag = flag;
        this._categoryModel.Ref_User_ID = Ref_User_ID;
        this._categoryModel.Ref_Category_ID = data.Ref_Category_ID;
        this._categoryModel.Ref_Parent_ID = data.Ref_Parent_ID;
        this._categoryModel.CategoryName = data.CategoryName;
        this._categoryModel.Description = data.Description;
        this._categoryModel.ThumbnailImageUrl = data.ThumbnailImageUrl;
        this._categoryModel.CreatedName = FullName;
        this._categoryModel.AliasName = data.AliasName;
        if (flag == 'MODIFYCATEGORY') {
          this._categoryService.categoryArray = this._categoryModel;
          this._base._router.navigate(['/admin/category/' + data.AliasName]);
        }
      });
    });
  }

  removeGenre() {
    this._categoryService.addmodifycategory(this._categoryModel).subscribe(response => {
      if (response == 'CATEGORYDELETED') {
        this._base._alertMessageService.success("Category deleted successfully!");
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
