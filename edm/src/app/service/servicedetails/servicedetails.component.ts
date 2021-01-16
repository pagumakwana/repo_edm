import { isNgTemplate } from '@angular/compiler';
import { Component, ElementRef, IterableDiffers, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiConstant } from 'src/app/_appModel/apiconstant';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { CommonService } from 'src/app/_appService/common.service';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceDetailsComponent implements OnInit {
  ServiceID
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  ServiceDetails
  playPauseText = "Play"
  public isCollapsed = false;
  constructor(public _base: BaseServiceHelper,
    public commonService: CommonService,
    public route: ActivatedRoute,) { }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  playPause() {
    var myVideo: any = document.getElementById("videoTag");
    if (myVideo.paused) {
      myVideo.play();
      this.playPauseText = "Pause"
    } else {
      myVideo.pause();
      this.playPauseText = "Play"
    }

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ServiceID = params['ServiceId'];
      this._base._ApiService.get(ApiConstant.customer.CustomServiceDetails + '?ServiceID=' + this.ServiceID).subscribe((res: any) => {
        this.ServiceDetails = res;
       // this.ServiceDetails.filter(item => {
          // item.FileManager.map(item => {
          //   item.FilePath = item.FilePath == undefined || item.FilePath == null || item.FilePath == "" || item.FilePath == "-" ? '../../../assets/images/producer_profile.jpg' : item.FilePath;
          // })

        //})
      })
    })
  }
  public filterfile(FileManager, fileType) {
    debugger
    let file = FileManager.filter(item => item.FileIdentifier == fileType)
      const lastItem = file[file.length - 1]
      return this._base._commonService.cdnURL +  lastItem.FilePath
  }

}
