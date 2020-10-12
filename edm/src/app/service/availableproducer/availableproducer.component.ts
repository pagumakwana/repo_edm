import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiConstant } from '../../_appModel/apiconstant';
import { enAppSession } from '../../_appModel/enAppSession';
import { BaseServiceHelper } from '../../_appService/baseHelper.service';
import { GenService } from '../../_appService/genservice/genservice.service';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
@Component({
  selector: 'app-availableproducer',
  templateUrl: './availableproducer.component.html',
  styleUrls: ['./availableproducer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AvailableProducerComponent implements OnInit {
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  public producerlist = [];
  public config: SwiperConfigInterface = {
      direction: 'horizontal',
      navigation: false,
      pagination: false,
      autoplay: false,
      centeredSlides: false,
      breakpoints: {
          501: {
              slidesPerView: 2,
              spaceBetween: 10,
          },
          701: {
              slidesPerView: 3,
              spaceBetween: 20,
          },
          951: {
              slidesPerView: 4,
              spaceBetween: 20,
          },
          1201: {
              slidesPerView: 5,
              spaceBetween: 50,
          },
      }
  };

  private scrollbar: SwiperScrollbarInterface = {
      el: '.swiper-scrollbar',
      hide: false,
      draggable: true
  };

  private pagination: SwiperPaginationInterface = {
      el: '.swiper-pagination',
      clickable: true,
      hideOnClick: false
  };
  ServiceID
  customServicelist
  producerDetails
  Servicelist
  bannerHeader = "AVAILABLE PRODUCER"
  bannerText = "For Custom Track"
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
          this.producerDetails.map(item => {
                 item.ProfilePhoto = item.ProfilePhoto == undefined || item.ProfilePhoto == null || item.ProfilePhoto == "" || item.ProfilePhoto == "-" ? '../../../assets/images/producer_profile.jpg' : this._base._commonService.cdnURL + item.ProfilePhoto;
               })
          //if()
          // this._base._ApiService.get(ApiConstant.customer.CustomServices + '?ProducersID=' + this.producerDetails[0].Ref_User_ID).subscribe((res: any) => {
          //   this.customServicelist = res;
         
          //   this.customServicelist.map(item => {
          //     item.active = false
          //     item.Thumbnail = item.Thumbnail == undefined || item.Thumbnail == null || item.Thumbnail == "" || item.Thumbnail == "-" ? '../../../assets/images/producer_profile.jpg' : this._base._commonService.cdnURL + item.Thumbnail;
          //   })
          //   this.selectTab(this.customServicelist[0].ServiceTitle)
          // })
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
  useraction(ObjectID, ObjectType, Action) {
    this._base._commonService.showLoader()
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        let ObjUseraction = {
            "UserID": Ref_User_ID,
            "ObjectID": ObjectID,
            "ObjectType": ObjectType,
            "Action": Action
        }
        this._base._ApiService.post(ApiConstant.Order.UserAction, ObjUseraction).subscribe((data: any) => {
            console.log(data)
            this.ngOnInit();
            this._base._commonService.hideLoader()
        }, e => {
            this._base._commonService.hideLoader()
        })
    })
}

navigateToProducer(producerObj) {
    console.log("navigateToProducer", producerObj)
    this._base._router.navigate(['profile', 'producer', producerObj.Ref_User_ID])
}
}
