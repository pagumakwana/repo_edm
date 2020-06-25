import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-masterlist',
  templateUrl: './masterlist.component.html',
  styleUrls: ['./masterlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MasterListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
