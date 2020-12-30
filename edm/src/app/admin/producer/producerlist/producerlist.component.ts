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
  // selectedCategory: any = 'ALL'
  producerList = [];
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
      this.loadTableData()
      setTimeout(() => {
        this._base._commonService.hideLoader();
      }, 500);
    })
  }

  loadTableData() {
    let tableData = JSON.parse(JSON.stringify(this.producerList))
    // this.tableConfig.tableData = this.selectedCategory == 'ALL' ? JSON.parse(JSON.stringify(this.serviceList)) : this.serviceList.filter(item => item.Ref_Category_ID == this.selectedCategory)
    this.tableConfig.tableData = tableData
    console.log("loadTableData", this.tableConfig.tableData)
    this.tableObj.initializeTable()
  }

  filterchange(event) {
    // console.log("filterchange", event, this.selectedCategory)
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

  // getCategory() {
  //   this._categoryService.categorylist('SERVICE', 0).subscribe((resData: any) => {
  //     // this.categoryData = resData
  //   });
  // }

  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      // { identifer: "FileManager", title: "Thumbnail", type: "image", dataType: { type: "array", path: ['0', 'FilePath'] }, size: { height: "35px", width: "35px" } },
      { identifer: "FullName", title: "Artist Name", type: "text" },
      { identifer: "", title: "country", type: "text" },
      { identifer: "", title: "Tracks /SO", type: "text" },
      { identifer: "", title: "Beats /SO", type: "text" },
      { identifer: "Earning", title: "Earning", type: "text" },
      { identifer: "AccountStatus", title: "Status", type: "text" },
      { identifer: "", title: "Gov ID", type: "text" },
      // { identifer: "CreatedName", title: "CreatedBy", type: "text" },
      // { identifer: "IsActive", title: "IsActive", type: "flag" },
      { identifer: "", title: "Action", type: "button", buttonList: [{ name: 'Accept', class: 'primary_btn', iconClass: 'edit_btn' }, { name: 'Reject', class: 'red_btn', iconClass: 'delete_icon' }] }
    ]
  }
  // AccountStatus: null
  // BeatCount: 3
  // Bio: "EGTRHYTJ"
  // Earning: null
  // EmailID: "pagumakwana@gmail.com"
  // : "Pragnesh Makwana"
  // MobileNumber: ""
  // ProfilePhoto: null
  // Ref_User_ID: 1
  // TrackCount: 3
  // UserCode: "pagumakwana@gmail.com"

  tableClick(dataItem: tableEvent) {
    console.log("tableClick", dataItem)
    if ((dataItem.action.type == "button" && dataItem.actionInfo.name == "Accept")) {
      this.producerActions(dataItem);
    } else if (dataItem.action.type == "button" && dataItem.actionInfo.name == "Reject") {
      this.producerActions(dataItem);
      // this.modifyService(dataItem.tableItem, 'DELETESERVICE');
    }
  }

  // modifyService(data, flag) {
  //   this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
  //     this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
  //       this._serviceModel.Flag = flag;
  //       this._serviceModel.Ref_User_ID = Ref_User_ID;
  //       this._serviceModel.Ref_Service_ID = data.Ref_Service_ID;
  //       this._serviceModel.Ref_Category_ID = data.Ref_Category_ID;
  //       this._serviceModel.ServiceTitle = data.CategoryName;
  //       this._serviceModel.Description = data.Description;
  //       this._serviceModel.CreatedName = FullName;
  //       this._serviceModel.AliasName = data.AliasName;
  //       debugger
  //       if (flag == 'MODIFYSERVICE') {
  //         this._base._router.navigate(['/admin/service/' + data.AliasName]);
  //       } else if (flag == 'DELETESERVICE') {
  //         $('#modal-deleteconfirmation').modal('show')
  //       }
  //     });
  //   });
  // }

  // removeService() {
  //   this._service.ManageService(this._serviceModel.Ref_Service_ID, 'delete').subscribe((response: any) => {
  //     if (response == 'SERVICEDELETE') {
  //       this._base._alertMessageService.success("Service deleted successfully!");
  //       this.serviceList.filter((res: any, index: number) => {
  //         if (res.Ref_Service_ID == this._serviceModel.Ref_Service_ID) {
  //           this.serviceList.splice(index, 1);
  //         }
  //       });
  //       this.tableConfig.tableData = this.serviceList
  //       this.tableObj.initializeTable()
  //     }
  //   }, error => {
  //     this._base._alertMessageService.error("Something went wrong !!");
  //   })
  // }

  // cancelService() {
  //   this._serviceModel.Flag = '';
  //   this._serviceModel.Ref_Category_ID = 0;
  //   this._serviceModel.ServiceTitle = '';
  //   this._serviceModel.AliasName = '';
  //   this._serviceModel.Description = '';
  // }

}