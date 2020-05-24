import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-addmodifytrack',
  templateUrl: './addmodifytrack.component.html',
  styleUrls: ['./addmodifytrack.component.scss']
})
export class AddModifyTrackComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
