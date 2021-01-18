import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { CategoryService } from 'src/app/_appService/category/category.serviec';
import { CategoryModel } from 'src/app/_appModel/category/category.model';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/_appService/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {


  constructor(private _base: BaseServiceHelper, private _categoryService: CategoryService, private _cartService: CartService) {
    this.subscriptionData = this._base._commonService.setHasLoginSubscribe.subscribe(hasLogin => {
      this.checkIsLogin()
    })
    this.subscriptionCartData = this._base._commonService.setCartCountSubscribe.subscribe(cart => {
      this.checkCartCount()
    })
    this.checkIsLogin()
    this._base._commonService.checkCartValue()
  }
  ngOnDestroy(): void {
    this.subscriptionData.unsubscribe()
    this.subscriptionCartData.unsubscribe()
  }
  _categoryModel: CategoryModel = {};
  public categoryData: any;
  hasLogin: boolean = false;
  public FullName: string = '';
  public Ref_User_ID: number = 0;
  public EmailID: string = '';
  public ProfilePic: string = '';
  subscriptionData: Subscription;
  subscriptionCartData: Subscription;
  cartCount: number = null

  //Checks CartCount
  checkCartCount() {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this._cartService.getCartData(Ref_User_ID).subscribe((data: any) => {
        console.log("checkCartCount", data)
        this.cartCount = data.length
      })
    })
  }



  //Checks If Login
  checkIsLogin() {
    this._base._encryptedStorage.get(enAppSession.HasLogin).then(HasLogin => {
      this.hasLogin = HasLogin;
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
          this._base._encryptedStorage.get(enAppSession.EmailID).then(EmailID => {
            this._base._encryptedStorage.get(enAppSession.FileUrls).then(ProfilePic => {
              this.FullName = FullName;
              this.Ref_User_ID = Ref_User_ID;
              this.EmailID = EmailID;
              console.log("ProfilePic", JSON.parse(ProfilePic));
              // this.ProfilePic = ProfilePic;
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
    this._categoryService.categorylist('TRACK', 0).subscribe((resData: any) => {
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
