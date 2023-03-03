const initialState = "";

const isSignUp = (state = initialState, action) => {
    switch (action.type){
        case "SIGN_UP" :
        return (
            console.log("SgnUp reducer")
        )
            default :
            return (
                {...state}
            )

    }
}

export default isSignUp;