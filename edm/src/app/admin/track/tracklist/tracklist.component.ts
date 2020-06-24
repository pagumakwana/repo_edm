import { Component, OnInit } from '@angular/core';
import { BaseServiceHelper } from './../../../_appService/baseHelper.service';
import {ApiConstant} from './../../../_appModel/apiconstant'
import { from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'appAdmin-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss']
})
export class TrackListComponent implements OnInit {
data:any;
  constructor(public _base: BaseServiceHelper,
    public router :Router) { }

  ngOnInit(): void {
  this.getAllTracks();
  }
  public getAllTracks(){
    this._base._ApiService.get(ApiConstant.TrackManagement.Track + '?TrackID=0').subscribe(data =>{
      console.log(data);
      this.data = data;
    })
  }
public redirectToaddmodifytrack(trackId){
  this.router.navigate(['admin/addmodifytrack', trackId]).then( (e) => {
    if (e) {
      console.log("Navigation is successful!");
    } else {
      console.log("Navigation has failed!");
    }
  });
}
 
}
