// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrackListComponent } from './tracklist/tracklist.component';
//import { AddModifyTrackComponent } from './addmodifytrack/addmodifytrack.component';
import * as bootstrap from "bootstrap"
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        TrackListComponent,
       // AddModifyTrackComponent
    ],
    imports: [
        CommonModule,
        ErrorModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: TrackListComponent
            },
            // {
            //     path: 'addmodify',
            //     component: AddModifyTrackComponent
            // }
        ]),
    ],
    providers: []
})
export class TrackModule { }
