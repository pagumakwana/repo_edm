import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiConstant } from '../../_appModel/apiconstant';
import { enAppSession } from '../../_appModel/enAppSession';
import { BaseServiceHelper } from '../../_appService/baseHelper.service';
import { GenService } from '../../_appService/genservice/genservice.service';
@Component({
  selector: 'app-availableproducer',
  templateUrl: './availableproducer.component.html',
  styleUrls: ['./availableproducer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AvailableProducerComponent implements OnInit {
  ServiceID
  customServicelist
  producerDetails
  Servicelist
  bannerHeader
  bannerText
  public isCollapsed = false;
  constructor(public _base: BaseServiceHelper,
    public route: ActivatedRoute,
    public _genService: GenService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ServiceID = params['ServiceId'];
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        this._base._ApiService.get(ApiConstant.customer.AvailableProducers + '?UserID=' + Ref_User_ID + '&ServiceID=' + this.ServiceID + '&StartCount=0&EndCount=5').subscribe((res: any) => {
          this.producerDetails = res;
          //if()
          this._base._ApiService.get(ApiConstant.customer.CustomServices + '?ProducersID=' + this.producerDetails[0].Ref_User_ID).subscribe((res: any) => {
            this.customServicelist = res;
         
            this.customServicelist.map(item => {
              item.active = false
              item.Thumbnail = item.Thumbnail == undefined || item.Thumbnail == null || item.Thumbnail == "" || item.Thumbnail == "-" ? '../../../assets/images/producer_profile.jpg' : this._base._commonService.cdnURL + item.Thumbnail;
            })
            this.selectTab(this.customServicelist[0].ServiceTitle)
          })
        })
      })
    })
  }
  selectTab(service) {
    console.log(service)
    this.customServicelist.map(item => {
      item.active = false
      if (service == item.ServiceTitle)
        item.active = true
    })
    if(service.replace(" ", "").toUpperCase() == 'GLOBALPRODUCTION'){
      this.bannerHeader = "AVAILABLE PRODUCER"
      this.bannerText = "For Custom Track"
    }
    if(service.replace(" ", "").toUpperCase() == 'ARTISTBRANDING'){
      this.bannerHeader = "SERVICES"
      this.bannerText = ""
    }
    this._genService.getServiceByCategory(0, 10, service.replace(" ", "").toUpperCase()).subscribe((data: any) => {
      this.Servicelist = data;
      this.Servicelist.map(item => {
      item.Thumbnail = item.Thumbnail == undefined || item.Thumbnail == null || item.Thumbnail == "" || item.Thumbnail == "-" ? '../../../assets/images/producer_profile.jpg' : this._base._commonService.cdnURL + item.Thumbnail;
    })
  })
  }
}
