import { Injectable } from "@angular/core";
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/File-transfer/ngx';
//import { Zip } from '@ionic-native/zip/ngx';
import { Platform } from '@ionic/angular';
import { CommonService } from '../common/common';
import { enAppSession } from '../appsessionobjects/enAppSession';
import { AppSessionObject } from '../appsessionobjects/appsessionobject';

@Injectable()
export class FileManagerService {
    allFilesDownloadedFlag: any;
    downloadingStatus: any;
    data: any;
    downloadingItems = [];
    Scormdata: any;
    folderDirectory: any;
    externalFolderDirectory: any;
    // applicationFile
    constructor(
        public _transfer: FileTransfer,
        public _file: File,
        public _fileTransfer: FileTransferObject,
        public _platform: Platform,
       // public _zip: Zip,
        public _appSessionObject: AppSessionObject,
        private _commonService: CommonService,
    ) {
        this._platform.ready().then((readySource) => {
            this._fileTransfer = this._transfer.create();
            if (this._platform.is('ios') || this._platform.is("ipad") || this._platform.is("iphone")) {
                // This will only print when on iOS
                this.folderDirectory = this._file.documentsDirectory;
                this.externalFolderDirectory = this._file.dataDirectory;
            } else if (this._platform.is('android')) {
                // This will only print when on android
                this.folderDirectory = this._file.dataDirectory;
                this.externalFolderDirectory = this._file.externalRootDirectory;
            }
            //this.applicationFile = this._file.applicationDirectory
        })

    }
    ngOnInit() {
        // this.folderCreateforCorses();
    }
    checkfolderstrucute() {
        this._platform.ready().then((readySource) => {
            this._fileTransfer = this._transfer.create();
            if (this._platform.is('ios') || this._platform.is("ipad") || this._platform.is("iphone")) {
                // This will only print when on iOS
                this.folderDirectory = this._file.documentsDirectory;
            } else if (this._platform.is('android')) {
                // This will only print when on android
                this.folderDirectory = this._file.dataDirectory;
            }
            // this.applicationFile = this._file.applicationDirectory
        })
    }
    // Check
    checkdir(DirectoryName) {

        return this._file.checkDir(this.folderDirectory, DirectoryName).then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
    }
    //let options: IWriteOptions = { replace: true };
    checkFile(FolderName, fileName, callBack, error2) {
        return this._file.checkFile(this.folderDirectory + FolderName, fileName)
            .then(function (success) {
                // success
                if (callBack) {
                    callBack('file found');
                }
                console.log('file found' + success)
            }, (error) => {
                console.log(error);
                error2('file not found');
            });
    }
    checkExternalFile(FolderName, fileName, callBack, error2) {
        return this._file.checkFile(this.externalFolderDirectory + FolderName, fileName)
            .then(function (success) {
                // success
                if (callBack) {
                    callBack('file found');
                }
                console.log('file found' + success)
            }, (error) => {
                console.log(error);
                error2('file not found');
            });
    }
    // Create

    // public  downloadingItems = []//Array<({'downloadUrl': string, localPath: string,fileName: string, pageName:string,courseid:number,thisButton:object})>;
    createDir(folderName, callBack?) {
        return this._file.createDir(this.folderDirectory, folderName, true)
            .then(function (success) {
                // success
                console.log('folder created ' + success.name);
                if (callBack) { callBack(success); }

            }, function (error) {
                // console.log(error)
                // if (error) { error(error); }
            });
    }
    createExternalDir(folderName, callBack?) {
        return this._file.createDir(this.externalFolderDirectory, folderName, true)
            .then(function (success) {
                // success
                console.log('folder created ' + success.name);
                if (callBack) { callBack(success); }

            }, function (error) {
                // console.log(error)
                // if (error) { error(error); }
            });
    }

    readDirectory(directory) {
        var contents = []
        return this._file.listDir(this.folderDirectory, directory)
            .then(function (entries) {
                // success
                console.log(entries)
                for (var entry of entries) {
                    if (entry.isDirectory) {
                        //readsome(entry.createReader())
                    } else {
                        contents.push(entry);
                    }
                }
                console.log(contents)
                return contents;

            }, function (error) {
                // error
                console.log(error)
            });
        //readsome(folder.createReader())
    }
    createFile(fileName, replece) {
        console.log(this.folderDirectory + fileName);
        return this._file.createFile(this.folderDirectory, fileName, true)
            .then(function (success) {
                // success
                console.log('file created ' + success.name)
            }, function (error) {
                console.log(error)
            });

    }
    // remove
    removeDir(folderName) {
        this._file.removeDir(this.folderDirectory, folderName)
            .then(function (success) {
                // success
                console.log('folder deleted' + success)
            }, function (error) {
                // error
            });

    }
    removeFile(localpath, fileName, callBack?, error2?) {
        this._file.removeFile(localpath, fileName)
            .then(function (success) {
                // success
                if (callBack) {
                    callBack('file found');
                }
                console.log('file deleted' + success)
            }, function (error) {
                error2('file deleted error')
                console.log('file deleted error' + error)
                console.log(error)
            });

    }

    removeRecursively(localpath, folderName) {
        return this._file.removeRecursively(localpath, folderName)
            .then(function (success) {
                // success
                console.log('folder deleted' + success)
            }, function (error) {
                // error
            });

    }
    writeFile(path, fileName, fileData) {
        let options: IWriteOptions = { replace: true };
        return this._file.writeFile(path, fileName, fileData, options)
            .then(function (success) {
                console.log('data added' + success)
            }, function (error) {
                // error
            });
    }
    writeExistingFile(localpath, fileName, fileData) {
        //console.log( this.folderDirectory + localpath + fileName , fileData)
        return this._file.writeExistingFile(this.folderDirectory + localpath, fileName, fileData)
            .then(function (success) {
                // success
                console.log(success)
            }, function (error) {
                // error
                console.log(error)
            });
    }

    // READ
    readAsText(fileName) {
        return this._file.readAsText(this.folderDirectory, fileName)
            .then(function (success) {
                // success
                console.log(success)
            }, function (error) {
                // error
                console.log(error)
            });
    }
    // move file from device storage to secure app storage
    moveFile(path, fileName, newPath, newFileName) {
        return this._file.moveFile(this._file.externalRootDirectory + path, fileName, this.folderDirectory + newPath, newFileName)
            .then((success) => {
                // success
                console.log(success)
            }, (error) => {
                // error
                console.log(error)
            });
    }
    download(serverpath, localpath, thisButton, downlaodprogress, callBack, error2) {
        //const url = 'http://www.example.com/file.pdf';
        //this._fileTransfer = new PRD();
        this._fileTransfer = this._transfer.create();
        console.log(serverpath);
        console.log(localpath);
        this._fileTransfer.download(serverpath, this.folderDirectory + localpath).then((entry) => {
            console.log('download complete: ' + entry.toURL());
            console.log("File Downloaded: " + entry.nativeURL);
            if (callBack) { callBack(entry, thisButton); }

        }, (error) => {
            // handle error
            if (error2) { error2(error, thisButton); }
            console.log("Source not found. Reson: " + error);
        });
        this._fileTransfer.onProgress(
            (event) => {

                if (downlaodprogress) { downlaodprogress(event, thisButton); }
            })

    }
    externalDownload(serverpath, localpath, thisButton, downlaodprogress, callBack, error2) {
        //const url = 'http://www.example.com/file.pdf';
        //this._fileTransfer = new PRD();
        this._fileTransfer = this._transfer.create();
        console.log(serverpath);
        console.log(localpath);
        this._fileTransfer.download(serverpath, this.externalFolderDirectory + localpath).then((entry) => {
            console.log('download complete: ' + entry.toURL());
            console.log("File Downloaded: " + entry.nativeURL);
            if (callBack) { callBack(entry, thisButton); }

        }, (error) => {
            // handle error
            if (error2) { error2(error, thisButton); }
            console.log("Source not found. Reson: " + error);
        });
        this._fileTransfer.onProgress(
            (event) => {

                if (downlaodprogress) { downlaodprogress(event, thisButton); }
            })

    }
    downloadInApp(serverpath, localpath, downlaodprogress, callBack, error2) {
        //const url = 'http://www.example.com/file.pdf';
        //this._fileTransfer = new PRD();
        this._fileTransfer = this._transfer.create();
        console.log(serverpath);
        console.log(localpath);
        this._fileTransfer.download(serverpath, this._file.applicationDirectory + localpath).then((entry) => {
            console.log('download complete: ' + entry.toURL());
            console.log("File Downloaded: " + entry.nativeURL);
            if (callBack) { callBack(entry); }

        }, (error) => {
            // handle error
            if (error2) { error2(error); }
            console.log("Source not found. Reson: " + error);
        });
        this._fileTransfer.onProgress(
            (event) => {

                if (downlaodprogress) { downlaodprogress(event); }
            })

    }
    public offlineImagesStore(url, folder) {

        let localstorepath = this._commonService.downloadUrlPrepare(url);
        let FileNameformurl = this._commonService.getFileNameFromPath(localstorepath);
        let FileName = FileNameformurl.replace(/\s+/g, '');
        this.checkFile(folder, FileName, (sucess) => {
            console.log(sucess);
        }, (fail) => {
            console.log(fail);
            this.createDir(folder).then((sucess) => {
                console.log(sucess);
                this.download(encodeURI(url), folder + '/' + FileName, "", (e) => {
                }, (res) => {
                    console.log(res.nativeURL);
                }, (error) => {
                    console.log(error);
                });
            }, e => {
            })
        })
    }
    public downloadExcleFileInExternal(url, folder) {
        return new Promise((resolve, reject) => {
            let localstorepath = this._commonService.downloadUrlPrepare(url);
            let FileNameformurl = this._commonService.getFileNameFromPath(localstorepath);
            let FileName = FileNameformurl.replace(/\s+/g, '');
            this.checkExternalFile(folder, FileName, (sucess) => {
                this.removeFile(this.folderDirectory + folder, FileName, (sucess) => {
                    this.createExternalDir(folder).then((sucess) => {
                        console.log(sucess);
                        this.externalDownload(encodeURI(url), folder + '/' + FileName, "", (e) => {
                        }, (res) => {
                            resolve(res.nativeURL);
                            console.log(res.nativeURL);
                        }, (error) => {
                            console.log(error);
                        });
                    }, e => {
                        // this.externalDownload(encodeURI(url), folder + '/' + FileName, "", (e) => {
                        // }, (res) => {
                        //     console.log(res.nativeURL);
                        //     resolve(res.nativeURL);
                        // }, (error) => {
                        //     console.log(error);
                        // });
                    })
                }, (fail) => {
                    this.createExternalDir(folder).then((sucess) => {
                        this.externalDownload(encodeURI(url), folder + '/' + FileName, "", (e) => {
                        }, (res) => {
                            console.log(res.nativeURL);
                            resolve(res.nativeURL);
                        }, (error) => {
                            console.log(error);
                        });
                    });
                });
                console.log(sucess);
            }, (fail) => {
                console.log(fail);
                this.createExternalDir(folder).then((sucess) => {
                    this.externalDownload(encodeURI(url), folder + '/' + FileName, "", (e) => {
                    }, (res) => {
                        console.log(res.nativeURL);
                        resolve(res.nativeURL);
                    }, (error) => {
                        console.log(error);
                    });
                });
            })
        })
    }
    public saveCreatedpdfFileInExternal(folder, filename, pdfData) {
        return new Promise((resolve, reject) => {
            this.checkExternalFile(folder, filename, (sucess) => {
                this.removeFile(this.externalFolderDirectory + folder, filename, (sucess) => {
                    this.createExternalDir(folder).then((sucess) => {
                        console.log(sucess);
                        this.writeFile(this.externalFolderDirectory + folder,filename,pdfData).then(success =>{
                            console.log("File created Succesfully" + JSON.stringify(success));
                            resolve(this.externalFolderDirectory + folder + filename);
                        })
                        // this.externalDownload(encodeURI(url), folder + '/' + FileName, "", (e) => {
                        // }, (res) => {
                        //     resolve(res.nativeURL);
                        //     console.log(res.nativeURL);
                        // }, (error) => {
                        //     console.log(error);
                        // });
                    }, e => {
                        this.writeFile(this.externalFolderDirectory + folder,filename,pdfData).then(success =>{
                            console.log("File created Succesfully" + JSON.stringify(success));
                        })
                        // this.externalDownload(encodeURI(url), folder + '/' + FileName, "", (e) => {
                        // }, (res) => {
                        //     console.log(res.nativeURL);
                        //     resolve(res.nativeURL);
                        // }, (error) => {
                        //     console.log(error);
                        // });
                    })
                }, (fail) => {
                    this.createExternalDir(folder).then((sucess) => {
                        this.writeFile(this.externalFolderDirectory + folder,filename,pdfData).then(success =>{
                            console.log("File created Succesfully" + JSON.stringify(success));
                            resolve(this.externalFolderDirectory + folder + filename);
                        })
                    });
                });
                console.log(sucess);
            }, (fail) => {
                console.log(fail);
                this.createExternalDir(folder).then((sucess) => {
                    this.writeFile(this.externalFolderDirectory + folder,filename,pdfData).then(success =>{
                        console.log("File created Succesfully" + JSON.stringify(success));
                        resolve(this.externalFolderDirectory + folder + '/'+filename);
                    })
                });
            })
        })
    }
}
