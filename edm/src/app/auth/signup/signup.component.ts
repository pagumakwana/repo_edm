import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { userModel } from 'src/app/_appModel/customer.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { RegisterService } from 'src/app/_appService/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(
    private _base: BaseServiceHelper,
    private fb: FormBuilder,
    public _registerService: RegisterService) { }
  _userModel: userModel = {};

  formSignup: FormGroup = this.fb.group({
    FullName: ['', [Validators.required]],
    EmailID: ['', [Validators.required]],
    Password: ['', [Validators.required]]
  })


  ngOnInit(): void {
  }
  signIn() {
    this._base._commonService.navigation('login');
  }

  setSignupModel() {
    this._base._commonService.markFormGroupTouched(this.formSignup);
    if (this.formSignup.valid) {
      this._userModel.FullName = this.formSignup.value.FullName;
      this._userModel.EmailID = this.formSignup.value.EmailID;
      this._userModel.Password = this.formSignup.value.Password;
      this._userModel.CreatedName = this.formSignup.value.FullName;
      this.register();
    }
  }
  register() {
    this._registerService.registerCustomer(this._userModel).subscribe((response: any) => {
      if (response == 'USERADDEDSUCCESS') {
        this._registerService.loginCustomer(this._userModel).subscribe(res => {
          if (res[0].ResponseMessage == 'USERSIGNINSUCCESS') {
            let responseData = res[0];
            this._base._appSessionService.setUserSession(responseData).subscribe((res) => {
              if (res)
                this._base._router.navigate(['/']);
            });
            // this._communicationModel = {
            //   Recipients: responseData.Email,
            //   TemplateSelector: 'WELCOME_EMAIL',
            //   KeyValues: 'STORE_NAME|PickPro,CUSTOMER_NAME|' + responseData.FullName + ',STORE_EMAIL|info@webdroids.in'
            // }
            // this._communication.sendWelcomeMail(this._communicationModel).subscribe((res: any) => {
            // })
          }
        });
      } else if (response == 'USERALREADYEXISTS') {
      }
    });
  }
  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
