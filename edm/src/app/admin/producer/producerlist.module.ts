// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { ServicesListComponent } from './servicesslist/servicesslist.component';
// import { AddModifyServicesComponent } from './addmodifyservices/addmodifyservices.component';
// import { GenService } from 'src/app/_appService/genservice/genservice.service';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatablesModule } from 'src/app/commonmodule/datatables/datatables.module';
import { DragulaModule } from 'ng2-dragula';
import { producerListComponent } from './producerlist/producerlist.component';
import { ProducerHomeComponent } from './producerhome/producerhome.component';
import { ProducerService } from 'src/app/_appService/producer/producer.serviec';

@NgModule({
    declarations: [
        // ServicesListComponent,
        // AddModifyServicesComponent
        producerListComponent,
        ProducerHomeComponent

    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: producerListComponent
            },
            {
                path: 'producerhome',
                component: ProducerHomeComponent
            },
            // {
            //     path: ':slug',
            //     component: AddModifyServicesComponent
            // }
        ]),
        ErrorModule,
        FormsModule,
        DatatablesModule,
        ReactiveFormsModule,
        // DragulaModule.forRoot()
    ],
    providers: [ProducerService]
})
export class ProducerModule { }
