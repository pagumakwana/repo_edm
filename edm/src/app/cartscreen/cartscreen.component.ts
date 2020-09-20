import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartscreen',
  templateUrl: './cartscreen.component.html',
  styleUrls: ['./cartscreen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartScreenComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    public router: Router) { }
  ngOnInit(): void {

  }

}
