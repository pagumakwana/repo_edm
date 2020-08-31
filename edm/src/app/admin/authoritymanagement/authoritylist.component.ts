import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { AuthorityServices } from './_services/authority.services';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'appAdmin-authoritylist',
  templateUrl: './authoritylist.component.html',
  styleUrls: ['./authoritylist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthorityListComponent implements OnInit {

  data: any;
  modulename;
  constructor(public _base: BaseServiceHelper,
    private _authorityServices: AuthorityServices,
    public route: ActivatedRoute,
    public router: Router,) { }

  ngOnInit(): void {
    this._base._commonService.showLoader();
        this._authorityServices.getAuthoritylist().subscribe(data =>{
          this._base._commonService.hideLoader();
          this.data = data
        })
        this._base._pageTitleService.setTitle("Authority", "Authority");
  }
  redirectToaddmodifyauthority(id){
      this.router.navigate(['/admin/authority', id]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
  }

 
}
