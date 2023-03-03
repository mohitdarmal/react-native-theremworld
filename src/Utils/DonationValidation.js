import  Validator  from "is_js";

const checkEmpty = (val, key) => {
    if(Validator.empty(val.trim())){
        return `${key}`;
    }
    else{
        return '';
    }
}


const checkMinLength = (val, minLength, key) => {
     if(val.trim().length < minLength){
         return `Please enter ${key}`;
     }
     else{
         return '';
     }
}


const checkNotZero = (val, minLength, key) => {
    if(val.trim() == minLength){
        return `Please enter ${key}`;
    }
    else{
        return '';
    }
}

const checkMonthyYearValidation = (val, total, key) => {
    if(val.trim() > total){
        return `Please enter ${key}`;

    }
    else{
        return '';
    }
}


export default function (data){
    const  {amount, firstName, lastName, Email, number, exp_month, exp_year, cvc} = data;

    /* First Name Validation start */
    if(firstName !== undefined){
        let emptyValidatatinText = checkEmpty(firstName, 'Please enter your First Name');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
    }
    /* First Name Validation end */

     /* Last Name Validation start */
     if(lastName !== undefined){
        let emptyValidatatinText = checkEmpty(lastName, 'Please enter your Last Name');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
    }
    /* Last Name Validation end */

    /* Email Validation start */
    if(Email !== undefined){
        let emptyValidatatinText = checkEmpty(Email, 'Please enter your email address');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            if(!Validator.email(Email)){
                return 'Please enter valid email address'
            }
        }
    }
    /* Email Validation end */


     /* Card Validation start */
     if(number !== undefined){
        let emptyValidatatinText = checkEmpty(number, 'Please Enter Card Number');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMinLength(number, 16, '16 digit number');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }
    /* Card Validation end */

    /* CVC Validation start */
    if(cvc !== undefined){
        let emptyValidatatinText = checkEmpty(cvc, 'Please Enter CVC Number');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMinLength(cvc, 3, '3 digit number');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }
    /* CVC Validation end */


    /* Expiry Month Validation start */
       if(exp_month !== undefined){
        let emptyValidatatinText = checkEmpty(exp_month, 'Please Enter Expiry Month');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMonthyYearValidation(exp_month, 12, 'Correct Month');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }
    /*  Expiry Month end */


    /* Expiry Year Validation start */
    if(exp_year !== undefined){
        let emptyValidatatinText = checkEmpty(exp_year, 'Please Enter Expiry Year');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMinLength(exp_year, 4, 'Correct Year');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }
    /*  Expiry Year end */


    /* Amount start */
    if(amount !== undefined){
        let emptyValidatatinText = checkEmpty(amount, 'Please enter donation amount');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let checkZero = checkNotZero(amount, 0, 'Enter Minimum 1$');
            if(checkZero !== ''){
                return checkZero
            }
        }
    }
    /* Amount end */



}