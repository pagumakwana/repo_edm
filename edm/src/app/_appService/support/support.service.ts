import { Injectable } from '@angular/core';
import { BaseServiceHelper } from '../baseHelper.service';
import { ApiConstant } from 'src/app/_appmodel/apiconstant';

@Injectable()
export class SupportService {

    constructor(private _base: BaseServiceHelper) { }
    getTicketType() {
        return this._base._ApiService.get(ApiConstant.support.TicketType);
    }
    getTicket(UserID) {
        let params = `?UserID=${UserID}&StartCount=0&EndCount=0`
        return this._base._ApiService.get(ApiConstant.support.Ticket + params);
    }
    postTicket(params) {
        return this._base._ApiService.post(ApiConstant.support.Ticket,  params);
    }
}