import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceDetailsComponent } from './servicedetails/servicedetails.component';
import { ServiceComponent } from './service.component';
import { AccordionComponent } from './../commonmodule/accordion/accordion.component';
import { AccordionGroupComponent } from './../commonmodule/accordion/accordion-group.component';
import {AvailableProducerComponent} from './availableproducer/availableproducer.component'
@NgModule({
    declarations: [
        ServiceComponent,
        ServiceDetailsComponent,
        AvailableProducerComponent,
        AccordionGroupComponent , AccordionComponent
    ],
    imports: [
        CommonModule,
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
    providers: []
})
export class ServiceModule { }
