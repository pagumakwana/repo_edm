import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-coupanlist',
  templateUrl: './coupanlist.component.html',
  styleUrls: ['./coupanlist.component.scss']
})
export class CoupanListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Manage Coupan", "Manage Coupan");
  }


}
