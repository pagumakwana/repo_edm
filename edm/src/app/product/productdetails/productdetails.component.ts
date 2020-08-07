import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../_appService/baseHelper.service';
import { FileUploadService } from './../../_appService/fileUploadService/fileUploadService'
import { ApiConstant } from './../../_appModel/apiconstant'
import { enAppSession } from 'src/app/_appModel/enAppSession';
import { CommonService } from './../../_appService/common.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../_appService/category/category.serviec';
import { environment } from './../../../environments/environment.prod';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent implements OnInit {
  productId
  productDetails
  DAWlist
  audio = new Audio();
  audioplay: boolean = false;
  playpause: string = 'play'
  playpauseImg:string = '../../../assets/images/play_video.svg'
  constructor(public _base: BaseServiceHelper,
    public fileUploadService: FileUploadService,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private _categoryService: CategoryService) {
    this.bindDAW()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['ID'];
      debugger;
      this.getProductDetails(this.productId);
    })
  }
  public bindDAW() {
    this._base._ApiService.get(ApiConstant.MasterManagement.DAW).subscribe((data: any) => {
      this.DAWlist = data
    });
  }
  public getDawName(id) {
    let list = this.DAWlist.filter(a => a.Ref_DAW_ID == id);
    if(list.length != 0 ){
      return list[0].DAW
    }else{
      return '-'
    }
   
  }
  public getProductDetails(productId) {
    debugger
    this._base._ApiService.get(ApiConstant.Track.TrackAndBeatDetails + '?TrackID=' + productId).subscribe((data: any) => {
      console.log(data);
      this.productDetails = data;
      this.productDetails.map(item => {
        item.ThumbnailImageUrl = environment.cdnURL + item.ThumbnailImageUrl;
        item.DAW = this.getDawName(item.DAW);
      })
    })
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
      this.playpause = 'Play';
      this.playpauseImg = '../../../assets/images/play_video.svg'
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
      this.playpause = 'Pause';
      this.playpauseImg = '../../../assets/images/pause.svg'
      $('.playpause_' + id).removeClass('play');
      $('.playpause_' + id).addClass('pause');
    }
  }
}
