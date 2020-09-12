import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';

@Component({
  selector: 'appAdmin-emailnotification',
  templateUrl: './emailnotification.component.html',
  styleUrls: ['./emailnotification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailNotificationComponent implements OnInit {

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Email Notification", "Email Notification");
  }

}
