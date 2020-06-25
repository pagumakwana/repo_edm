import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['../login/login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {

    constructor(private _base: BaseServiceHelper) { }
    ngOnInit(): void {
    }

}
