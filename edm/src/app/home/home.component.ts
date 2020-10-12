import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { Router } from '@angular/router';
import { GenService } from '../_appService/genservice/genservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  artistBranding = [];
  globalSearch = "";
  globalSearchData
  constructor(public _base: BaseServiceHelper,
    private _genService: GenService,
    public router: Router) { }
  ngOnInit(): void {
    this.getArtistBranding();
    this._base._commonService.FeatureProducts = 'Track'
  }
  getArtistBranding() {
    this._genService.getServiceByCategory(0, 10, 'ARTISTBRANDING').subscribe((data: any) => {
      this.artistBranding = data;
    })
  }
  getGlobalSearch() {
    if (this.globalSearch.length != 0) {
      this._base._commonService.globalSearch(this.globalSearch).subscribe((res: any) => {
        this.globalSearchData = res;
      });
    }
  }

  public redirecttopage(data) {
    console.log(data.Ref_Object_ID, data.ObjectType)
    if (data.ObjectType == 'TRACK' || data.ObjectType == 'BEAT') {
      this.router.navigate(['product/' + this._base._commonService.FeatureProducts + '/details', data.Ref_Object_ID]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }else if(data.ObjectType == 'SERVICE'){
      this.router.navigate(['service/details', data.Ref_Object_ID]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }

}
