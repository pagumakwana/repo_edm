import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import { ApiConstant } from './../../../_appModel/apiconstant'
import { from } from 'rxjs';
import { Router, ActivatedRoute, Route } from '@angular/router';
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
  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;
  rejectedReasonTxt
  trackid: number = 0;
  constructor(public _base: BaseServiceHelper,
    public router: Router,
    private route: ActivatedRoute,
    private _categoryService: CategoryService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    debugger;
    this.route.params.subscribe(params => {
      this.moduleName = params['module'];
      this._base._pageTitleService.setTitle("All " + this.moduleName + "s", "All " + this.moduleName + "s");
      this._base._commonService.showLoader();
      let genretype = "All"
      if (this.moduleName == "Beat") {
        genretype = "Beats"
      } else if (this.moduleName == "Track") {
        genretype = "Track"
      }
      this._categoryService.categorylist(genretype, 0).subscribe((resData: any) => {
        let categoryData = []
        categoryData = Array.isArray(resData) ? resData : []
        console.log("categoryData", categoryData);
        this.genrelist = categoryData;
        this.getAllTracks("0", 'All');
      }, e => {
        this._base._commonService.hideLoader();
      });


    })

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
          item.ThumbnailImageUrl = this._base._commonService.cdnURL + item.ThumbnailImageUrl;
          item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
        })
        this.filteredProducts = this.data;
      } else {
        this._base._commonService.hideLoader();
        if (status != "All") {
          this.data = data.filter(a => a.TrackStatus == status.toUpperCase());
          this.data.map(item => {
            item.ThumbnailImageUrl = this._base._commonService.cdnURL + item.ThumbnailImageUrl;
            item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
          })
          this.filteredProducts = this.data;
        } else {
          this.data = data
          this.data.map(item => {
            item.ThumbnailImageUrl = this._base._commonService.cdnURL + item.ThumbnailImageUrl;
            item.Ref_Category_ID = this.filtergenre(item.Ref_Category_ID);
          })
          this.filteredProducts = this.data;
        }
        console.log(this.data);
        this.onStatusChange()
      }

    }, e => {
      this._base._commonService.hideLoader();
    })
  }
  public filterfile(FileManager, fileType) {
    let file = FileManager.filter(item => item.FileIdentifier == fileType)
    if(file.length != 0){
      const lastItem = file[file.length - 1]
      return this._base._commonService.cdnURL +  file[0].FilePath
    }
    
  }
  bindCategory() {
    this._categoryService.categorylist('ALL', 0).subscribe((resData: any) => {
      let categoryData = []
      categoryData = Array.isArray(resData) ? resData : []
      console.log("categoryData", categoryData);
      this.genrelist = categoryData;
    });
  }
  filtergenre(id) {
    let genre = this.genrelist.filter(r => r.Ref_Category_ID == id);
    // let genrename
    if (genre.length != 0) {
      return genre[0].CategoryName;
    } else {
      return '-'
    }

  }
  onGenreChange(e) {
    if (e == "0") {
      this.getAllTracks("0", 'All');
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
  onStatusChange() {
    if (!this.filter.Approved && !this.filter.SoldOut && !this.filter.Rejected && !this.filter.Pending) {
      this.filteredProducts = this.data
    } else {
      this.filteredProducts = this.data.filter(x =>
        (x.TrackStatus == 'Approved' && this.filter.Approved)
        || (x.TrackStatus == 'SoldOut' && this.filter.SoldOut)
        || (x.TrackStatus == 'Rejected' && this.filter.Rejected)
        || (x.TrackStatus == '-' && this.filter.Pending)
      );
      console.log(this.filteredProducts)
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
    if ($('.playpause_' + id).hasClass('pausee')) {
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pausee');
        $('.playpause_' + item.Ref_Track_ID).addClass('playy');
      })
      this.audio.pause();
      this.audio = new Audio();
      // $('.playpause_' + id).removeClass('pause');
      //$('.playpause_' + id).addClass('play');
    } else if ($('.playpause_' + id).hasClass('playy')) {

      let file = path.filter(item => item.FileIdentifier == "MasterFile")

      this.audio.src = this._base._commonService.cdnURL + file[0].FilePath;
      data.filter(item => {
        $('.playpause_' + item.Ref_Track_ID).removeClass('pausee');
        $('.playpause_' + item.Ref_Track_ID).addClass('playy');
      })
      this.audio.pause();
      this.audio.load();
      this.audio.play();
      $('.playpause_' + id).removeClass('playy');
      $('.playpause_' + id).addClass('pausee');

    }
  }
  public showreason(reason) {
    this.rejectedReasonTxt = reason;
    (<any>$('#readmore_popup')).modal('show');
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
  public manageTrackBeat(id, action) {
    this._base._commonService.showLoader();
    if (action == 'Approved') {
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        let ObjApproveAndRejact = {
          "TrackIDs": id,
          "Action": action,
          "Reason": "",
          "ActionBy": Ref_User_ID
        }
        this._base._ApiService.post(ApiConstant.TrackManagement.ApproveAndRejact, ObjApproveAndRejact).subscribe((data: any) => {
          if (data == "Approved") {
            this._base._alertMessageService.success(this.moduleName + " Approved successfully!");
            this.getAllTracks("0", 'All');
          } else {
            console.log(data)
            this._base._commonService.hideLoader();
          }
        }, e => {
          console.log(e)
          this._base._commonService.hideLoader();
        })
      })
    } else if (action == 'Rejected') {
      (<any>$('#rejectConfirmation')).modal('show');

      this.rejectTrackId = id;
    }

  }
  public confirmReject() {
    (<any>$('#rejectConfirmation')).modal('hide');
    (<any>$('#rejectReason_popup')).modal('show');
  }
  public accept() {
    this._base._commonService.markFormGroupTouched(this.addrejectreason);
    if (this.addrejectreason.valid) {
      (<any>$('#rejectReason_popup')).modal('hide');
      this._base._commonService.showLoader();
      this._base._encryptedStorage.get(enAppSession.Ref_User_ID).then(Ref_User_ID => {
        let ObjApproveAndRejact = {
          "TrackIDs": this.rejectTrackId,
          "Action": 'Rejected',
          "Reason": this.rejectReason,
          "ActionBy": Ref_User_ID
        }
        this._base._ApiService.post(ApiConstant.TrackManagement.ApproveAndRejact, ObjApproveAndRejact).subscribe((data: any) => {
          if (data == "Rejected") {
            this._base._alertMessageService.success(this.moduleName + " Rejected successfully!");
            this.getAllTracks("0", 'All');
          } else {
            console.log(data)
            this._base._commonService.hideLoader();
          }
        }, e => {
          console.log(e)
          this._base._commonService.hideLoader();
        })
      })
    }
  }
  deletetrack() {
    if (this.trackid != 0) {
      this._base._ApiService.get(ApiConstant.TrackManagement.ManageTrack + '?TrackIDs=' + this.trackid + '&Action=Delete').subscribe((data: any) => {
        if (data == "TRACKDELETE") {
          this._base._alertMessageService.success(this.moduleName + " deleted successfully!");
          this.getAllTracks("0", 'All');
        } else {
          console.log(data)
          this._base._commonService.hideLoader();
        }
        (<any>$('#modal-deleteconfirmation')).modal('hide');
      }, e => {
        console.log(e)
        this._base._commonService.hideLoader();
      })
    }
  }
  deleteconfirm(trackid) {
    this.trackid = trackid;
    (<any>$('#modal-deleteconfirmation')).modal('show');
  }
  canceltrack() {
    this.trackid = 0;
    (<any>$('#modal-deleteconfirmation')).modal('hide');
  }
}
