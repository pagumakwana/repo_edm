import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-coupanlist',
  templateUrl: './coupanlist.component.html',
  styleUrls: ['./coupanlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoupanListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("ALL COUPAN CODE", "ALL COUPAN CODE");
  }


}
