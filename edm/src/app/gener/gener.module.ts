import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerComponent } from './gener.component';
import { GenerDetailsComponent } from './generdetails/generdetails.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        GenerComponent,
        GenerDetailsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: GenerComponent
            },
            {
                path: 'details',
                component: GenerDetailsComponent
            }
        ]),
    ],
    providers: []
})
export class GenerModule { }
