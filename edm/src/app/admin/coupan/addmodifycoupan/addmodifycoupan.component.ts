import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-addmodifycoupan',
  templateUrl: './addmodifycoupan.component.html',
  styleUrls: ['./addmodifycoupan.component.scss']
})
export class AddModifyCoupanComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
