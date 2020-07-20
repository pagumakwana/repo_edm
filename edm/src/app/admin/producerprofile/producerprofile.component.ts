import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-producerprofile',
    templateUrl: './producerprofile.component.html',
    styleUrls: ['./producerprofile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProducerProfileComponent implements OnInit {

    constructor(private _base: BaseServiceHelper, private fb: FormBuilder) { }
    ngOnInit(): void {
    }

    addProfileForm = this.fb.group({
        step1: this.fb.group({
            ProfilePhoto: [''],
            FullName: ['', [Validators.required]],
            Bio: [''],
        }),
        step2: this.fb.group({
            SocialProfileUrl: ['']
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

    // missing fields
    // country ?
    // studio gears ?
    // SocialProfileUrl is for FB,soundclould or spotify ?

    changeDirect(stage: number) {
        this.stage.current = stage
    }

    changeStage() {
        let currentFormGroup: FormGroup | any = this.addProfileForm.controls['step' + this.stage.current]
        this._base._commonService.markFormGroupTouched(currentFormGroup)
        // this._base._commonService.markFormGroupTouched(this.addProfileForm.controls['step' + this.stage.current])
        console.log("changeStage", this.addProfileForm, currentFormGroup)
        if (currentFormGroup.valid) {
            if (this.stage.completed < this.stage.total) {
                this.stage.completed++
                this.stage.current = this.stage.completed;
            }
        }

    }


}
