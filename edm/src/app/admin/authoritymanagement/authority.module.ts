// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorityServices } from './_services/authority.services'
import { AuthorityListComponent } from './authoritylist.component';
import { AddModifyAuthorityComponent } from './addmodifyauthority/addmodifyauthority.component';
import { ErrorModule } from 'src/app/commonmodule/errorComponent/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AuthorityListComponent,
        AddModifyAuthorityComponent
    ],
    imports: [
        CommonModule,
        ErrorModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: AuthorityListComponent
            },
            {
                path: ':id',
                component: AddModifyAuthorityComponent
            },
        ]),
    ],
    providers: [AuthorityServices]
})
export class AuthorityModule { }
