import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class UserProfileComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }
}
