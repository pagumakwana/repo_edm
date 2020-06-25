import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from 'src/app/_appService/baseHelper.service';
@Component({
    selector: 'app-producerprofile',
    templateUrl: './producerprofile.component.html',
    styleUrls: ['./producerprofile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProducerProfileComponent implements OnInit {

    constructor(private _base: BaseServiceHelper) { }
    ngOnInit(): void {
    }


}
