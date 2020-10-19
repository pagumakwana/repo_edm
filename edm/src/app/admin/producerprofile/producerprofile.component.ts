import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileUpdateModel } from 'src/app/_appModel/profileupdate/profileupdate.model';
import { ProfileUpdateService } from 'src/app/_appService/profileupdate/profileupdate.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { fileChoosenDataModel } from 'src/app/_appModel/genservices/service.model';
import { ValidationService } from 'src/app/commonmodule/errorComponent/validation.service';
import { SaveModuleFileModel } from 'src/app/_appModel/common.model';

declare var $: any;

@Component({
    selector: 'app-producerprofile',
    templateUrl: './producerprofile.component.html',
    styleUrls: ['./producerprofile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProducerProfileComponent implements OnInit {

    constructor(private _base: BaseServiceHelper, private fb: FormBuilder, private _profileService: ProfileUpdateService) { }
    ngOnInit(): void {
        this.getDaw();
    }

    addProfile: ProfileUpdateModel;
    dawList: Array<any>
    countryList: Array<any>
    fileURL = this._base._commonService.cdnURL;
    selectedStudioGears: any = [];
    selectedCountry: any = [];
    emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    config = {
        displayKey: "UserMasterData",
        search: true,
        height: 'auto',
        placeholder: 'Select Your Country',
        limitTo: 0,
        moreText: 'more',
        noResultsFound: 'No results found!',
        searchPlaceholder: 'Search here',
        searchOnKey: 'UserMasterData',
        clearOnSelection: true,
        inputDirection: 'ltr',
    }

    dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'Ref_DAW_ID',
        textField: 'DAW',
    };

    countryDDSettings: IDropdownSettings = {
        singleSelection: true,
        idField: 'Ref_UserMasterData_ID',
        textField: 'UserMasterData',
        allowSearchFilter: true,
        clearSearchFilter: true,
        searchPlaceholderText: 'Search here',
        noDataAvailablePlaceholderText: 'No results found!'
    };

    addProfileForm = this.fb.group({
        step1: this.fb.group({
            thumbnail: [''],
            FullName: ['', [Validators.required]],
            Bio: [''],
            UserMasterDataIDs: [''],
            StudioGears: [''],
        }),
        step2: this.fb.group({
            FacebookUrl: [''],
            SoundCloudUrl: [''],
            SpotifyUrl: ['']
        }),
        step3: this.fb.group({
            PayPalEmailID: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
            EmailID: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
            GovitID: ['']
        })
    })
    stage = {
        current: 1,
        completed: 1,
        total: 3
    }

    stepName = {
        thumbnail: 'step1',
        GovitID: 'step3'
    }

    fileChoosenData: { [key: string]: Array<fileChoosenDataModel> } = {
        thumbnail: [],
        GovitID: []
    }

    changeDirect(stage: number) {
        this.stage.current = stage
    }

    changeStage() {
        let currentFormGroup: FormGroup = (this.addProfileForm.controls['step' + this.stage.current] as FormGroup)
        this._base._commonService.markFormGroupTouched(currentFormGroup)
        // this._base._commonService.markFormGroupTouched(this.addProfileForm.controls['step' + this.stage.current])
        if (currentFormGroup.valid) {
            if (this.stage.current < this.stage.completed)
                this.stage.current++
            if (this.stage.completed < this.stage.total) {
                this.stage.completed++
                this.stage.current = this.stage.completed;
            } else if (this.stage.completed == this.stage.total && this.stage.completed == this.stage.current) {
                this.generateProfile()
            }
        }
    }

    getFilesInfo(FileIdentifier: string): SaveModuleFileModel {

        let arrayReturn: any = []
        for (let i in this.fileChoosenData[FileIdentifier]) {
          this.fileChoosenData[FileIdentifier][i].Sequence = (1 + parseInt(i))
          if (this.fileChoosenData[FileIdentifier][i].FileManagerID == 0) {
            let filesData: SaveModuleFileModel = {
              FileManagerID: this.fileChoosenData[FileIdentifier][i].FileManagerID,
              ModuleID: this.fileChoosenData[FileIdentifier][i].ModuleID,
              ModuleType: this.fileChoosenData[FileIdentifier][i].ModuleType,
              FileIdentifier: this.fileChoosenData[FileIdentifier][i].FileIdentifier,
              Sequence: this.fileChoosenData[FileIdentifier][i].Sequence,
              files: this.fileChoosenData[FileIdentifier][i].file,
            }
            arrayReturn.push(filesData)
          }
        }
        return arrayReturn
      }


    saveModuleFile_helper() {
        let fileData: Array<SaveModuleFileModel> = this._base._commonService.joinArray(this.getFilesInfo('thumbnail'), this.getFilesInfo('GovitID'))
        console.log("saveModuleFile_helper", fileData, this.fileChoosenData['thumbnail'])
        if (fileData.length > 0)
          this.saveModuleFile_multi_helper(fileData, fileData.length, [])
        else {
          this.saveProfile()
        }
    
        // this._base._commonService.saveModuleFile(this.justFilesArray(this.fileChoosenData.thumbnail), this.getFilesInfo('Service'), this.addServiceForm.controls.thumbnail.value).then((uploadResponse: Array<any>) => {
        //   resolve(uploadResponse)
        // })
      }

      saveModuleFile_multi_helper(arrayData: Array<SaveModuleFileModel>, counter: number, resolveData: Array<any>) {
        this._base._commonService.saveModuleFile(arrayData[counter - 1].files, arrayData[counter - 1], (this.addProfileForm.controls[this.stepName[arrayData[counter - 1].FileIdentifier]] as FormGroup).controls[arrayData[counter - 1].FileIdentifier].value).then((uploadResponse: Array<any>) => {
        // this._base._commonService.saveModuleFile(arrayData[counter - 1].files, arrayData[counter - 1], this.addServiceForm.controls[arrayData[counter - 1].FileIdentifier].value).then((uploadResponse: Array<any>) => {
          // resolve(uploadResponse)
          resolveData.push(uploadResponse)
          if (counter > 1) {
            counter--
            this.saveModuleFile_multi_helper(arrayData, counter, resolveData)
          } else {
            this.addProfile.FileManager = resolveData
            this.saveProfile()
          }
        })
      }

    generateProfile() {
        // this._base._commonService.filesUpload(this.justFilesArray(this.fileChoosenData.ProfilePhoto), 'Producerprofile', this.addProfileForm.value.step1.ProfilePhoto).then((ImageUrls: Array<any>) => {

        this.addProfile.FullName = this.addProfileForm.value.step1.FullName;
        this.addProfile.EmailID = this.addProfileForm.value.step3.EmailID;
        this.addProfile.UserCode = this.addProfileForm.value.step3.EmailID;
        this.addProfile.ProfilePhoto = null;
        this.addProfile.Bio = this.addProfileForm.value.step1.Bio;
        this.addProfile.SocialProfileUrl = `${this.addProfileForm.value.step2.FacebookUrl}|${this.addProfileForm.value.step2.SoundCloudUrl}|${this.addProfileForm.value.step2.SpotifyUrl}`;
        this.addProfile.StudioGears = this.addProfileForm.value.step1.StudioGears;
        this.addProfile.GovitID = this.addProfileForm.value.step3.GovitID;
        this.addProfile.PayPalEmailID = this.addProfileForm.value.step3.PayPalEmailID;
        this.addProfile.UserMasterDataIDs = this.addProfileForm.value.step1.UserMasterDataIDs;
        // this.addProfile.FileUrls = this._base._commonService.joinArray(this._base._commonService.createFileArray(ImageUrls, 'ProfilePhoto', this.fileChoosenData['ProfilePhoto'], this.addProfile.FileUrls))
        this.addProfile.FileManager = []
        this.saveModuleFile_helper()
        // this.saveProfile()
        // })
    }

    saveProfile() {
        this._profileService.SignUp(this.addProfile).subscribe((res: string) => {
            this._profileService.setProfileInfo(this.addProfile)
            let msg: { [key: string]: string } = {
                "USERUPDATEDSUCCESS": "Profile Updated Sucessfully"
            }
            this._base._alertMessageService.success(msg[res])
            this._base._router.navigate(['admin'])
            // $('#acknowledge_popup').modal('show')
            // setTimeout(() => { $('#acknowledge_popup').modal('hide'); this._base._router.navigate(['admin']) }, 3000);
        })
    }

    getProfileData() {
        this._profileService.getProfileInfo().subscribe((res: ProfileUpdateModel) => {
            this.addProfile = res;
            console.log("this.addProfile", this.addProfile);
            (this.addProfileForm.controls.step1 as FormGroup).controls.FullName.setValue(this.addProfile.FullName);
            let StudioGears: Array<string> = this.addProfile.StudioGears ? this.addProfile.StudioGears.split('|') : [];
            StudioGears.splice(-1,1);
            StudioGears.filter(sg => {
                this.dawList.filter(dl => {
                    if(sg == dl.DAW){
                        this.selectedStudioGears.push({Ref_DAW_ID: dl.Ref_DAW_ID, DAW: dl.DAW});
                    }
                });
            });
            (this.addProfileForm.controls.step1 as FormGroup).controls.StudioGears.setValue(this.selectedStudioGears);
            (this.addProfileForm.controls.step1 as FormGroup).controls.Bio.setValue(this.addProfile.Bio);
            
            let tuserMaster: any = JSON.parse(this.addProfile.UserMasterDataIDs);
            this.countryList.filter(cl => {
                if(cl.UserMasterData == tuserMaster[0].MasterDataName){
                    this.selectedCountry.push({Ref_UserMasterData_ID: cl.Ref_UserMasterData_ID, UserMasterData: cl.UserMasterData})
                }
            });
            
            (this.addProfileForm.controls.step1 as FormGroup).controls.UserMasterDataIDs.setValue(this.selectedCountry);

            let SocialProfileUrl: Array<string> = this.addProfile.SocialProfileUrl ? this.addProfile.SocialProfileUrl.split('|') : [];

            if (SocialProfileUrl.length >= 3) {
                (this.addProfileForm.controls.step2 as FormGroup).controls.FacebookUrl.setValue(SocialProfileUrl[0]);
                (this.addProfileForm.controls.step2 as FormGroup).controls.SoundCloudUrl.setValue(SocialProfileUrl[1]);
                (this.addProfileForm.controls.step2 as FormGroup).controls.SpotifyUrl.setValue(SocialProfileUrl[2]);
            }

            (this.addProfileForm.controls.step3 as FormGroup).controls.PayPalEmailID.setValue(this.addProfile.PayPalEmailID.split('|')[0]);
            (this.addProfileForm.controls.step3 as FormGroup).controls.EmailID.setValue(this.addProfile.EmailID);
            this.initFilesUrl(this.addProfile.FileManager);
        })
    }

    getDaw() {
        this._profileService.DAW().subscribe((res: any) => {
            this.dawList = res;this._profileService.UserMasterData('0').subscribe((res: any) => {
                this.countryList = res;
                this.getProfileData();
            })
        })
    }

    //setting up files during modify
    initFilesUrl(FileManager: Array<any>) {
        console.log("initFileManager")
        for (let i in FileManager) {
            if (FileManager[i].FileIdentifier) {
                let filesData: fileChoosenDataModel = {
                    file: null,
                    thumb: this.fileURL + FileManager[i].FilePath,
                    FileManagerID: FileManager[i].FileManagerID,
                    Sequence: FileManager[i].Sequence,
                    ModuleID: this.addProfile.Ref_User_ID,
                    FileIdentifier: FileManager[i].FileIdentifier,
                    ModuleType: 'producerprofile'
                }
                this.fileChoosenData[FileManager[i].FileIdentifier].push(filesData);
                // this.addProfileForm.controls[FileManager[i].FileIdentifier].setValue('uploaded')
                // this.addProfileForm.controls[FileManager[i].FileIdentifier].updateValueAndValidity()
                (this.addProfileForm.controls[this.stepName[FileManager[i].FileIdentifier]] as FormGroup).controls[FileManager[i].FileIdentifier].setValue('uploaded');
                (this.addProfileForm.controls[this.stepName[FileManager[i].FileIdentifier]] as FormGroup).controls[FileManager[i].FileIdentifier].updateValueAndValidity();

            }
        }
    }

    //files start
    justFilesArray(ArrayData: Array<fileChoosenDataModel | any>) {
        let arrayReturn = []
        for (let i in ArrayData) {
            ArrayData[i].DisplayOrder = (1 + parseInt(i))
            if (ArrayData[i].FileManagerID == null)
                arrayReturn.push(ArrayData[i].file)
        }
        return arrayReturn
    }

    fileChoosen($event, fieldName) {
        console.log("fileChoosen", $event, typeof this.fileChoosenData[fieldName]);

        let fileValidationInfo: { [key: string]: { fileType: Array<string>, size: number, FileIdentifier: string } } = {
            thumbnail: {
                fileType: ['image/svg', 'image/jpeg', 'image/jpg', 'image/png'],
                size: 3145728, // 3MB
                FileIdentifier: 'thumbnail'
            },
            GovitID: {
                fileType: ['image/svg', 'image/jpeg', 'image/jpg', 'image/png'],
                size: 3145728, // 3MB
                FileIdentifier: 'thumbnail'
            },
        };

        if ($event.target.files.length > 0) {
            let isValid: boolean = false
            for (let file of $event.target.files) {

                if (ValidationService.ValidateFileType_Helper(file, fileValidationInfo[fieldName].fileType)) {
                    if (ValidationService.ValidateFileSize_Helper(file, fileValidationInfo[fieldName].size)) {
                        isValid = true;
                        (this.addProfileForm.controls[this.stepName[fieldName]] as FormGroup).controls[fieldName].setValue('upload');
                        (this.addProfileForm.controls[this.stepName[fieldName]] as FormGroup).controls[fieldName].updateValueAndValidity();
                        this._base._commonService.readImage(file).subscribe((res: any) => {
                            let imgData: fileChoosenDataModel = { file: file, thumb: res, FileManagerID: 0, Sequence: null, ModuleType: "producerprofile", FileIdentifier: fileValidationInfo[fieldName].FileIdentifier, ModuleID: this.addProfile.Ref_User_ID }
                            console.log("imageData", imgData)
                            this.fileChoosenData[fieldName].push(imgData);
                        })
                    }
                }

                if (!isValid) {
                    this._base._alertMessageService.error(`${file.name} is Invalid`)
                }

            }
        }

        // (this.addProfileForm.controls[this.stepName[fieldName]] as FormGroup).controls[fieldName].setValue('upload');
        // (this.addProfileForm.controls[this.stepName[fieldName]] as FormGroup).controls[fieldName].updateValueAndValidity();

        // if ($event.target.files.length > 0) {
        //     for (let file of $event.target.files) {
        //         this._base._commonService.readImage(file).subscribe((res: any) => {
        //             let imgData: fileChoosenDataModel = { file: file, thumb: res, FileManagerID: null, DisplayOrder: null }
        //             console.log("imageData", imgData)
        //             this.fileChoosenData[fieldName] = [] //Empty Error
        //             this.fileChoosenData[fieldName].push(imgData);
        //         })
        //     }
        // }
    }

    getFileControlValue(fieldName) {
        let returnKey: string | null = null
        if (this.fileChoosenData[fieldName].length > 0) {
            let waitingUpload = this.fileChoosenData[fieldName].filter(item => item.FileManagerID == null)
            returnKey = waitingUpload.length > 0 ? 'upload' : 'uploaded'
        }
        return returnKey
    }

    removeFile(fieldName, fileIndex) {
        console.log("removeFile", fieldName, fileIndex)
        if (this.fileChoosenData[fieldName][fileIndex].FileManagerID != null)
            this.removeThumbnail(this.fileChoosenData[fieldName][fileIndex].FileManagerID)

        this.fileChoosenData[fieldName].splice(fileIndex, 1);
        (this.addProfileForm.controls[this.stepName[fieldName]] as FormGroup).controls[fieldName].setValue(this.getFileControlValue(fieldName))
    }

    removeThumbnail(ref_image_id) {
        this._base._commonService.removeFile(ref_image_id).subscribe((res: any) => {
            if (res == 'SUCCESS') {
                this._base._alertMessageService.success('File removed successfully!');
            } else {
                this._base._alertMessageService.error('Something went wrong!');
            }
        })
    }
}
