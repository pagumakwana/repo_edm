import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiConstant } from '../_appModel/apiconstant';
import { BaseServiceHelper } from '../_appService/baseHelper.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss','../home/home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent implements OnInit {

  Servicelist = [];
  globalSearch = "";
  globalSearchData
  constructor(public _base: BaseServiceHelper) { }
  ngOnInit(): void {
    this.getServicelist()
  }
  getServicelist(){
    this._base._ApiService.get(ApiConstant.customer.ServiceList + '?StartCount=0&EndCount=5').subscribe((res:any) => {
        this.Servicelist = res;
        this.Servicelist.map(item => {
          item.Thumbnail = item.Thumbnail == undefined || item.Thumbnail == null|| item.Thumbnail == "" || item.Thumbnail == "-"? '../../../assets/images/producer_profile.jpg' : this._base._commonService.cdnURL + item.Thumbnail;
      })
    })
  }
}
