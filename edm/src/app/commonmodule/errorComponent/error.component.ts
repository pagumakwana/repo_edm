import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { BaseServiceHelper } from '../../_appService/baseHelper.service';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from './validation.service';

// import { RegisterService } from '../_appService/register.service';

@Component({
  selector: 'edm-error',
  template: `<div class="error_msg" *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
  // templateUrl: './error.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ErrorComponent implements OnInit {

  @Input() control: AbstractControl

  constructor(public _base: BaseServiceHelper) { }

  ngOnInit(): void { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }



}
