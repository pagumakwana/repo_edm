import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorityServices } from './../_services/authority.services';
import { ActivatedRoute } from '@angular/router';
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { of } from 'rxjs';

@Component({
  selector: 'appAdmin-addmodifyauthority',
  templateUrl: './addmodifyauthority.component.html',
  styleUrls: ['./addmodifyauthority.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddModifyAuthorityComponent implements OnInit {

  authorityID;
  AuthorityName: null
  Description: null
  masterdataID: null
  ModuleID
  masterdatalist: any = []
  masterdatas = of()
  parentmasterlist
  modulelist: any = [];
  IsAuthorityTypeChecked: boolean = false
  IsModuleChecked: boolean = false
  IsUser: boolean = false;
  IsAdmin: boolean = false;
  IsuserMaster: boolean = false
  AllMasterDatachecked: boolean = false;
  masterlist
  public addmodifyauthority: FormGroup;
  constructor(public _base: BaseServiceHelper,
    private fb: FormBuilder,
    private _authorityServices: AuthorityServices,
    public route: ActivatedRoute, ) {

  }

  ngOnInit(): void {
    this._base._commonService.showLoader();
    this.route.params.subscribe(params => {
      this.authorityID = params['id']
      this.addmodifyauthority = this.fb.group({
        AuthorityName: ['', [Validators.required]],
        Description: ['', [Validators.required]],
        ModuleID: ['', []]
      })
      if (this.authorityID != 0) {
        this._base._pageTitleService.setTitle("Modify Authority", "Modify Authority");
        this._authorityServices.getAuthorityDetails(this.authorityID).subscribe(data => {
          debugger;
         // this._base._commonService.hideLoader();
          this.addmodifyauthority.value.AuthorityName = data[0].AuthorityName
          this.AuthorityName = data[0].AuthorityName
          this.Description = data[0].Description
          this.addmodifyauthority.value.Description = data[0].Description
          this.masterdataID = data[0].MasterDataIDs
          this.ModuleID = data[0].ModuleAccess
          this.getMasterlist()
          this.bindAuthorityType(data[0].AuthorityType)
          this.bindMasterData(data[0].MasterDataIDs)
          this._base._commonService.hideLoader();
        })
      } else {
        this._base._pageTitleService.setTitle("Add Authority", "Add Authority");
        this._base._commonService.hideLoader();
        this.addmodifyauthority.value.AuthorityName = undefined
        this.addmodifyauthority.value.Description = undefined
        this.addmodifyauthority.value.masterdataID = undefined
        this.addmodifyauthority.value.ModuleID = undefined
        this.ModuleID = undefined
      }

    });
  }
  bindAuthorityType(AuthorityType) {
    let Atype = AuthorityType.split(',')
    Atype.filter(a => {
      if (a == "Admin") {
        this.IsAdmin = true
        this.getmodule()
      }
      if (a == "User") {
        this.IsUser = true
      }
    })

  }
  bindMasterData(MasterDataIDs) {
    let MasterData = MasterDataIDs.split(',')
    if (MasterData[0] == "") {
      this.IsuserMaster = false
    } else {
      this.IsuserMaster = true
      console.log(MasterData)
      MasterData = MasterData.filter(b => b != "")
      let Sequence = []
      let MasterID = []
      let UserMaster = []
      for (let i = 0; i < MasterData.length; i++) {
        this._authorityServices.getMasterData(0, MasterData[i]).subscribe((data: any) => {
          this.masterlist.map(ab => {
            if (ab.Ref_UserMaster_ID == data[0].Ref_UserMaster_ID) {
              ab.isMasterchecked = true
              Sequence.push(ab.Sequence)
              MasterID.push(ab.Ref_UserMaster_ID)
              UserMaster.push(ab.UserMaster)
              if (i === MasterData.length - 1) {
                this.selectMaster(Sequence, ab.isMasterchecked, MasterID, UserMaster, MasterData)
              }

            }
          })
        })
      }
    }
  }
  getmodule() {
    if (this.IsAdmin || this.IsUser) {
      this.IsAuthorityTypeChecked = false
    } else {
      this.IsAuthorityTypeChecked = false
    }
    if (this.IsAdmin) {
      this.getModulelist()
    }

  }
  getModulelist(){
    this._authorityServices.getModule().subscribe(res => {
      this.modulelist = res;
      if (this.ModuleID != undefined) {
        this.modulelist.map(item => {
          item.isModulechecked = false
          item.ModuleAccess =
          {
            "Ref_Module_ID": item.Ref_Module_ID,
            "View": false,
            "Edit": false,
            "Delete": false,
            "Approval": false
          }
          this.ModuleID.filter(y => {
            if (item.Ref_Module_ID == y.Ref_Module_ID) {
              item.isModulechecked = true
              item.ModuleAccess = y
            }
          })
        })
      } else {
        this.modulelist.map(item => {
          item.isModulechecked = false
          item.ModuleAccess =
          {
            "Ref_Module_ID": item.Ref_Module_ID,
            "View": false,
            "Edit": false,
            "Delete": false,
            "Approval": false
          }
        })
      }
      console.log(this.modulelist)
    })
  }
  // getparentMasterlist(id) {
  //   debugger
  //   this.mandatorymasters = []
  //   this.nonmandatorymasters = []
  //   this._authorityServices.getParentMasterlist(id).subscribe((res: any) => {
  //     this.parentmasterlist = res;
  //     this.parentmasterlist.filter(item => {
  //       if (item.IsMandatory == true) {
  //         this.mandatorymasters.push({
  //           ref_UsermasterId: item.Ref_UserMaster_ID,
  //           isSelected: false
  //         })
  //       } else {
  //         this.nonmandatorymasters.push({
  //           ref_UsermasterId: item.Ref_UserMaster_ID,
  //           isSelected: false
  //         })
  //       }
  //       item.isSelected = false
  //       if (item.userMasterData.length != 0) {
  //         item.userMasterData.map(abc => {
  //           if (this.authorityID == abc.Ref_UserMasterData_ID) {
  //             abc.isSelected = true
  //           } else {
  //             abc.isSelected = false
  //           }
  //         })
  //       }
  //     })
  //   })
  // }
  SelectAllmasterlist(i, e) {
    this.parentmasterlist[i].userMasterData.filter(masterdata => {
      masterdata.isSelected = e.target.checked
    })
    console.log(this.parentmasterlist)
  }
  getMasterlist() {
    this.masterdatalist = []
    this._authorityServices.getMasterlist(0).subscribe(res => {
      this.masterlist = res;
      let i = 1;
      this.masterlist.map(item => {
        item.isMasterchecked = false
        item.isMasterdisabled = false
        item.Sequence = i++
      })
      console.log(this.masterlist)
    })
  }
  selectMaster(index, checked, Ref_UserMaster_ID, UserMaster, masterDataID) {
    if (checked) {
      if (masterDataID != 0) {
        for (let i = 0; i < Ref_UserMaster_ID.length; i++) {
          this._authorityServices.getMasterData(Ref_UserMaster_ID[i], 0).subscribe((data: any) => {
            data.map(ab => {
              ab.isSelected = false
              masterDataID.filter(x => {
                if (x == ab.Ref_UserMasterData_ID) {
                  ab.isSelected = true
                }
              })

            })
            let obj = {
              masterIDchecked: checked,
              isSelected: false,
              sequence: index[i],
              Ref_UserMaster_ID: Ref_UserMaster_ID[i],
              UserMaster: UserMaster[i],
              MasterData: data
            }
            this.masterdatalist = this.masterdatalist.filter(abv => abv.Ref_UserMaster_ID != Ref_UserMaster_ID[i])
            this.masterdatalist.push(obj)
            this.masterdatalist = this.masterdatalist.sort((a, b) => a.sequence - b.sequence)
            this.masterdatas = of(this.masterdatalist)
            console.log(this.masterdatalist)
            this._base._commonService.hideLoader();
          })

        }
      } else {
        this._authorityServices.getMasterData(Ref_UserMaster_ID, 0).subscribe((res: any) => {
          res.map(ab => {
            ab.isSelected = false
            if (masterDataID == ab.Ref_UserMasterData_ID) {
              ab.isSelected = true
            }
          })
          let obj = {
            masterIDchecked: checked,
            isSelected: false,
            sequence: index,
            Ref_UserMaster_ID: Ref_UserMaster_ID,
            UserMaster: UserMaster,
            MasterData: res
          }
          this.masterdatalist = this.masterdatalist.filter(abv => abv.Ref_UserMaster_ID != Ref_UserMaster_ID)
          this.masterdatalist.push(obj)
          this.masterdatalist = this.masterdatalist.sort((a, b) => a.sequence - b.sequence)
          this.masterdatas = of(this.masterdatalist)
          console.log(this.masterdatalist)
        })
      }

    } else {
      this.masterdatalist = this.masterdatalist.filter(abv => abv.Ref_UserMaster_ID != Ref_UserMaster_ID)
      this.masterdatas = of(this.masterdatalist)
      console.log(this.masterdatalist)
    }

    // this.masterdatalist = []
    // this.getparentMasterlist(Ref_UserMaster_ID)
    // this.getMasterdata(e.target.value)
  }
  onSelectMasterData() {
    if (this.masterdatalist.filter(master => (master.isMasterDatachecked == true)).length == this.masterdatalist.length)
      this.AllMasterDatachecked = true
    else
      this.AllMasterDatachecked = false
  }
  itemtrackby(index: number, item) {
    return item.Ref_UserMaster_ID
  }
  onSelectModule() {
    let data = this.modulelist.filter(item => item.isModulechecked == true)
    if (data.length == 0) {
      this.IsModuleChecked = true
    } else {
      this.IsModuleChecked = false
    }

  }
  addmodifyauthoritysubmit() {
    debugger;
    this._base._commonService.markFormGroupTouched(this.addmodifyauthority);
    if (this.IsAdmin || this.IsUser) {
      let data = this.modulelist.filter(item => item.isModulechecked == true)
      if (this.IsAdmin && data.length != 0) {
        this.submitdata()
      } else if (this.IsUser) {
        this.submitdata()
      } else {
        this.IsModuleChecked = true
      }

    } else {
      this.IsAuthorityTypeChecked = true
    }
  }

  submitdata() {
    if (this.addmodifyauthority.valid) {
      this.IsAuthorityTypeChecked = false
      this.IsModuleChecked = false
      this._base._commonService.showLoader();
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        let AuthorityType = "";
        if (this.IsAdmin == true) {
          AuthorityType += (AuthorityType == "" ? "" : ",") + "Admin";
        }
        if (this.IsUser == true) {
          AuthorityType += (AuthorityType == "" ? "" : ",") + "User";
        }
        let selectedMandatoryMasterdataIds = ""
        this.masterdatalist.filter(item => {
          item.MasterData.filter(abc => {
            if (abc.isSelected) {
              selectedMandatoryMasterdataIds += (selectedMandatoryMasterdataIds == "" ? "" : ",") + abc.Ref_UserMasterData_ID;
            }
          })
        })
        let ModuleAccess = [];
        this.modulelist.filter(mod => {
          if (mod.isModulechecked) {
            ModuleAccess.push(mod.ModuleAccess)
          }
        })
        let ObjUserMaster = {
          "Ref_Authority_ID": this.authorityID,
          "AuthorityName": this.addmodifyauthority.value.AuthorityName,
          "AuthorityType": AuthorityType,
          "Description": this.addmodifyauthority.value.Description,
          "MasterDataIDs": selectedMandatoryMasterdataIds,
          "CreatedBy": Ref_User_ID,
          "ModuleAccess": ModuleAccess
        }
        console.log(ObjUserMaster)
        this._authorityServices.addmodifyauthority(ObjUserMaster).subscribe(res => {
          console.log(res);
          if (res == "AUTHORITYADDED") {
            this._base._alertMessageService.success("Authority Added successfully!");
            this.addmodifyauthority.reset();
            this.IsAdmin = false
            this.IsUser= false
            this.IsuserMaster  = false
            this.masterlist = []
            this.masterdatalist = []
          }
          if (res == "AUTHORITYUPDATED") {
            this._base._alertMessageService.success("Authority Modify successfully!");
          }
          this._base._commonService.hideLoader();
        }, e => {
          this._base._commonService.hideLoader();
        })

      })

    }
  }
}
