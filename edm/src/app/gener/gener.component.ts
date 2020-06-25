import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../_appModel/helpers';
import { generModel } from './_model/gener.model';

@Component({
  selector: 'app-gener',
  templateUrl: './gener.component.html',
  styleUrls: ['./gener.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GenerComponent implements OnInit {

  constructor() { }

  public generListData: any;
  _generModel: generModel = {};
  ngOnInit(): void {
    this.generList();
  }

  generList() {
    
  }

}
