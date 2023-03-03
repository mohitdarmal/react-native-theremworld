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
    const  {firstName, lastName, Email, reason, message} = data;

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

  /* Message Validation start */
  if(message !== undefined){
    let emptyValidatatinText = checkEmpty(message, 'Please enter your Message');
    if(emptyValidatatinText !== ''){
        return emptyValidatatinText
    }
}
/* Message Validation end */



}