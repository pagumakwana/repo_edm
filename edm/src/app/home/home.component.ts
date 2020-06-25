import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../_appModel/helpers';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { enAppSession } from '../_appModel/enAppSession';
import { RegisterService } from '../_appService/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
  
  }

 
}
