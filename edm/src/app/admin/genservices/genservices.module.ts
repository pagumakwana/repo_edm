// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesListComponent } from './servicesslist/servicesslist.component';
import { AddModifyServicesComponent } from './addmodifyservices/addmodifyservices.component';
import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatablesModule } from 'src/app/commonmodule/datatables/datatables.module';
import { DragulaModule } from 'ng2-dragula';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
@NgModule({
    declarations: [
        ServicesListComponent,
        AddModifyServicesComponent
    ],
    imports: [
        CommonModule,
        AngularMyDatePickerModule,
        RouterModule.forChild([
            {
                path: '',
                component: ServicesListComponent
            },
            {
                path: ':slug',
                component: AddModifyServicesComponent
            }
        ]),
        ErrorModule,
        FormsModule,
        DatatablesModule,
        ReactiveFormsModule,
        DragulaModule.forRoot()
    ],
    providers: [GenService]
})
export class GenServiceModule { }
