import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartScreenComponent } from './cartscreen.component';
@NgModule({
    declarations: [
        CartScreenComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CartScreenComponent
            }
        ]),
    ],
    providers: []
})
export class CartScreenModule { }
