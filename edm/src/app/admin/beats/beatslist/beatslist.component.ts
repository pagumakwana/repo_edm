import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-beatslist',
  templateUrl: './beatslist.component.html',
  styleUrls: ['./beatslist.component.scss']
})
export class BeatsListComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
