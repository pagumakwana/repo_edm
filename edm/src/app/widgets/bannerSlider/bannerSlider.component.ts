import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from './../../_appService/baseHelper.service';
import {
    SwiperComponent, SwiperDirective, SwiperConfigInterface,
    SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ApiConstant } from './../../_appModel/apiconstant';

@Component({
    selector: 'app-bannerSlider',
    templateUrl: './bannerSlider.component.html',
    styleUrls: ['./bannerSlider.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BannerSliderComponent implements OnInit {
    @ViewChild(SwiperComponent) componentRef: SwiperComponent;
    constructor(public _base: BaseServiceHelper,) { }
    public data = [];
    public config: SwiperConfigInterface = {
        direction: 'horizontal',
        slidesPerView: 1,
        pagination: true,
        autoplay: true,
        autoHeight: false,
    };

    private scrollbar: SwiperScrollbarInterface = {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true
    };

    private pagination: SwiperPaginationInterface = {
        el: '.swiper-pagination',
        clickable: true,
        hideOnClick: false
    };
    ngOnInit(): void {
        this._base._ApiService.get(ApiConstant.MasterManagement.CarouselList + '?CarouselID=0').subscribe((data: any) => {
            this.data = data;
        })
    }
    public filterfile(FileManager, fileType) {
        let file = FileManager.filter(item => item.FileIdentifier == fileType)
        return this._base._commonService.cdnURL + file[0].FilePath
      }
}
