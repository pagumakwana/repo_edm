import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { Router } from '@angular/router';
import { CartService } from '../_appService/cart/cart.service';
import { enAppSession } from '../_appModel/enAppSession';

@Component({
  selector: 'app-cartscreen',
  templateUrl: './cartscreen.component.html',
  styleUrls: ['./cartscreen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartScreenComponent implements OnInit {

  requestData = {
    userId: null
  }

  constructor(public _base: BaseServiceHelper,
    public router: Router,
    private _cartService: CartService) { }
  ngOnInit(): void {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this.requestData.userId = Ref_User_ID
      this.getCartList()
    })
  }

  getCartList() {
    this._cartService.getCartData(this.requestData.userId).subscribe((data: any) => {
      console.log("getCartList", data)
    })
  }

}
