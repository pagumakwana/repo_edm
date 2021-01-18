import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { dataTableConfig, tableEvent } from 'src/app/commonmodule/datatables/datatables.modal';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { DatatablesComponent } from 'src/app/commonmodule/datatables/datatables.component';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { ServiceModel } from 'src/app/_appModel/genservices/service.model';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { ProducerService } from 'src/app/_appService/producer/producer.serviec';
declare var $: any;

@Component({
  selector: 'appAdmin-productlist',
  templateUrl: './producerlist.component.html',
  styleUrls: ['./producerlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class producerListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    // private _categoryService: CategoryService,
    // private _service: GenService,
    private _producer: ProducerService
  ) { }
  selectedStatus: any = ''
  producerList = [];
  statusArray: Array<{ text: string, value: string }> = [
    {
      text: "pending", value: ''
    },
    {
      text: "Approved", value: 'Approved'
    },
    {
      text: "reject", value: 'Rejected'
    }
  ]

  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      { identifer: "FileManager", title: "Thumbnail", type: "image", dataType: { type: "array", path: ['0', 'FilePath'] }, size: { height: "35px", width: "35px" } },
      { identifer: "FullName", title: "Artist Name", type: "text" },
      { identifer: "", title: "country", type: "text" },
      { identifer: "TrackCount", title: "Tracks /SO", type: "text" },
      { identifer: "BeatCount", title: "Beats /SO", type: "text" },
      { identifer: "Earning", title: "Earning", type: "text" },
      { identifer: "AccountStatus", title: "Status", type: "text" },
      { identifer: "", title: "Gov ID", type: "text" },
      // { identifer: "CreatedName", title: "CreatedBy", type: "text" },
      // { identifer: "IsActive", title: "IsActive", type: "flag" },
      { identifer: "", title: "Action", type: "button", buttonList: [{ name: 'Accept', class: 'primary_btn', iconClass: 'edit_btn', condition: { type: 'logic', key: 'AccountStatus', value: 'Rejected' } }, { name: 'Reject', class: 'red_btn', iconClass: 'delete_icon', condition: { type: 'logic', key: 'AccountStatus', value: 'Approved' } }] }
    ]
  }
  // categoryData: []
  // _serviceModel: ServiceModel = {};
  @ViewChild('dataTableCom', { static: false }) tableObj: DatatablesComponent;


  ngOnInit(): void {
    this._base._commonService.showLoader();
    this._base._pageTitleService.setTitle("Producer List", "Producer List");
    this.getProducerList()
    // this.getCategory()
  }



  getProducerList() {
    this._producer.Producers().subscribe((res: any) => {
      this.producerList = Array.isArray(res) ? res : []
      this.producerList.map(item => {
        return item.AccountStatus = item.AccountStatus == null ? '' : item.AccountStatus
      })
      this.loadTableData()
      setTimeout(() => {
        this._base._commonService.hideLoader();
      }, 500);
    })
  }

  loadTableData() {
    let tableData = JSON.parse(JSON.stringify(this.producerList))
    // this.tableConfig.tableData = this.selectedCategory == 'ALL' ? JSON.parse(JSON.stringify(this.serviceList)) : this.serviceList.filter(item => item.Ref_Category_ID == this.selectedCategory)
    this.tableConfig.tableData = tableData.filter(item => item.AccountStatus == this.selectedStatus)
    console.log("loadTableData", this.tableConfig)
    this.tableObj.initializeTable()
  }

  filterchange(event) {
    console.log("filterchange", event, this.selectedStatus)
    this.loadTableData()
  }

  producerActions(dataItem) {
    // this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      let msg = {
        "Accept": 'Approved',
        "Reject": 'Rejected'
      }

      let data = {
        ProducerIDs: dataItem.tableItem.Ref_User_ID,
        Action: msg[dataItem.actionInfo.name],
        Reason: "",
        ActionBy: Ref_User_ID
      }
      this._producer.ApproveAndRejact(data).subscribe((resData: any) => {
        // this.categoryData = resData
        this._base._alertMessageService.success(resData);

        this.getProducerList()
      }, err => {
        this._base._alertMessageService.error("Something went wrong");
      });
    });
  }

  tableClick(dataItem: tableEvent) {
    console.log("tableClick", dataItem)
    if ((dataItem.action.type == "button" && dataItem.actionInfo.name == "Accept")) {
      this.producerActions(dataItem);
    } else if (dataItem.action.type == "button" && dataItem.actionInfo.name == "Reject") {
      this.producerActions(dataItem);
      // this.modifyService(dataItem.tableItem, 'DELETESERVICE');
    }
  }

}
