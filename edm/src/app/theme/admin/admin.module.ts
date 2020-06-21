// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminBodyComponent } from './body/body.component';
import { AdminHeaderComponent } from './header/header.component';
import { AdminFooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin.component';
@NgModule({
    declarations: [
        AdminComponent,
        AdminBodyComponent,
        AdminHeaderComponent,
        AdminFooterComponent,
    ],
    imports: [
        RouterModule,
        CommonModule
        // DashboardModule,
        // GenersModule,
        // BeatsModule,
        // TrackModule,
        // CoupanModule,
        // MastersModule
    ],
    providers: []
})
export class AdminModule { }
