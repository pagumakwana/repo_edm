import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-masterdatalist',
  templateUrl: './masterdatalist.component.html',
  styleUrls: ['./masterdatalist.component.scss']
})
export class MasterDataListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
