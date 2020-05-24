import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-masterlist',
  templateUrl: './masterlist.component.html',
  styleUrls: ['./masterlist.component.scss']
})
export class MasterListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
