import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { ApiConstant } from './../../../_appModel/apiconstant'
import { from } from 'rxjs';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { environment } from './../../../../environments/environment.prod';
import { CategoryService } from './../../../_appService/category/category.serviec'
@Component({
  selector: 'appAdmin-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss']
})
export class TrackListComponent implements OnInit {
  data: any;
  moduleName;
  genrelist;
  constructor(public _base: BaseServiceHelper,
    public router: Router,
    private route: ActivatedRoute,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.moduleName = params['module'];
      this.getAllTracks();
      this.bindCategory();
    })
    
  }
  public getAllTracks() {
    this._base._ApiService.get(ApiConstant.TrackManagement.Track + '?TrackID=0').subscribe((data: any) => {
      if (this.moduleName == "Track") {
        data = data.filter(res => res.IsTrack == true);
      } else {
        data = data.filter(res => res.IsTrack == false);
      }
      console.log(data);
      this.data = data;
      this.data.filter(item => {
        item.ThumbnailImageUrl = environment.imageURL + item.ThumbnailImageUrl;
        item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
      })
    })
  }
  bindCategory() {
    this._categoryService.categorylist().subscribe((resData: any) => {
      let categoryData = []
      categoryData = Array.isArray(resData) ? resData : []
      console.log("categoryData", categoryData);
      this.genrelist = categoryData;
    });
  }
  filtergenre(id) {
    let genre = this.genrelist.filter(r => r.Ref_Category_ID == id);
    let genrename = genre[0].CategoryName;
    return genrename
  }
  public redirectToaddmodifytrack(trackId) {
    debugger;
    if (this.moduleName == "Track") {
      this.router.navigate(['admin/addmodifytracks/Track', trackId]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    } else {
      this.router.navigate(['admin/addmodifytracks/Beat', trackId]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }

}
