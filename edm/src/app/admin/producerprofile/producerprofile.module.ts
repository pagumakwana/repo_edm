import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProducerProfileComponent } from './producerprofile.component';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
import { ProfileUpdateService } from 'src/app/_appService/profileupdate/profileupdate.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
    declarations: [
        ProducerProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorModule,
        SelectDropDownModule,
        NgMultiSelectDropDownModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: ProducerProfileComponent
            }
        ]),
    ],
    providers: [ProfileUpdateService]
})
export class ProducerProfileModule { }
