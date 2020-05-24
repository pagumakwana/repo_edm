// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminBodyComponent } from './body/body.component';
import { AdminHeaderComponent } from './header/header.component';
import { AdminFooterComponent } from './footer/footer.component';
import { DashboardModule } from 'src/app/admin/dashboard/dashboard.module';
import { GenersModule } from 'src/app/admin/geners/geners.module';
import { AdminComponent } from './admin.component';
import { BeatsModule } from 'src/app/admin/beats/beats.module';
import { TrackModule } from 'src/app/admin/track/track.module';
import { CoupanModule } from 'src/app/admin/coupan/coupan.module';
import { MastersModule } from 'src/app/admin/masters/masters.module';
@NgModule({
    declarations: [
        AdminComponent,
        AdminBodyComponent,
        AdminHeaderComponent,
        AdminFooterComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        DashboardModule,
        GenersModule,
        BeatsModule,
        TrackModule,
        CoupanModule,
        MastersModule
    ],
    providers: []
})
export class AdminModule { }
