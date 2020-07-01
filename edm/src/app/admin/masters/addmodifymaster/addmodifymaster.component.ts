import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MastersServices } from './../_services/master.services';
import { ActivatedRoute } from '@angular/router';
import { enAppSession } from 'src/app/_appModel/enAppSession';
@Component({
  selector: 'appAdmin-addmodifymaster',
  templateUrl: './addmodifymaster.component.html',
  styleUrls: ['./addmodifymaster.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifyMasterComponent implements OnInit {
  usermasterID;
  modulename;
  masterName: null
  Description: null
  IsMandatory: null
  IsParent
  parentmasterlist: any
  masterlist: any;
  Ref_UserMaster_ID;
  parentmaster: any
  constructor(public _base: BaseServiceHelper,
    private fb: FormBuilder,
    private _mastersServices: MastersServices,
    public route: ActivatedRoute,) {

  }
  addmodifymaster: FormGroup = this.fb.group({
    masterName: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    IsParent: ['', [Validators.required]],
    parentmaster: ['', [Validators.required]],
    IsMandatory: ['', [Validators.required]],
  })
  ngOnInit(): void {
    console.log(this.masterName)
    console.log(this.Description)
    console.log(this.IsParent)
    console.log(this.parentmaster)
    console.log(this.IsMandatory)
    this.route.params.subscribe(params => {
      this.usermasterID = params['id']
      this.modulename = params['module']
      if (this.modulename == 'master') {
        if (this.usermasterID != 0) {
          this.getParentMasterlist();
          this._mastersServices.getMasterlist(this.usermasterID).subscribe(data => {
            this.addmodifymaster.value.masterName = data[0].UserMaster
            this.addmodifymaster.value.Description = data[0].Description
            this.addmodifymaster.value.IsParent = data[0].MandatoryMasterIDs== ""? false: true;
            this.addmodifymaster.value.parentmaster = data[0].ParentIDs
            this.addmodifymaster.value.IsMandatory = data[0].IsMandatory
            this.masterName = data[0].UserMaster
            this.Description = data[0].Description
            this.IsParent = data[0].MandatoryMasterIDs== ""? false: true;
            this.parentmaster = data[0].MandatoryMasterIDs
            this.IsMandatory = data[0].IsMandatory
            this.Ref_UserMaster_ID == data[0].ParentIDs
          })
        } else {
          this.addmodifymaster.value.masterName = undefined
          this.addmodifymaster.value.Description = undefined
          this.addmodifymaster.value.IsParent = undefined
          this.addmodifymaster.value.parentmaster = undefined
          this.addmodifymaster.value.IsMandatory = undefined
        }
      } else {
        this.getMasterlist();
        if (this.usermasterID != 0) {
          this._mastersServices.getMasterDatalist(this.usermasterID).subscribe(data => {
            this.addmodifymaster.value.masterName = data[0].UserMasterData
            this.addmodifymaster.value.Description = data[0].Description
            this.addmodifymaster.value.parentmaster = 2
            this.masterName = data[0].UserMasterData
            this.Description = data[0].Description
            this.parentmaster = 2
            this.Ref_UserMaster_ID == 2
          })
        } else {
          this.addmodifymaster.value.masterName = undefined
          this.addmodifymaster.value.Description = undefined
          this.addmodifymaster.value.IsParent = undefined
          this.addmodifymaster.value.parentmaster = undefined
          this.addmodifymaster.value.IsMandatory = undefined
        }
      }

    });
  }
  getParentMasterlist() {
    this._mastersServices.getParentMasterlist(0).subscribe(res => {
      this.parentmasterlist = res;
    })
  }
  getMasterlist() {
    this._mastersServices.getMasterlist(0).subscribe(res => {
      this.masterlist = res;
    })
  }
  addmodifymastersubmit() {
    debugger;
    this._base._commonService.markFormGroupTouched(this.addmodifymaster);
    console.log(this.addmodifymaster.value.masterName)
    console.log(this.addmodifymaster.value.Description)
    console.log(this.addmodifymaster.value.IsParent)
    console.log(this.addmodifymaster.value.parentmaster)
    console.log(this.addmodifymaster.value.IsMandatory)
    // if(this.addmodifymaster.valid){
    this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
      if (this.modulename == 'master') {
        let ObjUserMaster = {
          "Ref_UserMaster_ID": this.usermasterID,
          "ControlName": this.addmodifymaster.value.masterName,
          "UserMaster": this.addmodifymaster.value.masterName,
          "Description": this.addmodifymaster.value.Description,
          "MandatoryMasterIDs": "string",
          "NonMandatoryMasterIDs": "string",
          "IsMandatory": this.addmodifymaster.value.IsMandatory,
          "IsActive": true,
          "AddedBy": FullName
        }
        this._mastersServices.addmodifyMaster(ObjUserMaster).subscribe(res => {
          console.log(res);
        })
      } else {
        let ObjUserMasterData = {
          "Ref_UserMasterData_ID": this.usermasterID,
          "Ref_UserMaster_ID":this.addmodifymaster.value.parentmaster,
          "UserMasterData": this.addmodifymaster.value.masterName,
          "UserMaster": "",
          "Description": this.addmodifymaster.value.Description,
          "MandatoryMasterIDs": "",
          "NonMandatoryMasterIDs": "",
          "IsActive": true,
          "AddedBy": FullName
        }
        this._mastersServices.addmodifyMasterData(ObjUserMasterData).subscribe(res => {
          console.log(res);
        })
      }

    })

  }



}
