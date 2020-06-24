import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class PageTitleService {
    public moduleTitle: string = ''
    public moduleSubTitle: string = ''
    constructor(private _title: Title) { }

    public setTitle(newTitle: string, moduleTitle: string = null, moduleSubTitle: string = null) {
        setTimeout(() => {
            this.moduleTitle = moduleTitle;
            this.moduleSubTitle = moduleSubTitle;
            this._title.setTitle(newTitle + ' | DopeTrack');
        }, 0);
    }
}