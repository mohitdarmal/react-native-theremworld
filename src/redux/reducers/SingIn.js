const initialState = {
    login:false,
    token:''
};

const isSignIn = (userAuth = initialState, action) => {
    switch (action.type){
        case "SIGN_IN" :
            if(action.payload){
                return (
                    {
                        login:true,
                        token: action.payload
                    }
                );
            }
            else{
                return (

                    alert("User ID and Password is incorrect")
                );
            }

            default :
            return userAuth

    }
}

export default isSignIn;