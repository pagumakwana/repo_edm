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
    thumbnail?: string;
    ThumbnailImageUrl?: string;
    ServiceVideoUrl?: string;
    ProjectFilesUrl?: string;
    Revision?: number;
    DeliveryDate?: string;
    Ref_User_ID?: number;
    CreatedName?: string;
    FileUrls?: Array<any>;
    FileManager?: Array<any>;
    FAQDetails?: Array<{ Questions: string, Answer: string }>;
    MetaTitle?: string;
    MetaKeywords?: string;
    MetaDescription?: string;
}

export class fileChoosenDataModel {
    file: any;
    thumb: string;
    FileManagerID: number;
    ModuleID: number;
    ModuleType: string;
    FileIdentifier: string;
    Sequence: number;
}