import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss', '../widgets/featuredProductSlider/featuredProductSlider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ProductComponent implements OnInit {
  // minValue: number = 100;
  // maxValue: number = 400;
  // options: Options = {
  //   floor: 0,
  //   ceil: 500,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         return '<b>Min price:</b> $' + value;
  //       case LabelType.High:
  //         return '<b>Max price:</b> $' + value;
  //       default:
  //         return '$' + value;
  //     }
  //   }
  // };
  constructor() { }
  public isFilterDisplay: boolean = false;

  ngOnInit(): void {
  }
  filtersDisplay() {
    debugger
    if (this.isFilterDisplay) {
      this.isFilterDisplay = false;
    } else {
      this.isFilterDisplay = true;
    }
  }
}
