import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishlistComponent } from './wishlist.component';
// import { CartService } from '../_appService/cart/cart.service';
@NgModule({
    declarations: [
        WishlistComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: WishlistComponent
            }
        ]),
    ],
    providers: []
})
export class WishlistModule { }
