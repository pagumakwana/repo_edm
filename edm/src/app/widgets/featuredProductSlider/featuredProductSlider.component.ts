import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../_appService/baseHelper.service';
import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ApiConstant } from './../../_appModel/apiconstant';
import { Router } from '@angular/router';
import { TrackService } from 'src/app/_appService/trackService';

@Component({
    selector: 'app-featuredProductSlider',
    templateUrl: './featuredProductSlider.component.html',
    styleUrls: ['./featuredProductSlider.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FeaturedProductSliderComponent implements OnInit {
    @ViewChild(SwiperComponent) componentRef: SwiperComponent;
    constructor(public _base: BaseServiceHelper,
        private _trackService: TrackService,
        public router: Router) { }
    public featuredTrack: any = [];
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
        this._trackService.getFeaturedTrack().subscribe((data: any) => {
            this.featuredTrack = data.filter(a => a.IsTrack == 'Track');
        })
    }
    redirect(id) {
        this.router.navigate(['product/details', id]).then((e) => {
            if (e) {
                console.log("Navigation is successful!");
            } else {
                console.log("Navigation has failed!");
            }
        });
    }

}
