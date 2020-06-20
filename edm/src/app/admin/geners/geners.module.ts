// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddModifyGenersComponent } from './addmodifygener/addmodifygener.component';
import { GenerListComponent } from './generlist/generlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        GenerListComponent,
        AddModifyGenersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: GenerListComponent
            },
            {
                path: ':ref_category_id',
                component: AddModifyGenersComponent
            }
        ]),
    ],
    providers: []
})
export class GenersModule { }
