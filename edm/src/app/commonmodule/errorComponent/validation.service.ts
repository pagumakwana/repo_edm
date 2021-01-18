import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        // console.log("getValidatorErrorMessage", validatorName, validatorValue)
        let config = {
            'required': 'Field is Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'invalid_File_Type': 'Invalid File Extension/type',
            'invalid_File_Size': 'Invalid File Size',
            'invalid_File_Resolution': 'Invalid File Resolution',
            'invalid_white_Space': 'White Space Not Allowed',
            'invalid_Number_Price_Type': `Invalid Price Field Max price should be less than equal to ${validatorValue.requiredPrice}`,
            'invalid_Date_1': `Selected Date is Invalid`,
            'invalid_Date_2': `End Date should be Greater than Start Date`
        };

        return config[validatorName];
    }

    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static ValidateNumberPriceType(maxPrice: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let value: string | any = control.value ? typeof control.value == 'number' ? control.value.toString() : control.value : ''
            let priceValid: boolean = !isNaN(value) ? parseInt(value) <= maxPrice : false
            return value.match(/^\d+(\.\d+)?$/) && priceValid ? null : { 'invalid_Number_Price_Type': { requiredPrice: maxPrice } };
        }
    }

    static ValidateFileType(fileTypes: Array<any>) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return this.ValidateFileType_Helper(control.value, fileTypes) ? null : { 'invalid_File_Type': true }
        }
    }

    static ValidateFileType_Helper(controlValue: any, fileTypes: Array<any>): boolean {
        let isFileType: boolean = controlValue ? (typeof controlValue == 'object') : false
        let isValidFile: boolean = isFileType && fileTypes ? (fileTypes.indexOf(controlValue.type) != -1) : false
        return (isValidFile && isFileType)
    }

    static ValidateFileSize(size: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return this.ValidateFileSize_Helper(control.value, size) ? null : { 'invalid_File_Size': true }
        }
    }

    static ValidateFileSize_Helper(controlValue: any, size: number) {
        // debugger
        let isFileType: boolean = controlValue ? (typeof controlValue == 'object') : false
        let isValidFileSize: boolean = isFileType && size ? (size >= controlValue.size) : false
        return (isValidFileSize && isFileType)
    }

    static ValidateWhiteSpace() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const initalValue: string = control.value && typeof control.value == 'string' ? control.value : ""
            let valueAFterTrim: string = initalValue.trim()
            console.log("ValidateWhiteSpace", valueAFterTrim.length == 0)
            return valueAFterTrim.length == 0 ? { 'invalid_white_Space': true } : null
        }
    }


    static ValidateResolution(height: number, width: number): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors> | null | Observable<ValidationErrors | null> => {
            return ValidationService.getImageResolution(control).then((res: { height: number, width: number } | null) => {
                return res ? ((res.height <= height && res.width <= width) ? null : { 'invalid_File_Resolution': true }) : null
            })
        }
    }

    static getImageResolution(fileInput: AbstractControl) {
        return new Promise((resolve, reject) => {
            let returnData: { height: number, width: number } | null = null, _url = window.URL, img: any
            if (fileInput.value != null && (typeof fileInput.value != 'string')) {
                img = new Image();
                img.onloadend = function () {
                    img.height = this.height;
                    img.width = this.width;
                }
                img.src = _url.createObjectURL(fileInput.value);
                setTimeout(() => {
                    returnData = { height: img.height, width: img.width }
                    resolve(returnData)
                }, 1000);
            } else {
                resolve(returnData)
            }
        })
    }

    static dateValidator(identifer: number, minDateDataIdentifier = null, maxDateDataIdentifer = null) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            // const initalValue: string = control.value && typeof control.value == 'string' ? control.value : ""
            // let valueAFterTrim: string = initalValue.trim()
            // minDateData: '2020-01-01',
            let minDateData = minDateDataIdentifier && control.parent && control.parent.get(minDateDataIdentifier) ? control.parent.get(minDateDataIdentifier).value : '2020-01-01'
            let maxDateData = maxDateDataIdentifer && control.parent && control.parent.get(maxDateDataIdentifer) ? control.parent.get(maxDateDataIdentifer).value : '2100-01-01'

            //YYYY-MM-dd
            // let defaultDate = {
            //     minDateData: '2020-01-01',
            //     maxDateData: '2100-01-01'
            // }
            let controlDate: Date = new Date(control.value)
            // let DateToday: Date = new Date()
            let minDate: Date = minDateData ? new Date(minDateData) : new Date()
            let maxDate: Date = maxDateData ? new Date(maxDateData) : new Date()
            let isDateValid: boolean = true
            if (identifer == 1) isDateValid = minDate <= controlDate && controlDate <= maxDate
            if (identifer == 2) isDateValid = minDate <= controlDate
            console.log("dateValidatorinvalid_Date_" + identifer, minDate, minDateData, control.value, isDateValid, control)

            return !isDateValid ? { ['invalid_Date_' + identifer]: true } : null
        }
    }
}
