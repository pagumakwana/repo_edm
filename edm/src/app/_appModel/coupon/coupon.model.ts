export class CouponModel {
    Ref_Coupon_ID: number;
    CouponCode: string;
    CouponUseBy: string;
    Description: string;
    DiscountInPercentage: number;
    DiscountInMax: number;
    StartDate: string;
    EndDate: string;
    OneTimeUse: boolean;
    AudienceCount: number;
    OnlyForNewUsers: boolean;
    IsActive: boolean;
    CreatedBy: string;
    CouponObject: Array<{
        Ref_Object_ID: number;
        ObjectType: string
    }>
}
