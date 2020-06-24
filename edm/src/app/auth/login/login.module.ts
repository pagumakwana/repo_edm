import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent
            }
        ]),
    ],
    providers: []
})
export class LoginModule { }
