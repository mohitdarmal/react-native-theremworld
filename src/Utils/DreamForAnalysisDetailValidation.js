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
    const  {analysisText} = data;

       /* dreamTitle Validation start */
       if(analysisText !== undefined){
        let emptyValidatatinText = checkEmpty(analysisText, 'Please enter meaningful analysis of twenty words or more');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            let minLengthValidation = checkMinLength(analysisText, 100, 'Please enter meaningful analysis of twenty words or more');
            if(minLengthValidation !== ''){
                return minLengthValidation
            }
        }
    }     

}