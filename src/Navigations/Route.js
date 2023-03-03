import React, { useState, useEffect } from 'react';
import {ActivityIndicator, View} from "react-native";
import { NavigationContainer, StackActions, useNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { useDispatch, useSelector } from "react-redux";
import NavigationStrings from '../Constant/NavigationStrings';
import TabRoute from './TabRoutes';
import CustomDrawer from '../Components/CustomDrawers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from "../redux/actions/index";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator(); 
const navigationRef = React.createRef();


export default function Routes() {
//  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [localStorage, setLocalStorage] = useState();
  const disptach = useDispatch();

  var isToken = useSelector((state) => state.isSignIn.token);
 AsyncStorage.getItem('userId').then((res) => {
  setLocalStorage(res)
 })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 10 )
  }, []);

  if(isLoading){
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  // const localValue = localStorage.getItem("userId");
/*
 */


if(isToken == "" && localStorage != null){
  disptach(logIn(localStorage));
}
else{
  
}



console.log(isToken, "login token");
console.log(localStorage, "localtoken")
  //
    return (
      <NavigationContainer ref={navigationRef}>
        { isToken ?

        (
           <Drawer.Navigator
           screenOptions={{
            headerShown:false,}}
            drawerContent={(props) => <CustomDrawer {...props} />}
            >
            <Drawer.Screen
              name={NavigationStrings.SIGNIN}
              component={TabRoute} />

            </Drawer.Navigator>
        )
        :
        (
          <Stack.Navigator>
            {AuthStack(Stack)}
          </Stack.Navigator>
        )
      }

     {/*    <Drawer.Navigator screenOptions={{
            headerShown:false,}}
            drawerContent={(props) => <CustomDrawer {...props} />}
            >
        <Drawer.Screen
          name={NavigationStrings.WELCOME}
          component={TabRoute} />

        </Drawer.Navigator> */}






        {/* <Stack.Navigator screenOptions={{headerShown:false}}> */}
           {/* {istrue ? MainStack(Stack) : AuthStack(Stack) } */}
           {/* {MainStack(Stack)} */}
        {/* </Stack.Navigator> */}
      </NavigationContainer>
    );
  }