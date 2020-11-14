// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatatablesComponent } from './datatables.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        DatatablesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
        // RouterModule.forChild([
        //     {
        //         path: '',
        //         component: DatatablesComponent
        //     }
        // ]),
    ],
    exports: [DatatablesComponent],
    providers: []
})
export class DatatablesModule { }
