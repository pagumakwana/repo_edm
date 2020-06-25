import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'appAdmin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
