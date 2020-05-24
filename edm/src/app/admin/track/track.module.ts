// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrackListComponent } from './tracklist/tracklist.component';
import { AddModifyTrackComponent } from './addmodifytrack/addmodifytrack.component';
@NgModule({
    declarations: [
        TrackListComponent,
        AddModifyTrackComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: TrackListComponent
            },
            {
                path: 'addmodify',
                component: AddModifyTrackComponent
            }
        ]),
    ],
    providers: []
})
export class TrackModule { }
