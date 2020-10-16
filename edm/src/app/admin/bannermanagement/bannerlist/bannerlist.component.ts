import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { ApiConstant } from './../../../_appModel/apiconstant'
import { Router, ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'appAdmin-bannerlist',
  templateUrl: './bannerlist.component.html',
  styleUrls: ['./bannerlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BannerListComponent implements OnInit {
  data: any;

  constructor(public _base: BaseServiceHelper,
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._base._pageTitleService.setTitle("Banner Management", "Banner Management");
    this._base._commonService.showLoader();
    this._base._ApiService.get(ApiConstant.MasterManagement.CarouselList + '?CarouselID=0').subscribe((data: any) => {
      this.data = data;
      this._base._commonService.hideLoader();
    }, e => {
      this._base._commonService.hideLoader();
    })

  }
  public getAllBanners() {


  }
  public filterfile(FileManager, fileType) {
    let file = FileManager.filter(item => item.FileIdentifier == fileType)
    return this._base._commonService.cdnURL + file[0].FilePath
  }
  public redirectToaddmodifybanner(Id) {
    debugger;
    this.router.navigate(['/admin/banner', Id]).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
  public manageBanner(id, action) {
    this._base._commonService.showLoader();
    this._base._ApiService.get(ApiConstant.MasterManagement.ManageCarousel + '?BannerIDs=' + id + '&Action=' + action).subscribe((resp: any) => {
      console.log(resp);
      this._base._commonService.hideLoader();
      if (resp == "BANNERDELETE") {
        this._base._alertMessageService.success(" Banner deleted successfully!");
        this.ngOnInit();
      }
    }, e => {
      this._base._commonService.hideLoader();
    })

  }
}
