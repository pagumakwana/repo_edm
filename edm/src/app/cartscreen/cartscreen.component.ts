import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { Router } from '@angular/router';
import { CartService } from '../_appService/cart/cart.service';
import { enAppSession } from '../_appModel/enAppSession';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from "lodash";

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
    discounted: {
      price: number,
      couponCode: string
    },
    serviceTaxPer: number,
    serviceTax: number,
    subtotal: number,
  } = {
      total: 0,
      discounted: {
        price: 0,
        couponCode: null
      },
      serviceTaxPer: 5.2,
      serviceTax: 0,
      subtotal: 0
    }
  cartList: Array<any> = []
  imageBaseUrl: string = this._base._commonService.cdnURL
  // UserActionData: { UserID: number, ObjectID: number, ObjectType: string, Action: string } = {
  //   UserID: null,
  //   ObjectID: null,
  //   ObjectType: "Producer",
  //   Action: null
  // }

  couponForm: FormGroup = this._fb.group({
    couponCode: ['', [Validators.required]]
  })

  constructor(public _base: BaseServiceHelper,
    public router: Router,
    private _cartService: CartService,
    private _fb: FormBuilder) { }
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
        res.discountedPrice = 0
      })
      console.log("getCartList", this.cartList)
      this.calculateCost()

    })
  }
  onStatusChange(event) {
    console.log("onstatusChange", event)
    this.removeCoupon(false)
    this.calculateCost()
  }

  calculateCost() {
    let selectedProducts = this.cartList.filter(res => res.isChecked)
    console.log("calculateCost", selectedProducts)
    let subtotal: number = 0
    let discountedPrice: number = 0
    for (let product of selectedProducts) {
      subtotal = subtotal + parseFloat(product.Price)
      discountedPrice = discountedPrice + parseFloat(product.discountedPrice)
    }
    this.cartAmount.subtotal = parseFloat(subtotal.toFixed(2));
    this.cartAmount.discounted.price = parseFloat(discountedPrice.toFixed(2));
    this.cartAmount.serviceTax = parseFloat((((this.cartAmount.subtotal - this.cartAmount.discounted.price) * (this.cartAmount.serviceTaxPer / 100))).toFixed(2));
    this.cartAmount.total = (this.cartAmount.subtotal - this.cartAmount.discounted.price) + this.cartAmount.serviceTax
  }

  Remove(OrderID: number | any, ObjectID: number | any, ObjectType: string, index: number) {
    let Object: { UserID: number; OrderID: number; ObjectID: number; ObjectType: string, Action?: string } = {
      UserID: this.requestData.userId,
      OrderID: parseInt(OrderID),
      ObjectID: parseInt(ObjectID),
      ObjectType: ObjectType
    }
    console.log("Remove", Object)

    this._cartService.Remove(Object).subscribe((res: any) => {
      Object.Action = 'Remove'
      console.log("Remove", res, Object)
      this.ngOnInit()
    })
  }

  applyCoupon() {
    console.log("applyCoupon", this.couponForm.value.couponCode)
    let selectedProducts: Array<any> = this.cartList.filter(res => res.isChecked)
    console.log("calculateCost", selectedProducts)
    this.cartAmount.discounted.price = 0
    this.cartAmount.discounted.couponCode = null
    for (let i in selectedProducts) {
      this.checkCoupon(selectedProducts[i].OrderID, parseInt(i) == selectedProducts.length - 1)
    }
  }

  checkCoupon(OrderID, showMsg: boolean = false) {
    console.log("checkCoupon", OrderID, this.couponForm.value.couponCode, showMsg)
    let data: { UserID: number; OrderID: number; CouponCode: string; } = {
      UserID: this.requestData.userId,
      OrderID: OrderID,
      CouponCode: this.couponForm.value.couponCode
    }
    let res: any = [
      {
        "ObjectIDs": "",
        "DiscountInMax": 0,
        "DiscountInPercentage": 0,
        "CouponStatus": "APPLIED"
      }
      // {
      //   "ObjectIDs": "",
      //   "DiscountInMax": 10,
      //   "DiscountInPercentage": 0,
      //   "CouponStatus": "INVALIDCOUPONCODE"
      // }
    ]
    res = Array.isArray(res) && res.length > 0 ? res[0] : null
    if (res && res.CouponStatus == 'APPLIED') {
      this.cartAmount.discounted.couponCode = this.couponForm.value.couponCode
      if (showMsg) this._base._alertMessageService.success(`${this.cartAmount.discounted.couponCode} Applied Sucessfully`)
      let index: number = _.findIndex(this.cartList, (o: any) => {
        return o.OrderID == OrderID
      })
      if (index > -1) {
        this.cartList[index].discountedPrice = res.DiscountInMax
        this.calculateCost()
      }
    } else {
      if (showMsg) this._base._alertMessageService.error('Invalid Coupon Code')
    }
    this._cartService.ApplyCoupon(data).subscribe((res: any) => {
      console.log("ApplyCoupon", res)
    })


  }

  removeCoupon(calcCost: boolean = true) {
    this.cartAmount.discounted.price = 0
    this.cartAmount.discounted.couponCode = null
    this.couponForm.controls.couponCode.setValue('')
    for (let product of this.cartList) {
      product.discountedPrice = 0
    }
    if (calcCost) this.calculateCost()
  }



}
