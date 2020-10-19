export interface userModel {
    FullName?: any,
    EmailID?: any,
    Mobile?: any,
    Password?: any,
    RePassword?: any,
    Profile_Photo?: any,
    UserMasterDataIDs?: any,
    UserCode?: any,
    Gender?: any,
    Bio?: any,
    DateOfBirth?: any,
    Website?: any,
    Ref_User_Id?: any,
    CreatedName?: any,
    IsSocialLogin?: any,
    User_Code?: any,
    IsRemember?: any
}
export interface requestOTP {
    Ref_OTP_ID?: any,
    Ref_User_ID?: any,
    OTP?: any,
    Flag?: any,
    Type?: any,
    IsValidate?: any,
}