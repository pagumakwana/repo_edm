import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-addmodifysupport',
  templateUrl: './addmodifysupport.component.html',
  styleUrls: ['./addmodifysupport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifySupportComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Ticket Support", "Ticket Support");
  }

 
}
