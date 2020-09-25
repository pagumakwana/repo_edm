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
    public OAuth: AuthService, ) { }

  _userModel: userModel = {};

  formSignIn: FormGroup = this._fb.group({
    User_Code: ['', [Validators.required]],
    Password: ['', [Validators.required]]
  })
  showPassword: boolean = false;

  setSignInModel() {
    this._base._commonService.markFormGroupTouched(this.formSignIn);
    if (this.formSignIn.valid) {
      this._userModel.IsSocialLogin = false;
      this._userModel.User_Code = this.formSignIn.value.User_Code;
      this._userModel.Password = this.formSignIn.value.Password;
      this.signIn();
    }
  }

  signIn() {
    this._registerService.loginCustomer(this._userModel).subscribe((resData: any) => {
      if (resData[0].Response == 'USERSIGNINSUCCESS') {
        let responseData = resData[0];
        this._base._appSessionService.setUserSession(responseData).subscribe((res) => {
          if (res) {
            this._base._commonService.setHasLoginSubscribe.next(true);
            this._base._router.navigate(['/']);
          }
        });
      } else {
      }
    });
  }

  ngOnInit(): void {
  }
  signUp() {
    this._base._commonService.navigation('signup');
  }
  public socialSignIn(socialProvider: string) {
    debugger;
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      // console.log(socialProvider, socialusers);  
      console.log(socialusers);
      console.log(socialusers.email)
      console.log(socialusers.name)
      console.log(socialusers.photoUrl)
      this.register(socialusers);
    }, e => {
      console.log(e);
    });
  }

  register(data) {
    debugger
    this._userModel.CreatedName = data.name;
    this._userModel.EmailID = data.email;
    this._userModel.FullName = data.name;
    this._userModel.Profile_Photo = data.photoUrl;
    this._userModel.IsSocialLogin = true;
    this._registerService.registerCustomer(this._userModel).subscribe(response => {
      this._registerService.loginCustomer(this._userModel).subscribe(res => {
        debugger
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
    if(this.showPassword == false){
      this.showPassword = true;
    }
    else{
      this.showPassword = false;
    }
  }
}
