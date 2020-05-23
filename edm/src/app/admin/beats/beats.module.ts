// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BeatsListComponent } from './beatslist/beatslist.component';
import { AddModifyBeatsComponent } from './addmodifybeats/addmodifybeats.component';
@NgModule({
    declarations: [
        BeatsListComponent,
        AddModifyBeatsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: BeatsListComponent
            },
            {
                path: 'addmodify',
                component: AddModifyBeatsComponent
            }
        ]),
    ],
    providers: []
})
export class BeatsModule { }
