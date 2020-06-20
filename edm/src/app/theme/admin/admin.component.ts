import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-adminbody',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,) { }

  ngOnInit(): void {
  }

}
