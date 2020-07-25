export class ServiceModel {
    Flag?: string
    Ref_Service_ID?: number;
    Ref_Category_ID?: number;
    ServiceTitle?: string;
    AliasName?: string;
    Description?: string;
    Price?: number;
    PriceWithProjectFiles?: number;
    BigImageUrl?: string;
    ThumbnailImageUrl?: string;
    ServiceVideoUrl?: string;
    ProjectFilesUrl?: string;
    Revision?: number;
    DeliveryDate?: string;
    Ref_User_ID?: number;
    CreatedName?: string;
    FileUrls?: Array<any>;
    FAQDetails?: Array<{ Questions: string, Answer: string }>;
}