import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { ApiConstant } from './../../../_appModel/apiconstant'
import { from } from 'rxjs';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { environment } from './../../../../environments/environment.prod';
import { CategoryService } from './../../../_appService/category/category.serviec';
import { enAppSession } from './../../../_appModel/enAppSession';
import * as bootstrap from "bootstrap"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  audio = new Audio();
  audioplay: boolean = false;
  playpause: string = 'play'
  rejectReason;
  rejectTrackId;
  public addrejectreason: FormGroup;
  filteredProducts;
  filter = { Approved: false, SoldOut: false, Rejected: false, Pending: false };
  constructor(public _base: BaseServiceHelper,
    public router: Router,
    private route: ActivatedRoute,
    private _categoryService: CategoryService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    debugger;
    this.route.params.subscribe(params => {
      this.moduleName = params['module'];
      this._base._commonService.showLoader();
      this._categoryService.categorylist('ALL',0).subscribe((resData: any) => {
        let categoryData = []
        categoryData = Array.isArray(resData) ? resData : []
        console.log("categoryData", categoryData);
        this.genrelist = categoryData;
        this.getAllTracks("0", 'All');
      },e =>{
        this._base._commonService.hideLoader();
      });
       
     
    })
    this._base._pageTitleService.setTitle("All Tracks / Beats", "All Tracks / Beats");
    this.addrejectreason = this.fb.group({
      rejectReason: ['', [Validators.required]]
    })

  }
  public getAllTracks(genreid, status) {
 
    this._base._ApiService.get(ApiConstant.TrackManagement.Track + '?TrackID=0').subscribe((data: any) => {
      if (this.moduleName == "Track") {
        data = data.filter(res => res.IsTrack == true);
      } else {
        data = data.filter(res => res.IsTrack == false);
      }
      console.log(data);
      if (genreid != "0") {
        this.data = data.filter(a => a.Ref_Category_ID == genreid);
        this._base._commonService.hideLoader();
        this.data.filter(item => {
          item.ThumbnailImageUrl = environment.cdnURL + item.ThumbnailImageUrl;
          item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
        })
        this.filteredProducts = this.data;
        
      } else {
        this._base._commonService.hideLoader();
        if(status != "All"){
          this.data = data.filter(a => a.TrackStatus == status.toUpperCase());
          this.data.map(item => {
            item.ThumbnailImageUrl = environment.cdnURL + item.ThumbnailImageUrl;
            item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
          })
          this.filteredProducts = this.data;
        }else{
          this.data = data
          this.data.map(item => {
            item.ThumbnailImageUrl = environment.cdnURL + item.ThumbnailImageUrl;
            item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
          })
          this.filteredProducts = this.data;
        }
        //this.data = data;
       
        console.log(this.data);
       
      }

    },e=>{
      this._base._commonService.hideLoader();
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
    let genrename
    if(genre.length != 0){
      genrename= genre[0].CategoryName;
    }
    return genrename
    
  }
  onGenreChange(e) {
    if (e == "0") {
      this.getAllTracks("0",'All');
    } else {
      this.getAllTracks(e, 'All');
    }
    console.log(e);
  }
  onPriceChange(e) {
    this.filteredProducts.sort(this.GetSortOrder("Price", e));
    for (var item in this.filteredProducts) {
    }
  }
  onStatusChange(status){
    if(!this.filter.Approved && !this.filter.SoldOut && !this.filter.Rejected && !this.filter.Pending){
      this.filteredProducts = this.data
    }else{
      this.filteredProducts = this.data.filter(x => 
        (x.TrackStatus == 'Approve' && this.filter.Approved)
        || (x.TrackStatus == 'SoldOut' && this.filter.SoldOut)
        || (x.TrackStatus == 'REJACTED' && this.filter.Rejected)
        || (x.TrackStatus == 'Pending' && this.filter.Pending)
     );
     console.log( this.filteredProducts)
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
  playaudio(path, id, data) {
    debugger
    if ($('.playpause_' + id).hasClass('pause')) {
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pause');
        $('.playpause_' + item.Ref_Track_ID).addClass('play');
      })
      this.audio.pause();
      this.audio = new Audio();
     // $('.playpause_' + id).removeClass('pause');
      //$('.playpause_' + id).addClass('play');
    } else if ($('.playpause_' + id).hasClass('play')) {
      this.audio.src = environment.cdnURL + path;
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pause');
        $('.playpause_' + item.Ref_Track_ID).addClass('play');
      })
      this.audio.pause();
      this.audio.load();
      this.audio.play();
      $('.playpause_' + id).removeClass('play');
      $('.playpause_' + id).addClass('pause');
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
  public manageTrackBeat(id, action){
    this._base._commonService.showLoader();
    if(action == 'Approve'){
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
       let ObjApproveAndRejact =  {
          "TrackIDs": id,
          "Action": action,
          "Reason": "",
          "ActionBy": FullName
        }
      this._base._ApiService.post(ApiConstant.TrackManagement.ApproveAndRejact, ObjApproveAndRejact).subscribe((data: any) => {
        alert(data)
       // this._base._commonService.hideLoader();
        this.getAllTracks("0", action);
      },e=>{
        console.log(e)
        this._base._commonService.hideLoader();
      })
    })
    }else if(action == 'Reject'){
     //  $('#rejectReason_popup').modal('show');
       (<any>$('#rejectReason_popup')).modal('show');
       this.rejectTrackId = id;
    }else{
      this._base._ApiService.get(ApiConstant.TrackManagement.ManageTrack + '?TrackIDs='+ id + '&Action='+ action).subscribe((data: any) => {
        alert(data)
       // this._base._commonService.hideLoader();
        this.getAllTracks("0", 'All');
      },e=>{
        console.log(e)
        this._base._commonService.hideLoader();
        this.getAllTracks("0", 'All');
      })
    }
   
  }

  public accept(){
    this._base._commonService.markFormGroupTouched(this.addrejectreason);
    if (this.addrejectreason.valid) {
      this._base._commonService.showLoader();
      this._base._encryptedStorage.get(enAppSession.FullName).then(FullName => {
       let ObjApproveAndRejact =  {
          "TrackIDs": this.rejectTrackId,
          "Action": 'Rejact',
          "Reason": this.rejectReason,
          "ActionBy": FullName
        }
      this._base._ApiService.post(ApiConstant.TrackManagement.ApproveAndRejact, ObjApproveAndRejact).subscribe((data: any) => {
        alert(data)
        this.getAllTracks("0", 'Reject');
        (<any>$('#rejectReason_popup')).modal('hide');
      },e=>{
        console.log(e)
        this._base._commonService.hideLoader();
      })
    })
    }
  }

}
