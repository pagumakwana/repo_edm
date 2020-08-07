import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseServiceHelper } from '../_appService/baseHelper.service';
import { ApiConstant } from '../_appModel/apiconstant';
import { environment } from './../../environments/environment.prod';
import { CategoryService } from './../_appService/category/category.serviec';
import { Options, LabelType } from 'ng5-slider';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss', '../widgets/featuredProductSlider/featuredProductSlider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ProductComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };
  public DAWlist: any
  public products: any
  public Productlist: any;
  public ProductWithPricelist:any;
  public filtersproducts: any
  public genrelist: any;
  public selectedGenre = []
  public selectedDAW=[]
  constructor(public _base: BaseServiceHelper,
  private _categoryService: CategoryService,) { 
    this.bindDAW()
  }
  public isFilterDisplay: boolean = false;

  ngOnInit(): void {
    this._base._commonService.showLoader();
    this._categoryService.categorylist('ALL', 0).subscribe((resData: any) => {
      let categoryData = []
      categoryData = Array.isArray(resData) ? resData : []
      console.log("categoryData", categoryData);
      this.genrelist = categoryData;
      this.getProductlist();
    }, e => {
      this._base._commonService.hideLoader();
    });
    console.log(this.minValue, this.maxValue)
  }
  getProductlist() {
    debugger;
    this._base._ApiService.get(ApiConstant.Track.FilterTrack + '?StartCount=0&EndCount=0').subscribe((data: any) => {
      this.products = data;
      this._base._commonService.hideLoader();
      this.Productlist = this.products;
      this.ProductWithPricelist = this.Productlist;
      this.filtersproducts = this.ProductWithPricelist;
      this.Productlist.map(item => {
        item.ThumbnailImageUrl = environment.cdnURL + item.ThumbnailImageUrl;
      })
    })
  }
  bindDAW() {
    this._base._ApiService.get(ApiConstant.MasterManagement.DAW).subscribe((data: any) => {
      this.DAWlist = data;
    });
  }
  onGenreFilter(e) {
    let index = this.selectedGenre.indexOf(e); // get index if value found otherwise -1
    if (index > -1) { //if found
      this.selectedGenre.splice(index, 1);
    } else {
      this.selectedGenre.push(e)
    }
    if (this.selectedGenre.length == 0) {
      this.Productlist = this.products;
      this.ProductWithPricelist = this.Productlist;
      this.filtersproducts = this.Productlist;
    } else {
      this.Productlist = this.filterObjectArray(this.products, this.selectedGenre,'CategoryName');
      this.ProductWithPricelist = this.Productlist;
      this.filtersproducts = this.ProductWithPricelist;
    }
    this.pricefilter();
    console.log(this.selectedGenre);
    console.log(this.minValue, this.maxValue)
  }
  filterObjectArray = (arr, filterArr,type) => {
    if(type == "DAW"){
      return arr.filter(el =>
        filterArr.some(f =>
          f == el.DAW
        )
      )
    }else{
      return arr.filter(el =>
        filterArr.some(f =>
          f === el.CategoryName
        )
      )
    }
  
  }
  selectedOption(ID, option) {
    let index
    if(option == 'Genre'){
      index = this.selectedGenre.indexOf(ID); // get index if value found otherwise -1
    }else{
      index = this.selectedDAW.indexOf(ID); // get index if value found otherwise -1
    }
    if (index > -1) { //if found
      return 'selected_options';
    } else {
      return '';
    }
  }
  filtersDisplay() {
    debugger
    if (this.isFilterDisplay) {
      this.isFilterDisplay = false;
    } else {
      this.isFilterDisplay = true;
    }
  }
  pricefilter(){
    var filtered = [];
    this.Productlist.filter(d =>{
      if(d.Price >= this.minValue && d.Price <= this.maxValue)
      filtered.push(d);
    })
    this.ProductWithPricelist = filtered;
    this.filtersproducts = this.ProductWithPricelist;
    this.onDAWFilterS();
  }
  onDAWFilter(e) {
    let index = this.selectedDAW.indexOf(e); // get index if value found otherwise -1
    if (index > -1) { //if found
      this.selectedDAW.splice(index, 1);
    } else {
      this.selectedDAW.push(e)
    }
   this.onDAWFilterS()
  }
  onDAWFilterS(){
    if (this.selectedDAW.length == 0) {
      this.filtersproducts = this.ProductWithPricelist;
    } else {
      this.filtersproducts = this.filterObjectArray(this.ProductWithPricelist, this.selectedDAW,'DAW')
    }
    console.log(this.selectedDAW);
    console.log(this.minValue, this.maxValue)
  }
}
