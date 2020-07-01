import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { ApiConstant } from './../../../_appModel/apiconstant'
import { from } from 'rxjs';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { environment } from './../../../../environments/environment.prod';
import { CategoryService } from './../../../_appService/category/category.serviec'
@Component({
  selector: 'appAdmin-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TrackListComponent implements OnInit {
  data: any;
  moduleName;
  genrelist;
  audio;
  audioplay: boolean = false;
  constructor(public _base: BaseServiceHelper,
    public router: Router,
    private route: ActivatedRoute,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    debugger;
    this.route.params.subscribe(params => {
      this.moduleName = params['module'];
      this.bindCategory();
      this.getAllTracks("0");
    })

  }
  public getAllTracks(genreid) {
    this._base._ApiService.get(ApiConstant.TrackManagement.Track + '?TrackID=0').subscribe((data: any) => {
      if (this.moduleName == "Track") {
        data = data.filter(res => res.IsTrack == true);
      } else {
        data = data.filter(res => res.IsTrack == false);
      }
      console.log(data);
      if (genreid != "0") {
        this.data = data.filter(a => a.Ref_Category_ID == genreid);
        this.data.filter(item => {
          item.ThumbnailImageUrl = environment.imageURL + item.ThumbnailImageUrl;
          item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
        })
      } else {
        this.data = data;
        this.data.filter(item => {
          item.ThumbnailImageUrl = environment.imageURL + item.ThumbnailImageUrl;
          item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
        })
        console.log(this.data);
      }

    })
  }
  bindCategory() {
    this._categoryService.categorylist('ALL',0).subscribe((resData: any) => {
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
  onGenreChange(e) {
    if (e == "0") {
      this.getAllTracks("0");
    } else {
      this.getAllTracks(e);
    }
    console.log(e);
  }
  onPriceChange(e) {
    this.data.sort(this.GetSortOrder("Price", e));
    for (var item in this.data) {
    }
  }
  GetSortOrder(prop, e) {
    return function (a, b) {
      if (e == "0") {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      } else {
        if (a[prop] < b[prop]) {
          return 1;
        } else if (a[prop] > b[prop]) {
          return -1;
        }
        return 0;
      }

    }
  }
  playaudio(path) {
    if (!this.audioplay) {
      this.audio = new Audio();
      this.audio.src = environment.imageURL + path;
      this.audio.load();
      this.audio.play();
      this.audioplay = true;
    } else {
      this.audio.pause();
      this.audioplay = false;
    }



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
