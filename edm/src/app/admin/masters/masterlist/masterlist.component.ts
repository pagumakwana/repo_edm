import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { MastersServices } from './../_services/master.services';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'appAdmin-masterlist',
  templateUrl: './masterlist.component.html',
  styleUrls: ['./masterlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MasterListComponent implements OnInit {
  data: any;
  modulename;
 
  constructor(public _base: BaseServiceHelper,
    private _mastersServices: MastersServices,
    public route: ActivatedRoute,
    public router: Router,) { }

  ngOnInit(): void {
    this._base._commonService.showLoader();
    this.route.params.subscribe(params => {
      this.modulename = params['module'];
      if(this.modulename == 'master'){
        this._mastersServices.getMasterlist(0).subscribe(data =>{
          this._base._commonService.hideLoader();
          this.data = data
        })
      }else{
        this._mastersServices.getMasterDatalist(0, 0).subscribe(data =>{
          this.data = data
          this._base._commonService.hideLoader();
        })
      }
    });
   
  }
 
  redirectToaddmodifymaster(id){
    if (this.modulename == "master") {
      this.router.navigate(['/admin/config/addmodifymasters/master', id]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    } else {
      this.router.navigate(['/admin/config/addmodifymasters/masterdata', id]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }

 
}
