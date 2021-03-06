import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/_appService/register.service';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorModule,
        RouterModule.forChild([
            {
                path: '',
                component: SignupComponent
            }
        ]),

    ],
    providers: []
})
export class SignUpModule { }
