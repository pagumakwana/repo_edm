
export class ApiConstant {
    public static customer = {
        signIn: "User/SignIn",
        registerCustomer: "User/SignUp",
        validateUser: "Admin/UserManagement/ValidateUser",
        forgotPassword: "Admin/UserManagement/ForgotPassword",
        requestOTP: "Admin/UserManagement/RequestOTP",
        registerGuest: "Admin/UserManagement/RegisterGuest",
    }
    public static category = {
        AddModifyCategory: "Admin/MasterManagement/Category",
        category: "Admin/MasterManagement/Category"
    }
    public static common = {
        thumbnail: "Admin/Common/Image",
        uploadfiles: "Admin/Common/File"
    }
    public static TrackManagement = {
        Track: "Admin/TrackManagement/Track",
    }
}