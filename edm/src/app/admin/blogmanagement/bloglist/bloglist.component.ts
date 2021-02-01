import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { dataTableConfig, tableEvent } from 'src/app/commonmodule/datatables/datatables.modal';
// import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { DatatablesComponent } from 'src/app/commonmodule/datatables/datatables.component';
import { enAppSession } from 'src/app/_appModel/enAppSession';
// import { ServiceModel } from 'src/app/_appModel/genservices/service.model';
// import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { BlogService } from 'src/app/_appService/blog/blog.service';
import { BlogModel } from 'src/app/_appModel/blog/blog.model';
declare var $: any;

@Component({
  selector: 'appAdmin-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    // private _categoryService: CategoryService,
    private _blog: BlogService,
  ) { }
  selectedCategory: any = 'ALL'
  blogList = [];
  categoryData: []
  Ref_blog_ID
  @ViewChild('dataTableCom', { static: false }) tableObj: DatatablesComponent;


  ngOnInit(): void {
    this._base._commonService.showLoader();
    this._base._pageTitleService.setTitle("Manage Blog", "Manage Blog");
    this.getBlog()
    // this.getCategory()
  }

  getBlog() {
    this._blog.getBlog().subscribe((res: any) => {
      this.blogList = Array.isArray(res) ? res : []
      this.loadTableData()
      setTimeout(() => {
        this._base._commonService.hideLoader();
      }, 500);
    })
  }

  loadTableData() {
    // let tableData = JSON.parse(JSON.stringify(this.blogList))
    this.tableConfig.tableData = JSON.parse(JSON.stringify(this.blogList))
    // this.tableConfig.tableData = this.selectedCategory == 'ALL' ? JSON.parse(JSON.stringify(this.blogList)) : this.blogList.filter(item => item.Ref_Category_ID == this.selectedCategory)
    console.log("loadTableData", this.tableConfig.tableData)
    this.tableObj.initializeTable()
  }

  filterchange(event) {
    console.log("filterchange", event, this.selectedCategory)
    this.loadTableData()
  }


  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      { identifer: "FileManager", title: "Thumbnail", type: "image", dataType: { type: "array", path: ['0', 'FilePath'] }, size: { height: "35px", width: "35px" } },
      { identifer: "BlogTitle", title: "Blog Title", type: "link" },
      { identifer: "CreatedBy", title: "CreatedBy", type: "text" },
      { identifer: "IsActive", title: "IsActive", type: "text" },
      // { identifer: "PriceWithProjectFiles", title: "Price With Project Files", type: "text" },
      // { identifer: "Revision", title: "Revision", type: "text" },
      // { identifer: "CreatedName", title: "CreatedBy", type: "text" },
      // { identifer: "IsActive", title: "IsActive", type: "flag" },
      { identifer: "", title: "Action", type: "buttonIcons", buttonIconList: [{ title: 'Edit', class: 'small_icon_btn', iconClass: 'edit_btn' }, { title: 'Delete', class: 'small_icon_btn', iconClass: 'delete_btn' }] }
    ]
  }

  tableClick(dataItem: tableEvent) {
    console.log("tableClick", dataItem)
    if (dataItem.action.type == 'link' || (dataItem.action.type == 'buttonIcons' && dataItem.actionInfo.title == "Edit")) {
      // this.modifyService(dataItem.tableItem, 'MODIFYSERVICE');
      this._base._router.navigate(['/admin/blog/' + dataItem.tableItem.Ref_Blog_ID]);

    } else if (dataItem.action.type == 'buttonIcons' && dataItem.actionInfo.title == "Delete") {
      this.Ref_blog_ID = dataItem.tableItem.Ref_Blog_ID
      $('#modal-deleteconfirmation').modal('show')
      // this.modifyService(dataItem.tableItem, 'DELETESERVICE');
    }
  }


  removeBlog() {
    this._blog.ManageBlog(this.Ref_blog_ID, 'delete').subscribe((response: any) => {
      if (response == 'BLOGDELETE') {
        this._base._alertMessageService.success("Blog deleted successfully!");
        this.getBlog()
        // this.blogList.filter((res: any, index: number) => {
        //   if (res.Ref_blog_ID == this._blogModel.Ref_blog_ID) {
        //     this.blogList.splice(index, 1);
        //   }
        // });
        // this.tableConfig.tableData = this.blogList
        // this.tableObj.initializeTable()
      }
    }, error => {
      this._base._alertMessageService.error("Something went wrong !!");
    })
  }

  cancelService() {
    // this._blogModel.Flag = '';
    // this._blogModel.Ref_Category_ID = 0;
    // this._blogModel.ServiceTitle = '';
    // this._blogModel.AliasName = '';
    // this._blogModel.Description = '';
  }

}
