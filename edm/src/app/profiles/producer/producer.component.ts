import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-producer',
    templateUrl: './producer.component.html',
    styleUrls: ['./producer.component.scss','../../widgets/featuredProductSlider/featuredProductSlider.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ProducerProfileComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }
}
