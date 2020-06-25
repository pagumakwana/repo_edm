import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss','../home/home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
}
