import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BaseServiceHelper } from '../../_appService/baseHelper.service';
// import { RegisterService } from '../_appService/register.service';

@Component({
    selector: 'edm-texteditor',
    templateUrl: './texteditor.component.html',
    styleUrls: ['./texteditor.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TextEditorComponent implements OnInit {

    constructor(public _base: BaseServiceHelper) { }

    ngOnInit(): void {
    }


}
