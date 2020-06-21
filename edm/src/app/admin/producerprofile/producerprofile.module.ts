import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProducerProfileComponent } from './producerprofile.component';
@NgModule({
    declarations: [
        ProducerProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProducerProfileComponent
            }
        ]),
    ],
    providers: []
})
export class ProducerProfileModule { }
