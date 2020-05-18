import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _base: BaseServiceHelper,
    public OAuth: AuthService, ) { }

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
    },e=>{
      console.log(e);
    });  
  } 
}
