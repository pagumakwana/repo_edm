// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmailNotificationComponent } from './emailnotification.component';
@NgModule({
    declarations: [
        EmailNotificationComponent,
    ],
    imports: [        
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: EmailNotificationComponent
            }
        ]),
    ],
    providers: []
})
export class EmailNotificationModule { }
