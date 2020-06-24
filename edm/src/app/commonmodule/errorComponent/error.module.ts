// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        ErrorComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [ErrorComponent],
    providers: []
})
export class ErrorModule { }
