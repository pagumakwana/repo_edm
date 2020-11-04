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
  cartAmount: {
    total: number,
    serviceTaxPer: number,
    serviceTax: number,
    subtotal: number,
  } = {
      total: 0,
      serviceTaxPer: 5.2,
      serviceTax: 0,
      subtotal: 0
    }
  cartList: Array<any> = []
  imageBaseUrl: string = this._base._commonService.cdnURL
  UserActionData: { UserID: number, ObjectID: number, ObjectType: string, Action: string } = {
    UserID: null,
    ObjectID: null,
    ObjectType: "Producer",
    Action: null
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
      this.cartList = data
      this.cartList.map(res => {
        res.isChecked = true
      })
      console.log("getCartList", this.cartList)
      this.calculateCost()

    })
  }
  onStatusChange(event) {
    console.log("onstatusChange", event)
    this.calculateCost()
  }

  calculateCost() {
    let selectedProducts = this.cartList.filter(res => res.isChecked)
    console.log("calculateCost", selectedProducts)
    let subtotal: number = 0
    for (let product of selectedProducts) {
      subtotal = subtotal + parseFloat(product.Price)
    }
    this.cartAmount.subtotal = parseFloat(subtotal.toFixed(2));
    this.cartAmount.serviceTax = parseFloat(((subtotal * (this.cartAmount.serviceTaxPer / 100))).toFixed(2));
    this.cartAmount.total = subtotal + this.cartAmount.serviceTax
  }

  Order(Action: string, ObjectID: number | any, ObjectType: string, actionObj: any) {
    this.UserActionData.Action = Action
    this.UserActionData.ObjectID = parseInt(ObjectID)
    this.UserActionData.ObjectType = ObjectType

    // if (ActionType == 'follow')
    //     this.UserActionData.Action = actionSet ? 'Follow' : "Unfollow"
    // if (ActionType == 'favorite')
    //     this.UserActionData.Action = actionSet ? 'Favourite' : "Unfavourite"
    let Object = {
      UserID: this.UserActionData.UserID,
      OrderID: 0,
      ObjectID: parseInt(ObjectID),
      ObjectType: ObjectType,
      OrderStatus: Action
    }

    let Data: { ObjectList: Array<{ UserID: number; OrderID: number; ObjectID: number; ObjectType: string; OrderStatus: string; }> } = { ObjectList: [] }

    Data.ObjectList.push(Object)

    this._cartService.Order(Data).subscribe((res: any) => {
      console.log("Order", res, actionObj)
      this._base._commonService.UserActionNotificationAlert(actionObj, this.UserActionData, res)
      // if (ActionType == 'follow') {
      //     actionObj.Followed = (res == 'Follow')
      //     actionObj.Followers = (res == 'Follow') ? actionObj.Followers + 1 : actionObj.Followers - 1
      // } else if (ActionType == 'favorite') {
      //     actionObj = (res == 'Favourite')
      // }
    })
  }

}
