import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-addmodifymaster',
  templateUrl: './addmodifymaster.component.html',
  styleUrls: ['./addmodifymaster.component.scss']
})
export class AddModifyMasterComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
