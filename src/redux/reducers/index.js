import isSignIn from "./SingIn";
import isSignUp from "./SingUp";
import logOut from "./LogOut";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    isSignIn,
    isSignUp,
    logOut
})

export default rootReducer;