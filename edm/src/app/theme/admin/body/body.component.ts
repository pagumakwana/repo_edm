import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class AdminBodyComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,) { }

  ngOnInit(): void {
  }

}
