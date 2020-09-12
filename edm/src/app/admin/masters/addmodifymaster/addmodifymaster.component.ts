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
  parentmaster
  AllNonMandatorychecked: boolean = false
  AllMandatorychecked: boolean = false
  AllMasterdataselect: boolean = false
  public addmodifymaster: FormGroup;
  mandatorymasters: any[]
  nonmandatorymasters: any[]
  constructor(public _base: BaseServiceHelper,
    private fb: FormBuilder,
    private _mastersServices: MastersServices,
    public route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this._base._commonService.showLoader();
    this.route.params.subscribe(params => {
      this.usermasterID = params['id']
      this.modulename = params['module']
      if (this.modulename == 'master') {
        this.addmodifymaster = this.fb.group({
          masterName: ['', [Validators.required]],
          Description: ['', [Validators.required]],
          IsParent: ['', [Validators.required]],
          IsMandatory: ['', [Validators.required]],
        })
        this.getMasterlist();
        if (this.usermasterID != 0) {
          this._mastersServices.getMasterlist(this.usermasterID).subscribe(data => {
            this._base._commonService.hideLoader();
            this.addmodifymaster.value.masterName = data[0].UserMaster
            this.addmodifymaster.value.Description = data[0].Description
            this.addmodifymaster.value.IsParent = data[0].MandatoryMasterIDs == "0" || data[0].MandatoryMasterIDs == "" ? false : true;
            this.addmodifymaster.value.parentmaster = data[0].ParentIDs
            this.addmodifymaster.value.IsMandatory = data[0].IsMandatory
            this.masterName = data[0].UserMaster
            this.Description = data[0].Description
            this.IsParent = data[0].MandatoryMasterIDs == "0" || data[0].MandatoryMasterIDs == "" ? false : true;
            //this.parentmaster = data[0].MandatoryMasterIDs
            this.IsMandatory = data[0].IsMandatory
            this.Ref_UserMaster_ID == data[0].ParentIDs
          })
        } else {
          this._base._commonService.hideLoader();
          this.addmodifymaster.value.masterName = undefined
          this.addmodifymaster.value.Description = undefined
          this.addmodifymaster.value.IsParent = undefined
          this.addmodifymaster.value.parentmaster = undefined
          this.addmodifymaster.value.IsMandatory = undefined
        }
      } else {
        this.addmodifymaster = this.fb.group({
          masterName: ['', [Validators.required]],
          Description: ['', [Validators.required]],
          IsParent: ['', []],
          parentmaster: ['', [Validators.required]],
          IsMandatory: ['', []],
        })
        this.getMasterlist();
        if (this.usermasterID != 0) {
          this._mastersServices.getMasterDatalist(0, this.usermasterID).subscribe(data => {
            this._base._commonService.hideLoader();
            this.addmodifymaster.value.masterName = data[0].UserMasterData
            this.addmodifymaster.value.Description = data[0].Description
            this.addmodifymaster.value.parentmaster = data[0].Ref_UserMaster_ID
            this.masterName = data[0].UserMasterData
            this.Description = data[0].Description
            this.parentmaster = data[0].Ref_UserMaster_ID
            this.Ref_UserMaster_ID == data[0].Ref_UserMaster_ID
          })
        } else {
          this._base._commonService.hideLoader();
          this.addmodifymaster.value.masterName = undefined
          this.addmodifymaster.value.Description = undefined
          this.addmodifymaster.value.IsParent = undefined
          this.addmodifymaster.value.parentmaster = undefined
          this.addmodifymaster.value.IsMandatory = undefined
        }
      }
    });
  }
  // onItemSelect(item: any) {
  //   console.log('onItemSelect', item);
  //   this.nonMandatorymasterlist = this.nonparentmasterlist.filter(r =>r.Ref_UserMaster_ID !== item.Ref_UserMaster_ID)
  //   console.log(this.nonparentmasterlist)
  //   this.nonparentmasterlist = this.nonparentmasterlist
  // }
  // onItemDeSelect(item: any) {
  //   console.log('onItemSelect', item);
  // }
  // onSelectAll(items: any) {
  //   console.log('onSelectAll', items);
  // }
  // onSelecDetAll(items: any) {
  //   console.log('onSelecDetAll', items);
  // }
  // toogleShowFilter() {
  //   this.ShowFilter = !this.ShowFilter;
  //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  // }

  // handleLimitSelection() {
  //   if (this.limitSelection) {
  //     this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
  //   } else {
  //     this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
  //   }
  // }
  getMasterlist() {
    this._mastersServices.getMasterlist(0).subscribe(res => {
      this.masterlist = res;
      this.masterlist.map(item => {
        item.isMandatorychecked = false
        item.isnonMandatorychecked = false
      })
      // this.selectedItems = [];
      // this.dropdownSettings = {
      //   singleSelection: false,
      //   idField: 'Ref_UserMaster_ID',
      //   textField: 'UserMaster',
      //   selectAllText: 'Select All',
      //   unSelectAllText: 'UnSelect All',
      //   itemsShowLimit: 4,
      //   allowSearchFilter: true
      // };
      console.log(this.masterlist)
    })
  }
  selectallMandatory() {
    this.masterlist.filter(r => {
      r.isMandatorychecked = this.AllMandatorychecked
    })
  }
  selectallNonMandatory() {
    this.masterlist.filter(r => {
      r.isnonMandatorychecked = this.AllNonMandatorychecked
    })
  }
  selectMandatory() {
    if (this.masterlist.filter(master => (master.isMandatorychecked == true)).length == this.masterlist.length)
      this.AllMandatorychecked = true
    else
      this.AllMandatorychecked = false
  }
  selectNonMandatory() {
    if (this.masterlist.filter(master => (master.isnonMandatorychecked == true)).length == this.masterlist.length)
      this.AllNonMandatorychecked = true
    else
      this.AllNonMandatorychecked = false
  }
  getparentMasterlist(id) {
    debugger
    this.mandatorymasters = []
    this.nonmandatorymasters = []
    this._mastersServices.getParentMasterlist(id).subscribe((res: any) => {
      this.parentmasterlist = res;
      this.parentmasterlist.filter(item => {
        if (item.IsMandatory == true) {
          this.mandatorymasters.push({
            ref_UsermasterId: item.Ref_UserMaster_ID,
            isSelected: false
          })
        } else {
          this.nonmandatorymasters.push({
            ref_UsermasterId: item.Ref_UserMaster_ID,
            isSelected: false
          })
        }
        item.isSelected = false
        if (item.userMasterData.length != 0) {
          item.userMasterData.map(abc => {
            if (this.usermasterID == abc.Ref_UserMasterData_ID) {
              abc.isSelected = true
            } else {
              abc.isSelected = false
            }
          })
        }
      })
    })
  }
  SelectAllmasterlist(i, e) {
    this.parentmasterlist[i].userMasterData.filter(masterdata => {
      masterdata.isSelected = e.target.checked
    })
    console.log(this.parentmasterlist)
  }
  onSelectMasterData(index) {
    if (this.parentmasterlist[index].userMasterData.filter(masterdata => (masterdata.isSelected == true)).length == this.parentmasterlist[index].userMasterData.length)
      this.parentmasterlist[index].isSelected = true
    else
      this.parentmasterlist[index].isSelected = false
  }
  addmodifymastersubmit() {
    debugger;
    this._base._commonService.markFormGroupTouched(this.addmodifymaster);
    console.log(this.addmodifymaster.value.masterName)
    console.log(this.addmodifymaster.value.Description)
    console.log(this.addmodifymaster.value.IsParent)
    console.log(this.addmodifymaster.value.parentmaster)
    console.log(this.addmodifymaster.value.IsMandatory)
    if (this.addmodifymaster.valid) {
      this._base._commonService.showLoader();
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        let MandatoryMasterIDs = ""
        let NonMandatoryMasterIDs = ""
        if (this.modulename == 'master') {
          this.masterlist.filter(id => {
            if (id.isMandatorychecked == true) {
              MandatoryMasterIDs += (MandatoryMasterIDs == "" ? "" : ",") + id.Ref_UserMaster_ID;
            }
            if (id.isnonMandatorychecked == true) {
              NonMandatoryMasterIDs += (NonMandatoryMasterIDs == "" ? "" : ",") + id.Ref_UserMaster_ID;
            }
          })
          let ObjUserMaster = {
            "Ref_UserMaster_ID": this.usermasterID,
            "ControlName": this.addmodifymaster.value.masterName,
            "UserMaster": this.addmodifymaster.value.masterName,
            "Description": this.addmodifymaster.value.Description,
            "MandatoryMasterIDs": this.addmodifymaster.value.IsParent == true ? MandatoryMasterIDs : 0,
            "NonMandatoryMasterIDs": this.addmodifymaster.value.IsParent == true ? NonMandatoryMasterIDs : 0,
            "IsMandatory": this.addmodifymaster.value.IsMandatory,
            "IsActive": true,
            "AddedBy": FullName
          }
          this._mastersServices.addmodifyMaster(ObjUserMaster).subscribe(res => {
            console.log(res);
            alert(res);
            if (this.usermasterID == 0) {
              this.addmodifymaster.reset();
            }
            this._base._commonService.hideLoader();
          }, e => {
            this._base._commonService.hideLoader();
          })
        } else {
          console.log(this.mandatorymasters)
          console.log(this.nonmandatorymasters)
          let selectedMandatoryMasterIds = ""
          let selectedNonMandatoryMasterIds = ""
          let selectedMandatoryMasterdataIds = ""
          let selectedNonMandatoryMasterdataIds = ""
          this.parentmasterlist.filter(item => {
            // if(item.isSelected == true && item.IsMandatory == true){
            //   selectedMandatoryMasterIds += (selectedMandatoryMasterIds == "" ? "" : ",") + item.Ref_UserMaster_ID;
            // }
            // if(item.isSelected == true && item.IsMandatory == false){
            //   selectedNonMandatoryMasterIds += (selectedNonMandatoryMasterIds == "" ? "" : ",") + item.Ref_UserMaster_ID;
            // }
            if (item.userMasterData.length != 0) {
              item.userMasterData.filter(abc => {
                this.mandatorymasters.filter(z => {
                  if (z.ref_UsermasterId == item.Ref_UserMaster_ID && abc.isSelected) {
                    z.isSelected = true
                  }
                })
                this.nonmandatorymasters.filter(z => {
                  if (z.ref_UsermasterId == item.Ref_UserMaster_ID && abc.isSelected) {
                    z.isSelected = true
                  }
                })
                if (abc.isSelected == true && item.IsMandatory == true) {
                  selectedMandatoryMasterdataIds += (selectedMandatoryMasterdataIds == "" ? "" : ",") + abc.Ref_UserMasterData_ID;
                }
                if (abc.isSelected == true && item.IsMandatory == false) {
                  selectedNonMandatoryMasterdataIds += (selectedNonMandatoryMasterdataIds == "" ? "" : ",") + abc.Ref_UserMasterData_ID;
                }
              })
            }
          })
          this.parentmasterlist.filter(item => {
            this.mandatorymasters.filter(z => {
              if (z.ref_UsermasterId == item.Ref_UserMaster_ID && z.isSelected) {
                selectedMandatoryMasterIds += (selectedMandatoryMasterIds == "" ? "" : ",") + item.Ref_UserMaster_ID;
              }
            })
            this.nonmandatorymasters.filter(z => {
              if (z.ref_UsermasterId == item.Ref_UserMaster_ID && z.isSelected) {
                selectedNonMandatoryMasterIds += (selectedNonMandatoryMasterIds == "" ? "" : ",") + item.Ref_UserMaster_ID;
              }
            })
          })
          let ObjUserMasterData = {
            "Ref_UserMasterData_ID": this.usermasterID,
            "Ref_UserMaster_ID": this.parentmaster,
            "UserMasterData": this.addmodifymaster.value.masterName,
            "UserMaster": "",
            "Description": this.addmodifymaster.value.Description,
            "MandatoryMasterIDs": selectedMandatoryMasterIds,
            "NonMandatoryMasterIDs": selectedNonMandatoryMasterIds,
            "MandatoryMasterDataIDs": selectedMandatoryMasterdataIds,
            "NonMandatoryMasterDataIDs": selectedNonMandatoryMasterdataIds,
            "IsActive": true,
            "AddedBy": FullName
          }
          this._mastersServices.addmodifyMasterData(ObjUserMasterData).subscribe(res => {
            console.log(res);
            if (this.usermasterID == 0) {
              this.addmodifymaster.reset();
            }
            alert(res);
            this._base._commonService.hideLoader();
          }, e => {
            this._base._commonService.hideLoader();
          })
        }
      })
    }
  }

}
