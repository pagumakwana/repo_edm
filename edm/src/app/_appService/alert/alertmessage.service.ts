import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AlertMessageService {
    constructor(private _ToastrService: ToastrService) { }

    success(Message) {
        this._ToastrService.success(Message);
    }

    warning(Message) {
        this._ToastrService.warning(Message);
    }

    error(Message) {
        this._ToastrService.error(Message);
    }
    info(Message) {
        this._ToastrService.info(Message);
    }

}