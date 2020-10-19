import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { DatatablesComponent } from 'src/app/commonmodule/datatables/datatables.component';
import { CouponService } from 'src/app/_appService/coupon/coupon.service';
import { dataTableConfig, tableEvent } from 'src/app/commonmodule/datatables/datatables.modal';

@Component({
  selector: 'appAdmin-coupanlist',
  templateUrl: './coupanlist.component.html',
  styleUrls: ['./coupanlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoupanListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper, private _coupon: CouponService) { }

  @ViewChild('dataTableCom', { static: false }) tableObj: DatatablesComponent;

  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      { identifer: "CouponCode", title: "CouponCode", type: "link"},
      { identifer: "Description", title: "Description", type: "text"},
      { identifer: "DiscountInPercentage", title: "DiscountInPercentage", type: "text"},
      { identifer: "DiscountInMax", title: "DiscountInMax", type: "text"},
      { identifer: "StartDate", title: "StartDate", type: "text"},
      { identifer: "EndDate", title: "EndDate", type: "text"},
      // { identifer: "FileManager", title: "Thumbnail", type: "image", dataType: { type: "array", path: ['0', 'FilePath'] }, size: { height: "35px", width: "35px" } },
      // { identifer: "ServiceTitle", title: "Service Title", type: "link" },
      // { identifer: "Price", title: "Price", type: "text" },
      // { identifer: "PriceWithProjectFiles", title: "Price With Project Files", type: "text" },
      // { identifer: "Revision", title: "Revision", type: "text" },
      // { identifer: "CreatedName", title: "CreatedBy", type: "text" },
      // { identifer: "IsActive", title: "IsActive", type: "flag" },
      // { identifer: "", title: "Action", type: "buttonIcons", buttonIconList: [{ title: 'Edit', class: 'small_icon_btn', iconClass: 'edit_btn' }, { title: 'Delete', class: 'small_icon_btn', iconClass: 'delete_btn' }] }
    ]
  }

  tableClick(dataItem: tableEvent) {
    console.log("tableClick", dataItem)
    // if (dataItem.action.type == 'link' || (dataItem.action.type == 'buttonIcons' && dataItem.actionInfo.title == "Edit")) {
    //   this.modifyService(dataItem.tableItem, 'MODIFYSERVICE');
    // } else if (dataItem.action.type == 'buttonIcons' && dataItem.actionInfo.title == "Delete") {
    //   this.modifyService(dataItem.tableItem, 'DELETESERVICE');
    // }
  }

  ngOnInit(): void {
    // this._base._commonService.showLoader();
    this._base._pageTitleService.setTitle("ALL COUPAN CODE", "ALL COUPAN CODE");
    this.CouponCode()
  }

  CouponCode() {
    this._coupon.CouponCode().subscribe((res: any) => {
      console.log("CouponCode", res)
      // this.tableConfig.tableData = this.selectedCategory == 'ALL' ? JSON.parse(JSON.stringify(this.serviceList)) : this.serviceList.filter(item => item.Ref_Category_ID == this.selectedCategory)
      this.tableConfig.tableData = res

      this.tableObj.initializeTable()

    })
  }



}
