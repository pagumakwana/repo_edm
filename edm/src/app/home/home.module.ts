// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { WidgetsModule } from '../widgets/widget.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenService } from '../_appService/genservice/genservice.service';
@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [        
        CommonModule,
        WidgetsModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent
            }
        ]),
    ],
    providers: [GenService]
})
export class HomeModule { }
