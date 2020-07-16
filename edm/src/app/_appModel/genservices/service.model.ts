export class ServiceModel {
    Ref_Service_ID: number;
    Ref_Category_ID: number;
    ServiceTitle: string;
    Description: string;
    Price: number;
    PriceWithProjectFiles: number;
    BigImageUrl: string;
    ThumbnailImageUrl: string;
    ServiceVideoUrl: string;
    ProjectFilesUrl: string;
    Revision: number;
    DeliveryDate: string;
    IsActive: boolean;
    CreatedBy: string;
    FileUrls: Array<any>
    FAQDetails: Array<{ Questions: string, Answer: string }>
}