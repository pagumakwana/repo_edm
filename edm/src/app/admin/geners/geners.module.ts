// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddModifyGenersComponent } from './addmodifygener/addmodifygener.component';
import { GenerListComponent } from './generlist/generlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextEditorModule } from 'src/app/commonmodule/texteditor/texteditor.module';
import { DatatablesModule } from 'src/app/commonmodule/datatables/datatables.module';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
@NgModule({
    declarations: [
        GenerListComponent,
        AddModifyGenersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DatatablesModule,
        ErrorModule,
        RouterModule.forChild([
            {
                path: '',
                component: GenerListComponent
            },
            {
                path: ':slug',
                component: AddModifyGenersComponent
            }
        ]),
        // TextEditorModule
    ],
    providers: []
})
export class GenersModule { }
