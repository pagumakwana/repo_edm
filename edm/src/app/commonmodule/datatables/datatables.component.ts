import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Helpers } from '../../_appModel/helpers';
import { BaseServiceHelper } from '../../_appService/baseHelper.service';
import { enAppSession } from '../../_appModel/enAppSession';
import { dataTableConfig, tableEvent } from './datatables.modal';
import { environment } from 'src/environments/environment.prod';
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
  imageBaseUrl: string = environment.imageURL
  ishide: boolean = true

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    console.log("inside_table", this.config)
  }

  initializeTable() {
    setTimeout(() => {
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable();
      this.ishide = false
    }, 500);
  }

  tableClick(tableItem, action, actionInfo?) {
    let emitData: tableEvent = {
      tableItem: tableItem,
      action: action,
      actionInfo: actionInfo
    }
    this.tableEvent.emit(emitData)
  }


}
