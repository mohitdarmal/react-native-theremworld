import React from "react";
import NavigationStrings from "../Constant/NavigationStrings";
import {SignUp, SignIn, Welcome} from "../Screens/Index";

export default function (Stack) {
    return (
        <>
          <Stack.Screen options={{ headerShown: false }} name={NavigationStrings.SIGNIN}  component={SignIn} />
          <Stack.Screen options={{ headerShown: false }} name={NavigationStrings.SIGNUP} component={SignUp} />
        </>
    )
}