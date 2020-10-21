import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userModel } from 'src/app/_appModel/customer.model';
import { RegisterService } from 'src/app/_appService/register.service';
import { enAppSession } from 'src/app/_appModel/enAppSession';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  constructor(private _base: BaseServiceHelper,
    private _fb: FormBuilder,
    public _registerService: RegisterService,
    public OAuth: AuthService,) { }

  _userModel: userModel = {};
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordRegEx = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
  showPassword: boolean = false;

  formSignIn: FormGroup = this._fb.group({
    User_Code: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
    Password: ['', [Validators.required, Validators.pattern(this.passwordRegEx)]],
    rememberMe: false
  });

  setSignInModel() {
    this._base._commonService.markFormGroupTouched(this.formSignIn);
    if (this.formSignIn.valid) {
      this._userModel.IsSocialLogin = false;
      this._userModel.User_Code = this.formSignIn.value.User_Code;
      this._userModel.Password = this.formSignIn.value.Password;
      this._userModel.IsRemember = this.formSignIn.value.rememberMe;
      this.signIn();
    }
  }

  signIn() {
    localStorage.removeItem('User_Code');
    localStorage.removeItem('Password');
    localStorage.removeItem('RememberMe');
    this._registerService.loginCustomer(this._userModel).subscribe((resData: any) => {
      if (resData[0].Response == 'USERSIGNINSUCCESS') {
        if (this._userModel.IsRemember) {
          localStorage.setItem('User_Code', this._userModel.User_Code);
          localStorage.setItem('Password', this._userModel.Password);
          localStorage.setItem('RememberMe', JSON.stringify(this._userModel.IsRemember));
        }
        let responseData = resData[0];
        this._base._appSessionService.setUserSession(responseData).subscribe((res) => {
          if (res) {
            this._base._commonService.setHasLoginSubscribe.next(true);
            this._base._router.navigate(['/']);
          }
        });
      }
      else if (resData[0].Response == 'USERSIGNINFAILED') {
        this._base._alertMessageService.error("Invalid EmailID / Password.");
        // this.formSignIn.reset();
      }
    });
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('RememberMe')) !== null) {
      this.formSignIn.controls.User_Code.setValue(localStorage.getItem('User_Code'));
      this.formSignIn.controls.Password.setValue(localStorage.getItem('Password'));
      this.formSignIn.controls.rememberMe.setValue(localStorage.getItem('RememberMe'));
    }
  }

  signUp() {
    this._base._commonService.navigation('signup');
  }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      this.register(socialusers);
    }, e => {
    });
  }

  register(data) {
    this._userModel.CreatedName = data.name;
    this._userModel.EmailID = data.email;
    this._userModel.FullName = data.name;
    this._userModel.Profile_Photo = data.photoUrl;
    this._userModel.IsSocialLogin = true;
    this._registerService.registerCustomer(this._userModel).subscribe(response => {
      this._registerService.loginCustomer(this._userModel).subscribe(res => {
        if (res[0].Response == 'USERSIGNUP') {
          let responseData = res[0];
          // this._base._CommonService.showAlert("Registered success!", false);
          this._base._appSessionService.setUserSession(responseData);
          // this._communicationModel = {
          //   Recipients: responseData.Email,
          //   TemplateSelector: 'WELCOME_EMAIL',
          //   KeyValues: 'STORE_NAME|PickPro,CUSTOMER_NAME|' + responseData.FullName + ',STORE_EMAIL|info@webdroids.in'
          // }
          // this._communication.sendWelcomeMail(this._communicationModel).subscribe((res: any) => {
          // })
          setTimeout(() => {
            this._base._commonService.setHasLoginSubscribe.next(true)
            this._base._commonService.navigation('/');
            //this._events.publish('user:signedIn', responseData);
          }, 500);
        } else {
          // this._base._vibration.vibrate(100);
          // this._base._CommonService.showAlert("Please try after sometime!", false);
        }
      });
    });
  }

  forgotPassword() {
    this._base._router.navigate(['forgotpassword']);
  }

  show_Password() {
    if (this.showPassword == false) {
      this.showPassword = true;
    }
    else {
      this.showPassword = false;
    }
  }
}
