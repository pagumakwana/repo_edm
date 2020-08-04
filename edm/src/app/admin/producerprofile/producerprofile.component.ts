import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileUpdateModel } from 'src/app/_appModel/profileupdate/profileupdate.model';
import { ProfileUpdateService } from 'src/app/_appService/profileupdate/profileupdate.service';

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
            } else {
                this.generateProfile()
            }
        }
    }

    generateProfile() {

        this.addProfile.FullName = this.addProfileForm.value.step1.FullName;
        this.addProfile.EmailID = this.addProfileForm.value.step3.EmailID;
        this.addProfile.ProfilePhoto = null;
        this.addProfile.Bio = this.addProfileForm.value.step1.Bio;
        this.addProfile.SocialProfileUrl = `${this.addProfileForm.value.step2.FacebookUrl}|${this.addProfileForm.value.step2.SoundCloudUrl}|${this.addProfileForm.value.step2.SpotifyUrl}`;
        this.addProfile.StudioGears = this.addProfileForm.value.step1.StudioGears;
        this.addProfile.GovitID = this.addProfileForm.value.step3.GovitID;
        this.addProfile.PayPalEmailID = this.addProfileForm.value.step3.PayPalEmailID;
        this.addProfile.UserMasterDataIDs = this.addProfileForm.value.step1.UserMasterDataIDs;
        this.saveProfile()
    }

    saveProfile() {
        console.log("saveProfile", this.addProfileForm, this.addProfile)
        this._profileService.SignUp(this.addProfile).subscribe((res: any) => {
            console.log("saveProfile_res", res)
            $('#acknowledge_popup').modal('show')
            setTimeout(() => { $('#acknowledge_popup').modal('hide'); this._base._router.navigate(['admin']) }, 3000);

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

            let StudioGears: Array<string> = Array.isArray(this.addProfile.StudioGears) ? this.addProfile.StudioGears.split('|') : [];
            if (StudioGears.length == 3) {
                (this.addProfileForm.controls.step2 as FormGroup).controls.FacebookUrl.setValue(StudioGears[0]);
                (this.addProfileForm.controls.step2 as FormGroup).controls.SoundCloudUrl.setValue(StudioGears[1]);
                (this.addProfileForm.controls.step2 as FormGroup).controls.SpotifyUrl.setValue(StudioGears[2]);
            }

            (this.addProfileForm.controls.step3 as FormGroup).controls.PayPalEmailID.setValue(this.addProfile.PayPalEmailID);
            (this.addProfileForm.controls.step3 as FormGroup).controls.EmailID.setValue(this.addProfile.EmailID);
            (this.addProfileForm.controls.step3 as FormGroup).controls.GovitID.setValue(this.addProfile.GovitID);
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


}
