export class SaveModuleFileModel {
    FileManagerID: number;
    ModuleID: number;
    ModuleType: string;
    FileIdentifier: string;
    Sequence: number;
    files?: FileList | string | Array<any>;
}