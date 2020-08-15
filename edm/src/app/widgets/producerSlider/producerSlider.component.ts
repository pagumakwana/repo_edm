import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../_appService/baseHelper.service';
import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ApiConstant } from './../../_appModel/apiconstant';
@Component({
    selector: 'app-producerSlider',
    templateUrl: './producerSlider.component.html',
    styleUrls: ['../featuredProductSlider/featuredProductSlider.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProducerSliderComponent implements OnInit {
    @ViewChild(SwiperComponent) componentRef: SwiperComponent;
    constructor(public _base: BaseServiceHelper) { }
    public slides = []; 
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
        this._base._ApiService.post(ApiConstant.customer.Producers+ '?StartCount=0&EndCount=5').subscribe((data: any) => {
            this.slides = data;
            this.slides.map(item => {
                item.ProfilePhoto = this._base._commonService.cdnURL + item.ProfilePhoto;
              })
        })
    }

}
