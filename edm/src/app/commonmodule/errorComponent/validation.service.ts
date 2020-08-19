import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        console.log("getValidatorErrorMessage", validatorName, validatorValue)
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
            'invalid_Number_Type': 'Invalid Number Field'
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

    static ValidateNumberType() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            // let regexPat: RegExp = /^-?[0-9][0-9,\.]*$/
            return control.value.match(/^(-?[1-9]+\\d*([.]\\d+)?)$|^(-?0[.]\\d*[1-9]+)$|^0$/) ? null : { 'invalid_Number_Type': true };
            // return control.value.match(/^-?[0-9][0-9,\.]*$/) ? null : { 'invalid_Number_Type': true };
            // return regexPat.test(control.value) ? null : { 'invalid_Number_Type': true };
        }
    }
    static ValidateFileType(fileTypes: Array<any>) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isFileType: boolean = control.value ? (typeof control.value == 'object') : false
            let isValidFile: boolean = isFileType && fileTypes ? (fileTypes.indexOf(control.value.type) != -1) : false
            return (!isValidFile && isFileType) ? { 'invalid_File_Type': true } : null
        }
    }
    static ValidateFileSize(size: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isFileType: boolean = control.value ? (typeof control.value == 'object') : false
            let isValidFileSize: boolean = isFileType && size ? (size >= control.value.size) : false
            return (!isValidFileSize && isFileType) ? { 'invalid_File_Size': true } : null
        }
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
}
