// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './productdetails/productdetails.component';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../widgets/widget.module';
import { Ng5SliderModule } from 'ng5-slider';
@NgModule({
    declarations: [
        ProductComponent,
        ProductDetailsComponent
    ],
    imports: [        
        CommonModule,        
        WidgetsModule,
        Ng5SliderModule,
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
    providers: [],
    bootstrap:    [ ProductComponent ]
})
export class ProductModule { }
