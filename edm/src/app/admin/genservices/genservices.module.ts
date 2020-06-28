// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesListComponent } from './servicesslist/servicesslist.component';
import { AddModifyServicesComponent } from './addmodifyservices/addmodifyservices.component';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        ServicesListComponent,
        AddModifyServicesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ServicesListComponent
            },
            {
                path: ':Ref_Service_ID',
                component: AddModifyServicesComponent
            }
        ]),
        ErrorModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [GenService]
})
export class GenServiceModule { }
