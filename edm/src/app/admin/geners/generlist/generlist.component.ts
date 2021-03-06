import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { DatatablesComponent } from 'src/app/commonmodule/datatables/datatables.component';
import { dataTableConfig, tableEvent } from 'src/app/commonmodule/datatables/datatables.modal';
declare var $: any;
// import * as $ from 'jquery'


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
  public categoryFilterData: any;

  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      { identifer: "FileManager", title: "Thumbnail", type: "image", dataType: { type: "array", path: ['0', 'FilePath'] }, size: { height: "35px", width: "35px" } },
      { identifer: "CategoryName", title: "Category Name", type: "link" },
      { identifer: "CategoryUseByName", title: "Type", type: "text" },
      { identifer: "Description", title: "Description", type: "text" },
      // { identifer: "CreatedName", title: "Created By", type: "text" },
      // { identifer: "IsActive", title: "IsActive", type: "flag" },
      { identifer: "", title: "Action", type: "buttonIcons", buttonIconList: [{ title: 'Edit', class: 'small_icon_btn', iconClass: 'edit_btn' }, { title: 'Delete', class: 'small_icon_btn', iconClass: 'delete_btn' }] }
    ]
  }
  tableClick(dataItem: tableEvent) {
    if (dataItem.action.type == 'link' || (dataItem.action.type == 'buttonIcons' && dataItem.actionInfo.title == "Edit")) {
      this.modifycategory(dataItem.tableItem, 'MODIFYCATEGORY');
    } else if (dataItem.action.type == 'buttonIcons' && dataItem.actionInfo.title == "Delete") {
      this.modifycategory(dataItem.tableItem, 'DELETECATEGORY');

    }
  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this._base._commonService.showLoader();
    this._base._pageTitleService.setTitle('Manage Category', 'MANAGE CATEGORY');
    this.bindCategory().then(res => {
      this.tableConfig.tableData = this.categoryData;
      this.tableObj.initializeTable()
      this._base._commonService.hideLoader();
    });
  }
  bindCategory() {
    return new Promise((resolve, reject) => {
      let track = { 1: 'Track', 2: 'Beats', 3: 'Blog', 4: 'Service', 5: 'News' }
      this._categoryService.categorylist('ALL', 0).subscribe((resData: any) => {
        this.categoryData = []
        this.categoryData = Array.isArray(resData) ? resData : [];
        this.categoryData.map(item => {
          return item.CategoryUseByName = track[item.CategoryUseBy]
        })
        console.log("categoryData", this.categoryData);
        resolve(resData);
      });
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
        this._categoryModel.CreatedName = FullName;
        this._categoryModel.AliasName = data.AliasName;
        if (flag == 'MODIFYCATEGORY') {
          // this._categoryService.categoryArray = this._categoryModel;
          this._base._router.navigate(['/admin/category/' + data.AliasName]);
        } else if (flag == 'DELETECATEGORY') {
          $('#modal-deleteconfirmation').modal('show')
        }
      });
    });
  }

  removeGenre() {
    // this._categoryService.addmodifycategory(this._categoryModel).subscribe(response => {
    this._categoryService.ManageCategory(this._categoryModel.Ref_Category_ID, 'delete').subscribe((response: any) => {
      if (response == 'CATEGORYDELETE') {
        this._base._alertMessageService.success("Category deleted successfully!");
        this.categoryData.filter((res: any, index: number) => {
          if (res.Ref_Category_ID === this._categoryModel.Ref_Category_ID) {
            this.categoryData.splice(index, 1);
          }
        });
        this.tableConfig.tableData = this.categoryData;
        this.tableObj.initializeTable();   
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
  }

  changeFilter(event) {
    debugger
    this.bindCategory().then((res: any) => {
      if (parseInt(event.target.value) >= 1) {
        this.tableConfig.tableData = this.categoryData.filter((res: any) => {
          return res.CategoryUseBy == parseInt(event.target.value);
        })
      } else if (parseInt(event.target.value) == 0) {
        this.tableConfig.tableData = this.categoryData;
      }
      this.tableObj.initializeTable(); 

    });
  }
}
