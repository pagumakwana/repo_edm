import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
    selector: 'app-bannerSlider',
    templateUrl: './bannerSlider.component.html',
    styleUrls: ['./bannerSlider.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BannerSliderComponent implements OnInit {
    @ViewChild(SwiperComponent) componentRef: SwiperComponent;
    constructor() { }
    public slides = [
        'First slide',
        'Second slide',
        'Third slide',
        'Fourth slide',
        'Fifth slide',
        'Sixth slide'
    ]; public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        pagination: true,
        autoplay: true,
        autoHeight: false,
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
    }

}
