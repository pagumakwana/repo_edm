import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['../login/login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {
    screenSwitch: any = "Authenticate";
    constructor(private _base: BaseServiceHelper) { }
    ngOnInit(): void {
    }

    public changeScreen(flag: any) {
        if(flag == "OTP")
            this.screenSwitch = "OTP";
        else if(flag == "Reset")
            this.screenSwitch = "Reset";
    }
}
