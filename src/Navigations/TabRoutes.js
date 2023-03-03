import React from "react";
import {Image} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationStrings from "../Constant/NavigationStrings";
import ImagePath from "../Constant/ImagePath";
import HomeStack from "./HomeStack";
import DonateStack from "./DonateStack";
import AddDreamStack from "./AddDreamStack";
import DreamForAnalysisStack from "./DreamForAnalysisStack";
import ProfileStack from "./ProfileStack";


const Tab = createBottomTabNavigator();

function TabRoute () {
    return(
        <>
         <Tab.Navigator
         screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:'red',
            tabBarInactiveTintColor:'grey',
            tabBarShowLabel:false,
            tabBarStyle:{
                position:'absolute',
                backgroundColor:'#466362',
                borderRadius:100,
                marginVertical:10,
                marginHorizontal:20,
                height:60,
                borderTopColor:'#466362',
                display: "none"
            }}}>
            <Tab.Screen
            options={{
                tabBarIcon : ({focused}) => {
                    return(
                        // tintColor : focused ? '#ffffff' : '#ffffff60'
                        <Image style={{width:20, height:20,}} source={ImagePath.homeIcon}/>
                    )
                }
            }}
            name={NavigationStrings.HOME_STACK}  component={HomeStack} />

            <Tab.Screen
             options={{
                tabBarIcon : ({focused}) => {
                    return(
                        <Image style={{width:23, height:23, }} source={ImagePath.donateTabIcon}/>
                    )
                }
            }}
            name={NavigationStrings.DONATE_STACK} component={DonateStack} />

            <Tab.Screen
             options={{
                tabBarIcon : ({focused}) => {
                    return(
                        <Image style={{width:80, height:80, top:-20, }} source={ImagePath.addIcon}/>
                    )
                }
            }}
            name={NavigationStrings.ADD_DREAM_STACK} component={AddDreamStack} />

            <Tab.Screen
             options={{
                tabBarIcon : ({focused}) => {
                    return(
                        <Image style={{width:20, height:20, }} source={ImagePath.searchIcon}/>
                    )
                }
            }}
            name={NavigationStrings.DREAM_FOR_ANALYSIS} component={DreamForAnalysisStack} />

            <Tab.Screen
             options={{
                tabBarIcon : ({focused}) => {
                    return(
                        <Image style={{width:20, height:20, }} source={ImagePath.profileIcon}/>
                    )
                }
            }}
            name={NavigationStrings.PROFILE_STACK} component={ProfileStack} />


         </Tab.Navigator>


        </>
    )
}

export default TabRoute