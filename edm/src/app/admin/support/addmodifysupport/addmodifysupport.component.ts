import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { SupportService } from "../../../_appService/support/support.service";
import { SupportTicketType } from "../../../_appModel/support/support.model";

@Component({
  selector: 'appAdmin-addmodifysupport',
  templateUrl: './addmodifysupport.component.html',
  styleUrls: ['./addmodifysupport.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifySupportComponent implements OnInit {

  public ticketType: any = [
    {Ref_TicketType_ID: 0, TicketType: "Select ticket Type"},
    {Ref_TicketType_ID: 1, TicketType: "Regarding Purchased Product"},
    {Ref_TicketType_ID: 2, TicketType: "Regarding Suggestions for new features"},
    {Ref_TicketType_ID: 3, TicketType: "Regarding User Account Details"},
    {Ref_TicketType_ID: 4, TicketType: "Report a bug on the website"},
    {Ref_TicketType_ID: 5, TicketType: "Technical Support"},
    {Ref_TicketType_ID: 6, TicketType: "Others"},
  ];

  constructor(
    public _base: BaseServiceHelper,
    private _supportService: SupportService
  ) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Ticket Support", "Ticket Support");
  }


}
