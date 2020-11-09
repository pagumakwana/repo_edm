
export class ApiConstant {
    public static customer = {
        signIn: "User/SignIn",
        registerCustomer: "User/SignUp",
        validateUser: "Admin/UserManagement/ValidateUser",
        forgotPassword: "Admin/UserManagement/ForgotPassword",
        requestOTP: "Admin/UserManagement/RequestOTP",
        registerGuest: "Admin/UserManagement/RegisterGuest",
        Producers: "User/Producers",
        CustomServices: "User/CustomServices",
        TrackAndBeat: "User/TrackAndBeat",
        ServiceList: "User/Service/List",
        CustomServiceDetails: "User/Service/CustomServiceDetails",
        AvailableProducers: "User/AvailableProducers",
    }
    public static category = {
        AddModifyCategory: "Admin/MasterManagement/Category",
        category: "Admin/MasterManagement/Category"
    }
    public static CouponCode = {
        CouponCode: "Admin/MasterManagement/CouponCode",
        ManageCouponCode: "Admin/MasterManagement/ManageCouponCode"
    }
    public static genService = {
        Service: "Admin/ServiceManagement/Service",
        ManageService: "Admin/ServiceManagement/ManageService",
        servicebycatehory: "User/Service/ServiceByCategory",
    }
    public static common = {
        thumbnail: "Admin/Common/Image",
        uploadfiles: "Admin/Common/File",
        uploadFileData: "Admin/Common/FileUpload",
        SaveModuleFile: "Admin/Common/SaveModuleFile",
        removefile: "Admin/Common/RemoveFile"
    }
    public static TrackManagement = {
        Track: "Admin/TrackManagement/Track",
        ApproveAndRejact: "Admin/TrackManagement/ApproveAndRejact",
        ManageTrack: "Admin/TrackManagement/ManageTrack",
        FeaturedTrack: "User/Track/FeaturedTrack",
    }
    public static MasterManagement = {
        DAW: "Admin/MasterManagement/DAW",
        UserMaster: "Admin/MasterManagement/UserMaster",
        ParentUserMaster: "Admin/MasterManagement/ParentUserMaster",
        UserMasterData: "Admin/MasterManagement/UserMasterData",
        CarouselList: "Admin/MasterManagement/CarouselList",
        Carousel: "Admin/MasterManagement/Carousel",
        ManageCarousel: "Admin/MasterManagement/ManageCarousel",
    }

    public static Shared = {
        GlobalSearch: "User/Shared/GlobalSearch",
    }
    public static Track = {
        FilterTrack: "User/Track/FilterTrack",
        TrackAndBeatDetails: "User/Track/TrackAndBeatDetails",
    }
    public static Order = {
        UserAction: "UserOrder/UserAction",
        Order: "UserOrder/Order",
        Remove: "UserOrder/Remove"
    }
    public static AuthorityManagement = {
        Module: "Admin/AuthorityManagement/Module",
        Authority: "Admin/AuthorityManagement/Authority",
        AuthorityDetails: "Admin/AuthorityManagement/AuthorityDetails",
    }
}