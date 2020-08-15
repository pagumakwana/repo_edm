import { Injectable } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
import { ApiConstant } from '../_appModel/apiconstant';

@Injectable()
export class TrackService {

    constructor(private _base: BaseServiceHelper) {

    }
    getFeaturedTrack() {
        return this._base._ApiService.get(`${ApiConstant.TrackManagement.FeaturedTrack}`);
    }

}