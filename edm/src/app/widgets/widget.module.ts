// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSliderComponent } from './bannerSlider/bannerSlider.component';
import { WidgetsService } from './_service/widget.service';
import {
    SwiperModule, SwiperConfigInterface,
    SWIPER_CONFIG
} from 'ngx-swiper-wrapper';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturedProductSliderComponent } from './featuredProductSlider/featuredProductSlider.component';
import { ProducerSliderComponent } from './producerSlider/producerSlider.component';
import { TrackService } from '../_appService/trackService';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    threshold: 50,
    spaceBetween: 5,
    slidesPerView: 1,
    centeredSlides: true
};

@NgModule({

    imports: [
        CommonModule,
        SwiperModule,
    ],
    declarations: [
        BannerSliderComponent,
        FeaturedProductSliderComponent,
        ProducerSliderComponent
    ],
    exports: [
        BannerSliderComponent,
        FeaturedProductSliderComponent,
        ProducerSliderComponent
    ],
    providers: [
        WidgetsService,
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }, TrackService]
})
export class WidgetsModule { }
