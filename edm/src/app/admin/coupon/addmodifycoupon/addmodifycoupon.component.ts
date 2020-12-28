import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from 'src/app/_appService/coupon/coupon.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CouponModel } from 'src/app/_appModel/coupon/coupon.model';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { formatDate } from '@angular/common';
import { ValidationService } from 'src/app/commonmodule/errorComponent/validation.service';

@Component({
  selector: 'appAdmin-addmodifycoupon',
  templateUrl: './addmodifycoupon.component.html',
  styleUrls: ['./addmodifycoupon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifyCouponComponent implements OnInit {

  constructor(public _base: BaseServiceHelper,
    private _activatedRouter: ActivatedRoute,
    private _coupon: CouponService,
    private fb: FormBuilder) { }

  Ref_Coupon_ID: string;
  addCoupon: CouponModel;

  addCouponForm = this.fb.group({
    Ref_Coupon_ID: ['', [Validators.required]],
    CouponCode: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    DiscountInPercentage: ['', [Validators.required]],
    DiscountInMax: ['', [Validators.required]],
    StartDate: ['', [Validators.required, ValidationService.dateValidator(1)]],
    EndDate: ['', [Validators.required, ValidationService.dateValidator(1), ValidationService.dateValidator(2, 'StartDate')]],
    OneTimeUse: ['', [Validators.required]],
    AudienceCount: ['', [Validators.required]],
    OnlyForNewUsers: ['', [Validators.required]],
    IsActive: ['', [Validators.required]],
    DiscountType: ['flat', [Validators.required]], //Static [Flat,Percent]
  })

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("CREATE NEW COUPON CODE", "CREATE NEW COUPON CODE");
    this.Ref_Coupon_ID = this._activatedRouter.snapshot.paramMap.get('Ref_Coupon_ID');
    if (this.Ref_Coupon_ID != '0') {
      this.bindCoupon();
    } else {
      this.initialize();
    }
    this.addCouponForm.controls.StartDate.valueChanges.subscribe(res => {
      this.addCouponForm.controls.EndDate.setValue('')
    })
  }



  initialize() {
    this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
      this.addCoupon = {
        Ref_Coupon_ID: 0,
        CouponCode: null,
        CouponUseBy: null,
        Description: null,
        DiscountInPercentage: null,
        DiscountInMax: null,
        StartDate: null,
        EndDate: null,
        OneTimeUse: null,
        AudienceCount: null,
        OnlyForNewUsers: null,
        IsActive: true,
        CreatedBy: Ref_User_ID,
        CouponObject: []
      }
      this.addCouponForm.controls.Ref_Coupon_ID.setValue(this.addCoupon.Ref_Coupon_ID)
      console.log("addServiceForm", this.addCoupon)
    });
  }

  bindCoupon() {
    this._coupon.CouponCode().subscribe((data): any => {
      let addCoupon = Array.isArray(data) ? data.filter(res => res.Ref_Coupon_ID == this.Ref_Coupon_ID) : null
      this.addCoupon = Array.isArray(addCoupon) ? addCoupon.length > 0 ? addCoupon[0] : null : null
      console.log("bindCoupon", this.addCoupon)
      if (this.addCoupon) {
        this.addCouponForm.controls.Ref_Coupon_ID.setValue(this.addCoupon.Ref_Coupon_ID)
        this.addCouponForm.controls.CouponCode.setValue(this.addCoupon.CouponCode)
        this.addCouponForm.controls.Description.setValue(this.addCoupon.Description)
        this.addCouponForm.controls.DiscountInPercentage.setValue(this.addCoupon.DiscountInPercentage)
        this.addCouponForm.controls.DiscountInMax.setValue(this.addCoupon.DiscountInMax)
        this.addCouponForm.controls.StartDate.setValue(formatDate(this.addCoupon.StartDate, 'yyyy-MM-dd', 'en'))
        this.addCouponForm.controls.EndDate.setValue(formatDate(this.addCoupon.EndDate, 'yyyy-MM-dd', 'en'))
        this.addCouponForm.controls.OneTimeUse.setValue(this.addCoupon.OneTimeUse)
        this.addCouponForm.controls.AudienceCount.setValue(this.addCoupon.AudienceCount)
        this.addCouponForm.controls.OnlyForNewUsers.setValue(this.addCoupon.OnlyForNewUsers)
        this.addCouponForm.controls.IsActive.setValue(this.addCoupon.IsActive)
      }
    })
  }

  addCouponCode() {
    this.addCoupon.Ref_Coupon_ID = this.addCouponForm.value.Ref_Coupon_ID
    this.addCoupon.CouponCode = this.addCouponForm.value.CouponCode
    this.addCoupon.Description = this.addCouponForm.value.Description
    this.addCoupon.DiscountInPercentage = this.addCouponForm.value.DiscountInPercentage
    this.addCoupon.DiscountInMax = this.addCouponForm.value.DiscountInMax
    this.addCoupon.StartDate = this.addCouponForm.value.StartDate
    this.addCoupon.EndDate = this.addCouponForm.value.EndDate
    this.addCoupon.OneTimeUse = this.addCouponForm.value.OneTimeUse
    this.addCoupon.AudienceCount = this.addCouponForm.value.AudienceCount
    this.addCoupon.OnlyForNewUsers = this.addCouponForm.value.OnlyForNewUsers
    this.addCoupon.IsActive = this.addCouponForm.value.IsActive
    console.log("addCouponCode", this.addCouponForm, this.addCoupon)
    this.saveCoupon()
  }

  saveCoupon() {
    this._coupon.saveCouponCode(this.addCoupon).subscribe((res: any) => {
      console.log("saveCoupon", res)
      this._base._commonService.hideLoader();
      let msg = {
        COUPONCODEADDED: "coupon added successfully!",
        COUPONCODEUPDATED: "coupon updated successfully!",
        COUPONCODEEXISTS: "coupon already exists!"
      }
      let isRedirect: boolean = (res != "COUPONCODEEXISTS")
      this._base._alertMessageService[isRedirect ? 'success' : 'error'](msg[res]);
      if (isRedirect)
        setTimeout(() => { this._base._router.navigate(['admin', 'coupon']) }, 3000);
    })
  }

}
