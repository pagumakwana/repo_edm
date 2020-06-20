
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSessionService } from './appsession.service';
import { EncryptedStorage } from '../_appModel/encryptedstorage';
import { ApiService } from './api.service';
import { CommonService } from './common.service';
import { AlertMessageService } from './alert/alertmessage.service';
import { PageTitleService } from './_title/title.service';
@Injectable()
export class BaseServiceHelper {

    constructor(public _ApiService: ApiService,
        public _appSessionService: AppSessionService,
        public _commonService: CommonService,
        public _pageTitleService: PageTitleService,
        public _router: Router,
        public _alertMessageService: AlertMessageService,
        public _encryptedStorage: EncryptedStorage) { }
}
