import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartScreenComponent } from './cartscreen.component';
import { CartService } from '../_appService/cart/cart.service';
@NgModule({
    declarations: [
        CartScreenComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CartScreenComponent
            }
        ]),
    ],
    providers: [CartService]
})
export class CartScreenModule { }
