// import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddModifyTrackComponent } from './addmodifytrack.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
@NgModule({
    declarations: [
        AddModifyTrackComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorModule,
        RouterModule.forChild([
            {
                path: '',
                component: AddModifyTrackComponent
            }
        ]),
    ],
    providers: []
})
export class AddModifyTrackModule { }
