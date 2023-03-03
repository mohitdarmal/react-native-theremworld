const initialState = "";

const logOut = (state = initialState, action) => {
    switch (action.type){
        case "LOG_OUT" :
            return (
                console.log("LogOut reducer")
            )
            default :
            return (
                {...state}
            )

    }
}

export default logOut;