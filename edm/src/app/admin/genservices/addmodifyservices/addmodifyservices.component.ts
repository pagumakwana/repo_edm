import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-addmodifyservices',
  templateUrl: './addmodifyservices.component.html',
  styleUrls: ['./addmodifyservices.component.scss']
})
export class AddModifyServicesComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
