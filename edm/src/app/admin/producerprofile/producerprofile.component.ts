import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileUpdateModel } from 'src/app/_appModel/profileupdate/profileupdate.model';
import { ProfileUpdateService } from 'src/app/_appService/profileupdate/profileupdate.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { fileChoosenDataModel } from 'src/app/_appModel/genservices/service.model';

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
        this.getDaw()
        this.getCountry()
        this.getProfileData()
    }

    addProfile: ProfileUpdateModel;
    dawList: Array<any>
    countryList: Array<any>
    fileURL = this._base._commonService.cdnURL;

    config = {
        displayKey: "UserMasterData",
        search: true,
        height: 'auto',
        placeholder: 'Select Your Country',
        // customComparator: ()=>{},
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
            ProfilePhoto: [''],
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
            PayPalEmailID: [''],
            EmailID: [''],
            GovitID: ['']
        })
    })
    stage = {
        current: 1,
        completed: 1,
        total: 3
    }

    stepName = {
        ProfilePhoto: 'step1',
        GovitID: 'step3'
    }

    fileChoosenData: { [key: string]: Array<fileChoosenDataModel> } = {
        ProfilePhoto: [],
        GovitID: []
    }

    changeDirect(stage: number) {
        this.stage.current = stage
    }

    changeStage() {
        let currentFormGroup: FormGroup = (this.addProfileForm.controls['step' + this.stage.current] as FormGroup)
        this._base._commonService.markFormGroupTouched(currentFormGroup)
        // this._base._commonService.markFormGroupTouched(this.addProfileForm.controls['step' + this.stage.current])
        console.log("changeStage", this.addProfileForm, currentFormGroup)
        if (currentFormGroup.valid || true) {
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




    generateProfile() {
        this._base._commonService.filesUpload(this.justFilesArray(this.fileChoosenData.ProfilePhoto), 'Producerprofile', this.addProfileForm.value.step1.ProfilePhoto).then((ImageUrls: Array<any>) => {

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
            this.addProfile.FileUrls = this._base._commonService.joinArray(this._base._commonService.createFileArray(ImageUrls, 'ProfilePhoto', this.fileChoosenData['ProfilePhoto'], this.addProfile.FileUrls))
            this.saveProfile()
        })
    }

    saveProfile() {
        console.log("saveProfile", this.addProfileForm, this.addProfile)
        this._profileService.SignUp(this.addProfile).subscribe((res: string) => {
            console.log("saveProfile_res", res)
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
            console.log("getProfileData_observer", res)
            this.addProfile = res;
            (this.addProfileForm.controls.step1 as FormGroup).controls.FullName.setValue(this.addProfile.FullName);
            (this.addProfileForm.controls.step1 as FormGroup).controls.StudioGears.setValue(this.addProfile.StudioGears);
            (this.addProfileForm.controls.step1 as FormGroup).controls.Bio.setValue(this.addProfile.Bio);
            (this.addProfileForm.controls.step1 as FormGroup).controls.UserMasterDataIDs.setValue(this.addProfile.UserMasterDataIDs);
            (this.addProfileForm.controls.step1 as FormGroup).controls.StudioGears.setValue(this.addProfile.StudioGears);

            let SocialProfileUrl: Array<string> = this.addProfile.SocialProfileUrl ? this.addProfile.SocialProfileUrl.split('|') : [];
            if (SocialProfileUrl.length == 3) {
                (this.addProfileForm.controls.step2 as FormGroup).controls.FacebookUrl.setValue(SocialProfileUrl[0]);
                (this.addProfileForm.controls.step2 as FormGroup).controls.SoundCloudUrl.setValue(SocialProfileUrl[1]);
                (this.addProfileForm.controls.step2 as FormGroup).controls.SpotifyUrl.setValue(SocialProfileUrl[2]);
            }

            (this.addProfileForm.controls.step3 as FormGroup).controls.PayPalEmailID.setValue(this.addProfile.PayPalEmailID);
            (this.addProfileForm.controls.step3 as FormGroup).controls.EmailID.setValue(this.addProfile.EmailID);
            this.initFilesUrl(this.addProfile.FileUrls)
        })
    }

    getDaw() {
        this._profileService.DAW().subscribe((res: any) => {
            console.log("getDaw", res)
            this.dawList = res
        })
    }
    getCountry() {
        this._profileService.UserMasterData('0').subscribe((res: any) => {
            console.log("getCountry", res)
            this.countryList = res
        })
    }

    //setting up files during modify
    initFilesUrl(filesUrl: Array<any>) {
        console.log("initFilesUrl")
        for (let i in filesUrl) {
            if (filesUrl[i].FileIdentifier) {
                let filesData: fileChoosenDataModel = {
                    file: null,
                    thumb: this.fileURL + filesUrl[i].FilePath,
                    Ref_File_ID: filesUrl[i].Ref_File_ID,
                    DisplayOrder: null
                }
                this.fileChoosenData[filesUrl[i].FileIdentifier].push(filesData);
                // this.addProfileForm.controls[filesUrl[i].FileIdentifier].setValue('uploaded')
                // this.addProfileForm.controls[filesUrl[i].FileIdentifier].updateValueAndValidity()
                (this.addProfileForm.controls[this.stepName[filesUrl[i].FileIdentifier]] as FormGroup).controls[filesUrl[i].FileIdentifier].setValue('uploaded');
                (this.addProfileForm.controls[this.stepName[filesUrl[i].FileIdentifier]] as FormGroup).controls[filesUrl[i].FileIdentifier].updateValueAndValidity();

            }
        }
    }


    //files start
    justFilesArray(ArrayData: Array<fileChoosenDataModel>) {
        let arrayReturn = []
        for (let i in ArrayData) {
            ArrayData[i].DisplayOrder = (1 + parseInt(i))
            if (ArrayData[i].Ref_File_ID == null)
                arrayReturn.push(ArrayData[i].file)
        }
        return arrayReturn
    }

    fileChoosen($event, fieldName) {
        console.log("fileChoosen", $event, typeof this.fileChoosenData[fieldName]);

        (this.addProfileForm.controls[this.stepName[fieldName]] as FormGroup).controls[fieldName].setValue('upload');
        (this.addProfileForm.controls[this.stepName[fieldName]] as FormGroup).controls[fieldName].updateValueAndValidity();

        if ($event.target.files.length > 0) {
            for (let file of $event.target.files) {
                this._base._commonService.readImage(file).subscribe((res: any) => {
                    let imgData: fileChoosenDataModel = { file: file, thumb: res, Ref_File_ID: null, DisplayOrder: null }
                    console.log("imageData", imgData)
                    this.fileChoosenData[fieldName] = [] //Empty Error
                    this.fileChoosenData[fieldName].push(imgData);
                })
            }
        }
    }

    getFileControlValue(fieldName) {
        let returnKey: string | null = null
        if (this.fileChoosenData[fieldName].length > 0) {
            let waitingUpload = this.fileChoosenData[fieldName].filter(item => item.Ref_File_ID == null)
            returnKey = waitingUpload.length > 0 ? 'upload' : 'uploaded'
        }
        return returnKey
    }

    removeFile(fieldName, fileIndex) {
        console.log("removeFile", fieldName, fileIndex)
        if (this.fileChoosenData[fieldName][fileIndex].Ref_File_ID != null)
            this.removeThumbnail(this.fileChoosenData[fieldName][fileIndex].Ref_File_ID)

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

    //files end


}
