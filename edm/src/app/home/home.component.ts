import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../_appModel/helpers';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { enAppSession } from '../_appModel/enAppSession';
import { RegisterService } from '../_appService/register.service';
import { ApiConstant } from '../_appModel/apiconstant';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  artistBranding = [];
  globalSearch="";
  globalSearchData
  constructor(public _base: BaseServiceHelper) { }
  ngOnInit(): void {
    this.getArtistBranding();
  }
  getArtistBranding() {
    debugger;
    this._base._ApiService.get(ApiConstant.Service.Service + '?StartCount=0&EndCount=5&CategoryName=Artist%20Branding').subscribe((data: any) => {
      this.artistBranding = data;
      this.artistBranding.map(item => {
        item.ThumbnailImageUrl = environment.cdnURL + item.ThumbnailImageUrl;
      })
    })
  }
  getGlobalSearch() {
    if(this.globalSearch.length != 0){
      this._base._ApiService.get(ApiConstant.Shared.GlobalSearch + '?SearchKeyWord=' + this.globalSearch).subscribe((res: any) => {
        this.globalSearchData = res;
        this.globalSearchData.map(item => {
          item.ThumbnailImageUrl = environment.cdnURL + item.ThumbnailImageUrl;
        })
      })
    }
     
  
  }
  public redirecttopage(data){
      console.log(data.Ref_Object_ID, data.ObjectType)
  }

}
