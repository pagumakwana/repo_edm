import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceDetailsComponent } from './servicedetails/servicedetails.component';
import { ServiceComponent } from './service.component';
import { AccordionComponent } from './../commonmodule/accordion/accordion.component';
import { AccordionGroupComponent } from './../commonmodule/accordion/accordion-group.component';
import {AvailableProducerComponent} from './availableproducer/availableproducer.component';
import {
    SwiperModule, SwiperConfigInterface,
    SWIPER_CONFIG
} from 'ngx-swiper-wrapper';
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
        ServiceComponent,
        ServiceDetailsComponent,
        AvailableProducerComponent,
        AccordionGroupComponent , AccordionComponent,//ProducerSliderComponent
    ],
    imports: [
        CommonModule,
        SwiperModule,
        RouterModule.forChild([
            {
                path: '',
                component: ServiceComponent
            },
            {
                path: 'details/:ServiceId',
                component: ServiceDetailsComponent
            },
            {
                path: 'availableProducer/:ServiceId',
                component: AvailableProducerComponent
            }
        ]),
    ],
    providers: [ {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    },]
})
export class ServiceModule { }
