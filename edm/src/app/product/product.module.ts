// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './productdetails/productdetails.component';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../widgets/widget.module';
import { Ng5SliderModule } from 'ng5-slider';
import {
    SwiperModule, SwiperConfigInterface,
    SWIPER_CONFIG
} from 'ngx-swiper-wrapper'
import { ProfileUpdateService } from '../_appService/profileupdate/profileupdate.service';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    threshold: 50,
    spaceBetween: 5,
    slidesPerView: 1,
    centeredSlides: true
};
@NgModule({
    declarations: [
        ProductComponent,
        ProductDetailsComponent
    ],
    imports: [        
        CommonModule,        
        WidgetsModule,
        Ng5SliderModule,
        SwiperModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProductComponent
            },
            {
                path: 'details/:ID',
                component: ProductDetailsComponent
            }
        ]),
    ],
    providers: [ {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    },
    ProfileUpdateService],
    bootstrap:    [ ProductComponent ]
})
export class ProductModule { }
