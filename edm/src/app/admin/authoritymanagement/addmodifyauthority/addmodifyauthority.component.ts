import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorityServices } from './../_services/authority.services';
import { ActivatedRoute } from '@angular/router';
import { enAppSession } from 'src/app/_appModel/enAppSession';

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
  parentmasterlist
  modulelist: any;
  IsUser:boolean = false;
  IsAdmin:boolean = false;
  IsuserMaster:boolean =false
  AllMasterDatachecked:boolean=false;
  masterlist
  permissions = { IsView: false, IsEdit: false, IsDelete: false, IsApproval: false };
  public addmodifyauthority: FormGroup;
  mandatorymasters = []
  nonmandatorymasters = []
  constructor(public _base: BaseServiceHelper,
    private fb: FormBuilder,
    private _authorityServices: AuthorityServices,
    public route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this._base._commonService.showLoader();
    this.route.params.subscribe(params => {
      this.authorityID = params['id']
        this.addmodifyauthority = this.fb.group({
          AuthorityName: ['', [Validators.required]],
          Description: ['', [Validators.required]],
          masterdataID: ['', [Validators.required]],
          ModuleID: ['', []]
        })
       // this.getMasterdata();
        //this.getmodule()
        if (this.authorityID != 0) {
          this._base._pageTitleService.setTitle("Modify Authority", "Modify Authority");
          this._authorityServices.getAuthorityDetails(this.authorityID).subscribe(data => {
            this._base._commonService.hideLoader();
            this.addmodifyauthority.value.AuthorityName = data[0].AuthorityName
            this.AuthorityName = data[0].AuthorityName
            this.Description = data[0].Description
            this.addmodifyauthority.value.Description = data[0].Description
            this.masterdataID = data[0].MasterDataIDs
            this.ModuleID = data[0].ModuleAccess[0].Ref_Module_ID
            this.permissions.IsApproval = data[0].ModuleAccess[0].Approval
            this.permissions.IsDelete = data[0].ModuleAccess[0].Delete
            this.permissions.IsEdit = data[0].ModuleAccess[0].Edit
            this.permissions.IsView = data[0].ModuleAccess[0].View
            
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
  getmodule() {
    this._authorityServices.getModule().subscribe(res => {
      this.modulelist = res;
      this.modulelist.map(item =>{
        item.isModulechecked = false
      })
    })
  }
  getparentMasterlist(id) {
    debugger
    this.mandatorymasters = []
    this.nonmandatorymasters = []
    this._authorityServices.getParentMasterlist(id).subscribe((res: any) => {
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
            if (this.authorityID == abc.Ref_UserMasterData_ID) {
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
  // onSelectMasterData(index) {
  //   if (this.parentmasterlist[index].userMasterData.filter(masterdata => (masterdata.isSelected == true)).length == this.parentmasterlist[index].userMasterData.length)
  //     this.parentmasterlist[index].isSelected = true
  //   else
  //     this.parentmasterlist[index].isSelected = false
  // }
  getMasterdata(id) {
    this._authorityServices.getMasterData(id,0).subscribe(res => {
      this.masterdatalist = res;
      this.masterdatalist.map(item =>{
        item.isMasterDatachecked = false
      })
      console.log(this.masterdatalist)
    })
  }//9307528321
  getMasterlist() {
    this._authorityServices.getMasterlist(0).subscribe(res => {
      this.masterlist = res;
      this.masterlist.map(item =>{
        item.isMasterchecked = false
      })
      console.log(this.masterlist)
    })
  }
  // selectallMas(){
  //   this.masterlist.filter(r =>{
  //    r.isMandatorychecked = this.AllMandatorychecked
  //  })
// }
 selectallMasterData(){
  this.masterlist.filter(r =>{
     r.isMasterDatachecked = this.AllMasterDatachecked
   })
 }
 selectMaster(e){
  console.log(e.target.value)
  this.masterdatalist = []
  this.getparentMasterlist(e.target.value)
  this.getMasterdata(e.target.value)
}
onSelectMasterData(){
  // console.log(e)
   if(this.masterdatalist.filter( master => (master.isMasterDatachecked == true)).length == this.masterdatalist.length)
   this.AllMasterDatachecked = true
   else
   this.AllMasterDatachecked = false
  // this.getMasterdata()
 }
 onSelectModule(){
   
 }
  addmodifyauthoritysubmit() {
    debugger;
    console.log(this.permissions)
    this._base._commonService.markFormGroupTouched(this.addmodifyauthority);
    console.log(this.addmodifyauthority.value.AuthorityName)
    console.log(this.addmodifyauthority.value.Description)
    console.log(this.addmodifyauthority.value.masterdataID)
    if (this.addmodifyauthority.valid) {
      this._base._commonService.showLoader();
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
        let AuthorityType = "";
        if(this.IsAdmin == true){
          AuthorityType += (AuthorityType == "" ? "" : ",") + "Admin";
        }
        if(this.IsUser == true){
          AuthorityType += (AuthorityType == "" ? "" : ",") + "User";
        }
          let ObjUserMaster = {
            "Ref_Authority_ID": this.authorityID,
            "AuthorityName": this.addmodifyauthority.value.AuthorityName,
            "AuthorityType": AuthorityType,
            "Description": this.addmodifyauthority.value.Description,
            "MasterDataIDs":this.addmodifyauthority.value.masterdataID,
            "CreatedBy": FullName,
            "ModuleAccess": [
              {
                "Ref_Module_ID": this.ModuleID,
                "View": this.permissions.IsView,
                "Edit": this.permissions.IsEdit,
                "Delete": this.permissions.IsDelete,
                "Approval": this.permissions.IsApproval
              }
            ]
          }
          this._authorityServices.addmodifyauthority(ObjUserMaster).subscribe(res => {
            console.log(res);
            alert(res);
            if (this.authorityID == 0) {
              this.addmodifyauthority.reset();
            }
            this._base._commonService.hideLoader();
          }, e => {
            this._base._commonService.hideLoader();
          })

      })

    }

  }

 
}
