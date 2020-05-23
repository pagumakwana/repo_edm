import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-addmodifybeats',
  templateUrl: './addmodifybeats.component.html',
  styleUrls: ['./addmodifybeats.component.scss']
})
export class AddModifyBeatsComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
