import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-addmodifymasterdata',
  templateUrl: './addmodifymasterdata.component.html',
  styleUrls: ['./addmodifymasterdata.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifyMasterDataComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
