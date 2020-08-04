import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-supportlist',
  templateUrl: './supportlist.component.html',
  styleUrls: ['./supportlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SupportListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Manage Support ticket", "Manage Support ticket");
  }


}
