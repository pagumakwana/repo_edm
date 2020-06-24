import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { enAppSession } from 'src/app/_appModel/enAppSession';

@Component({
  selector: 'appAdmin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private _base: BaseServiceHelper) { }
  hasLogin: boolean = false;
  public FullName: string = '';
  public Ref_User_ID: number = 0;
  public EmailID: string = '';
  public ProfilePic: string = '';
  ngOnInit(): void {
    // this._base._encryptedStorage.get(enAppSession.HasLogin).then(HasLogin => {
    //   this.hasLogin = HasLogin;
    //   this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
    //     this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
    //       this._base._encryptedStorage.get(enAppSession.EmailID).then(EmailID => {
    //         this._base._encryptedStorage.get(enAppSession.ProfilePic).then(ProfilePic => {
    //           this.FullName = FullName;
    //           this.Ref_User_ID = Ref_User_ID;
    //           this.EmailID = EmailID;
    //           this.ProfilePic = ProfilePic;
    //         });
    //       });
    //     });
    //   });
    // });
  }

  logOut() {
    this._base._appSessionService.clearUserSession();
    setTimeout(() => {
      this._base._commonService.navigation('/home');
    }, 500);
  }

}
