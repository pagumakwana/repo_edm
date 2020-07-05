import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { dataTableConfig, tableEvent } from 'src/app/commonmodule/datatables/datatables.modal';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { DatatablesComponent } from 'src/app/commonmodule/datatables/datatables.component';

@Component({
  selector: 'appAdmin-servicesslist',
  templateUrl: './servicesslist.component.html',
  styleUrls: ['./servicesslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServicesListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    private _service: GenService,
  ) { }
  serviceList = []
  @ViewChild('dataTableCom', { static: false }) tableObj: DatatablesComponent;


  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Service Management", "Service Management");
    this.getService('0')
  }

  getService(serviceId) {
    this._service.getService(serviceId).subscribe((res: any) => {
      // this.serviceList = Array.isArray(res) ? res[0] : null
      this.serviceList = res
      this.tableConfig.tableData = this.serviceList
      this.tableObj.initializeTable()

    })
  }

  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      // { identifer: "Sr", title: "Sr" },
      { identifer: "ServiceTitle", title: "ServiceTitle", type: "link" },
      { identifer: "IsActive", title: "IsActive", type: "text" },
      { identifer: "CreatedBy", title: "CreatedBy", type: "text" },
      { identifer: "Price", title: "Price", type: "text" },
      { identifer: "PriceWithProjectFiles", title: "PriceWithProjectFiles", type: "text" },
      { identifer: "Ref_Category_ID", title: "Ref_Category_ID", type: "text" },
      { identifer: "Revision", title: "Revision", type: "text" },
      { identifer: "ThumbnailImageUrl", title: "ThumbnailImageUrl", type: "text" }
      // { identifer: "ThumbnailImageUrl", title: "Thumbnail", type: "image", size: { height: "100px", width: "100px" } },
      // { identifer: "CategoryName", title: "CategoryName", type: "link" },
      // { identifer: "Description", title: "Description", type: "text" },
      // { identifer: "IsActive", title: "IsActive", type: "flag" },
      // { identifer: "", title: "Action", type: "button", buttonList: [{ name: 'Edit', class: 'global_btn primary_btn', iconClass: 'delete_icon btn_icon' }, { name: 'Delete', class: 'global_btn icon_btn red_btn', iconClass: 'delete_icon btn_icon' }] }
    ]
  }




  tableClick(dataItem: tableEvent) {
    console.log("test", dataItem);
    if (dataItem.action.type == 'link' || (dataItem.action.type == 'button' && dataItem.actionInfo.name == "Edit")) {
      // this.modifycategory(dataItem.tableItem, 'MODIFYCATEGORY');
      this._base._router.navigate(['admin', 'services', dataItem.tableItem.Ref_Service_ID])
    }
  }


}
