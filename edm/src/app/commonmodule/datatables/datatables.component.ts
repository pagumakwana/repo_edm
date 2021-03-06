import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Helpers } from '../../_appModel/helpers';
import { BaseServiceHelper } from '../../_appService/baseHelper.service';
import { dataTableConfig, tableEvent } from './datatables.modal';
// import { RegisterService } from '../_appService/register.service';
declare var $;

@Component({
  selector: 'com-datatable',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatatablesComponent implements OnInit {

  @Input() config: dataTableConfig
  @Output() tableEvent = new EventEmitter();
  @ViewChild('dataTable', { static: true }) table: ElementRef;
  dataTable: any;
  imageBaseUrl: string = this._base._commonService.cdnURL
  ishide: boolean = true
  tableData: Array<any> = null
  isCheckAll = false

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    console.log("inside_table", this.config)
  }

  checkBoxSetup() {
    if (this.config.showCheckBox) {
      this.tableData.map(item => {
        return item.isChecked_DataTable = this.isCheckAll
      })
    }
  }

  checkALlItems(event) {
    console.log("checkALlItems", event)
    for (let item of this.tableData) {
      item.isChecked_DataTable = event.target.checked
    }
    this.tableClick(undefined, 'checkedBox')
  }



  initializeTable() {
    this.tableData = null
    let data = Array.isArray(this.config.tableData) ? this.config.tableData : []
    this.tableData = JSON.parse(JSON.stringify(data))
    if (this.dataTable) {
      this.dataTable.DataTable().clear().destroy();
    }
    setTimeout(() => {
      this.checkBoxSetup()
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable();
      this.ishide = false
      console.log("inside_table_debugger", this.config)
    }, 500);
  }

  getNestedObject(data: Array<any> | object, path: Array<string>) {
    path.forEach(function (key) {
      data = data && data[key] ? data[key] : '';
    });
    return data;
  }

  tableClick(tableItem, action, actionInfo?) {
    setTimeout(() => {
      let checkedItems = this.tableData.filter(item => item.isChecked_DataTable)
      let emitData: tableEvent = {
        tableItem: tableItem,
        action: action,
        actionInfo: actionInfo,
        checkedData: checkedItems
      }
      this.isCheckAll = checkedItems.length == this.tableData.length
      this.tableEvent.emit(emitData)
    }, 50);
  }

  validateCondition(condition, record) {
    console.log(condition, record)
    let valid: boolean = true
    if (condition.type == "logic") {
      valid = record[condition.key] ? record[condition.key] == condition.value : true
    }
    return valid
  }



}
