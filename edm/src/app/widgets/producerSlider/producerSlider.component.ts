import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../_appService/baseHelper.service';
import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ApiConstant } from './../../_appModel/apiconstant';
import { enAppSession } from 'src/app/_appModel/enAppSession';
@Component({
    selector: 'app-producerSlider',
    templateUrl: './producerSlider.component.html',
    styleUrls: ['../featuredProductSlider/featuredProductSlider.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProducerSliderComponent implements OnInit {
    @ViewChild(SwiperComponent) componentRef: SwiperComponent;
    constructor(public _base: BaseServiceHelper) { }
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
    ngOnInit(): void {
        this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
            this._base._ApiService.get(ApiConstant.customer.Producers + '?UserID=' + Ref_User_ID + '&StartCount=0&EndCount=5').subscribe((data: any) => {
                this.producerlist = data;
                this.producerlist.map(item => {
                    item.ProfilePhoto = this._base._commonService.cdnURL + item.ProfilePhoto;
                })
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
