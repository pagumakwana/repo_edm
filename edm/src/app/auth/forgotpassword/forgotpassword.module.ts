import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgotpassword.component';
@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ForgotPasswordComponent
            }
        ]),
    ],
    providers: []
})
export class ForgotPasswordModule { }
