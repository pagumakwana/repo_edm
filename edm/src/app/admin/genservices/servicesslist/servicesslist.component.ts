import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-servicesslist',
  templateUrl: './servicesslist.component.html',
  styleUrls: ['./servicesslist.component.scss']
})
export class ServicesListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Service Management", "Service Management");
  }

 
}
