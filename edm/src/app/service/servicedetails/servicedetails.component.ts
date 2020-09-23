import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiConstant } from 'src/app/_appModel/apiconstant';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CommonService } from 'src/app/_appService/common.service';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceDetailsComponent implements OnInit {
  ServiceID
  ServiceDetails
  public isCollapsed = false;
  constructor(public _base: BaseServiceHelper,
    public commonService: CommonService,
    public route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ServiceID = params['ServiceId'];
      this._base._ApiService.get(ApiConstant.customer.CustomServiceDetails + '?ServiceID='+ this.ServiceID).subscribe((res:any) => {
        this.ServiceDetails = res;
        this.ServiceDetails.map(item => {
          item.Thumbnail = item.ThumbnailImageUrl == undefined || item.ThumbnailImageUrl == null|| item.ThumbnailImageUrl == "" || item.ThumbnailImageUrl == "-"? '../../../assets/images/producer_profile.jpg' : this._base._commonService.cdnURL + item.ThumbnailImageUrl;
      })
    })
    })
  }

}
