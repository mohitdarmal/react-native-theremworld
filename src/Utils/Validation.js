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


export default function (data){
    const  {userName, emailAddress, password} = data;

    /* Username Validation start */
    if(userName !== undefined){
        let emptyValidatatinText = checkEmpty(userName, 'Please enter your Username');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMinLength(userName, 4, 'atleast 3 alphabet');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }
    /* Username Validation end */


    /* Email Validation start */
    if(emailAddress !== undefined){
        let emptyValidatatinText = checkEmpty(emailAddress, 'Please enter your email address');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            if(!Validator.email(emailAddress)){
                return 'Please enter valid email address'
            }
        }
    }
    /* Email Validation end */


    /* Username Validation start */
    if(password !== undefined){
        let emptyValidatatinText = checkEmpty(password, 'Please enter your password');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMinLength(password, 6, 'Minimum 6 digit required');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }
    /* Username Validation end */

}