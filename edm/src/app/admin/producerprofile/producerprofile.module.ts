import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProducerProfileComponent } from './producerprofile.component';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
@NgModule({
    declarations: [
        ProducerProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorModule,
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
