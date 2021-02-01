export class BlogModel {
    Ref_Blog_ID: number;
    BlogTitle: string;
    Blog: string;
    IsActive: boolean;
    CreatedBy: string;
    FileManager: Array<{
        FileManagerID: number;
        ModuleID: number;
        ModuleType: string;
        FileName: string;
        FilePath: string;
        FileType: string;
        FileExtension: string;
        FileSize: number;
        FileIdentifier: string;
        Sequence: number
    }>
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