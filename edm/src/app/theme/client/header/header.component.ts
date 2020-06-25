import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private _base: BaseServiceHelper, private _categoryService: CategoryService) {
    this.subscriptionData = this._base._commonService.setHasLoginSubscribe.subscribe(hasLogin => {
      this.checkIsLogin()
    })
    this.checkIsLogin()
  }
  ngOnDestroy(): void {
    this.subscriptionData.unsubscribe()
  }
  _categoryModel: CategoryModel = {};
  public categoryData: any;
  hasLogin: boolean = false;
  public FullName: string = '';
  public Ref_User_ID: number = 0;
  public EmailID: string = '';
  public ProfilePic: string = '';
  subscriptionData: Subscription;


  //Checks If Login
  checkIsLogin() {
    this._base._encryptedStorage.get(enAppSession.HasLogin).then(HasLogin => {
      this.hasLogin = HasLogin;
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
          this._base._encryptedStorage.get(enAppSession.EmailID).then(EmailID => {
            this._base._encryptedStorage.get(enAppSession.ProfilePic).then(ProfilePic => {
              this.FullName = FullName;
              this.Ref_User_ID = Ref_User_ID;
              this.EmailID = EmailID;
              this.ProfilePic = ProfilePic;
            });
          });
        });
      });
    });
  }


  ngOnInit(): void {

    this.bindCategory();
  }

  redirectUrl(url) {
    this._base._commonService.navigation(url);
  }

  bindCategory() {
    // this._categoryModel = {
    //   Flag: '',
    //   Ref_Category_ID: 0,
    //   Ref_Parent_ID: 0
    // }
    this._categoryService.categorylist().subscribe((resData: any) => {
      this.categoryData = resData;
    });
  }


  logOut() {
    this._base._appSessionService.clearUserSession();
    setTimeout(() => {
      this.checkIsLogin()
      this._base._commonService.navigation('/');
    }, 500);
  }
}
