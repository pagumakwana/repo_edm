import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { dataTableConfig, tableEvent } from 'src/app/commonmodule/datatables/datatables.modal';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { DatatablesComponent } from 'src/app/commonmodule/datatables/datatables.component';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { ServiceModel } from 'src/app/_appModel/genservices/service.model';
declare var $: any;

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
  serviceList = [];
  _serviceModel: ServiceModel = {};
  @ViewChild('dataTableCom', { static: false }) tableObj: DatatablesComponent;


  ngOnInit(): void {
    this._base._commonService.showLoader();
    this._base._pageTitleService.setTitle("Manage Service", "Manage Service");
    this.getService()
  }

  getService() {
    this._service.getService('ALL', '0').subscribe((res: any) => {
      this.serviceList = res
      this.tableConfig.tableData = this.serviceList
      this.tableObj.initializeTable()
      setTimeout(() => {
        this._base._commonService.hideLoader();
      }, 500);
    })
  }

  tableConfig: dataTableConfig = {
    tableData: [],
    tableConfig: [
      { identifer: "FileUrls", title: "Thumbnail", type: "image", dataType: { type: "array", path: ['0', 'FilePath'] }, size: { height: "100px", width: "100px" } },
      { identifer: "ServiceTitle", title: "ServiceTitle", type: "link" },
      { identifer: "Price", title: "Price", type: "text" },
      { identifer: "PriceWithProjectFiles", title: "PriceWithProjectFiles", type: "text" },
      { identifer: "Revision", title: "Revision", type: "text" },
      { identifer: "CreatedName", title: "CreatedBy", type: "text" },
      { identifer: "IsActive", title: "IsActive", type: "flag" },
      { identifer: "", title: "Action", type: "button", buttonList: [{ name: 'Edit', class: 'global_btn primary_btn', iconClass: 'delete_icon btn_icon' }, { name: 'Delete', class: 'global_btn icon_btn red_btn', iconClass: 'delete_icon btn_icon' }] }
    ]
  }

  tableClick(dataItem: tableEvent) {
    if (dataItem.action.type == 'link' || (dataItem.action.type == 'button' && dataItem.actionInfo.name == "Edit")) {
      this.modifyService(dataItem.tableItem, 'MODIFYSERVICE');
    } else if (dataItem.action.type == 'button' && dataItem.actionInfo.name == "Delete") {
      this.modifyService(dataItem.tableItem, 'DELETESERVICE');

    }
  }

  modifyService(data, flag) {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._serviceModel.Flag = flag;
        this._serviceModel.Ref_User_ID = Ref_User_ID;
        this._serviceModel.Ref_Category_ID = data.Ref_Category_ID;
        this._serviceModel.ServiceTitle = data.CategoryName;
        this._serviceModel.Description = data.Description;
        this._serviceModel.CreatedName = FullName;
        this._serviceModel.AliasName = data.AliasName;
        debugger
        if (flag == 'MODIFYSERVICE') {
          this._base._router.navigate(['/admin/service/' + data.AliasName]);
        } else if (flag == 'DELETESERVICE') {
          $('#modal-deleteconfirmation').modal('show')
        }
      });
    });
  }

  removeService() {
    this._service.addmodifyService(this._serviceModel).subscribe(response => {
      if (response == 'SERVICEDELETED') {
        this._base._alertMessageService.success("Service deleted successfully!");
        this.serviceList.filter((res: any, index: number) => {
          if (res.Ref_Service_ID === this._serviceModel.Ref_Service_ID) {
            this.serviceList.splice(index, 1);
          }
        });
      }
    }, error => {
      this._base._alertMessageService.error("Something went wrong !!");
    })
  }

  cancelService() {
    this._serviceModel.Flag = '';
    this._serviceModel.Ref_Category_ID = 0;
    this._serviceModel.ServiceTitle = '';
    this._serviceModel.AliasName = '';
    this._serviceModel.Description = '';
  }

}
