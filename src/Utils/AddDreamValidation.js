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
    const  {dreamTitle, dreamText} = data;

       /* dreamTitle Validation start */
       if(dreamTitle !== undefined){
        let emptyValidatatinText = checkEmpty(dreamTitle, 'Please enter a meaningful title');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMinLength(dreamTitle, 5, 'Please enter a meaningful title');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }
    /* dreamTitle Validation end */

           /* dreamText Validation start */
           if(dreamText !== undefined){
            let emptyValidatatinText = checkEmpty(dreamText, 'Please make dream details as descriptive as possible (20 or more words)');
            if(emptyValidatatinText !== ''){
                return emptyValidatatinText
            }
            else{
                let minLengthValidation = checkMinLength(dreamText, 100, 'Please make dream details as descriptive as possible (20 or more words)');
                if(minLengthValidation !== ''){
                    return minLengthValidation
                }
            }
        }
        /* dreamText Validation end */



}