import { Component, ViewEncapsulation } from '@angular/core';
import { Helpers } from './_appModel/helpers';
import { enAppSession } from './_appModel/enAppSession';
import { BaseServiceHelper } from './_appService/baseHelper.service';
import { RegisterService } from './_appService/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'edm';
  constructor(public _base: BaseServiceHelper,
    private _register: RegisterService) { }

  ngOnInit(): void {
    // this._base._encryptedStorage.get(enAppSession.IsGuestUser).then(IsGuestUser => {
    //   if (!IsGuestUser) {
    //     this.registerGuest();
    //   }

    // });
  }
  // registerGuest() {
  //   Helpers.setLoading(true);
  //   this._register.registerGuest().subscribe((res: any) => {
  //     if (res != undefined && res != null && res != '') {
  //       //setRef_ Gest_GUID in Ref_User_GUID
  //       let ref_GuestUser_ID = res.split('~')[0];
  //       let ref_User_ID = res.split('~')[1];
  //       this._base._encryptedStorage.set(enAppSession.Ref_GuestUser_ID, ref_GuestUser_ID);
  //       this._base._encryptedStorage.set(enAppSession.Ref_User_ID, ref_User_ID);
  //       this._base._encryptedStorage.set(enAppSession.IsGuestUser, true);
  //     }
  //   }, error => {
  //     Helpers.setLoading(false);
  //   });
  //   setTimeout(() => {
  //     Helpers.setLoading(true);
  //     this._base._router.navigate(['home']);
  //   }, 1000);
  //   // } else {
  //   //   this._base._CommonService.showAlert("You are appear to be offline. Please try again later!.", true);
  //   // }
  // }
}