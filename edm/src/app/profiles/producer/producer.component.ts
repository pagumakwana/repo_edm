import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { producerTab } from '../model/producer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-producer',
    templateUrl: './producer.component.html',
    styleUrls: ['./producer.component.scss', '../../widgets/featuredProductSlider/featuredProductSlider.component.scss', '../../home/home.component.scss', '../../service/service.component.scss', '../../product/product.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ProducerProfileComponent implements OnInit {
    constructor(
        private _activatedRouter: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.producerID = this._activatedRouter.snapshot.paramMap.get('producerID');
        console.log(this.producerID, "producerID")
    }

    producerID: string = null
    producerTab = producerTab
    currentTab: producerTab = producerTab.biography;

    changeTab(tab: producerTab) {
        console.log(typeof tab, tab)
        this.currentTab = tab
    }

}
