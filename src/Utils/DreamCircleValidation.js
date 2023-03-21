import  Validator  from "is_js";

const checkEmpty = (val, key) => {
    if(Validator.empty(val.trim())){
        return `${key}`;
    }
    else{
        return '';
    }
}

 
 

export default function (data){
    const  {memberEmail} = data;

    /* Email Validation start */
    if(memberEmail !== undefined){
        let emptyValidatatinText = checkEmpty(memberEmail, 'Please enter a valid e-mail address');
        if(emptyValidatatinText !== ''){
            return emptyValidatatinText
        }
        else{
            if(!Validator.email(memberEmail)){
                return 'Please enter a valid e-mail address'
            }
        }
    }
    /* Email Validation end */
 


}