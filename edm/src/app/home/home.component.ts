import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../_appModel/helpers';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { ApiConstant } from '../_appModel/apiconstant';
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
      this.router.navigate(['product/details', data.Ref_Object_ID]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }

}
