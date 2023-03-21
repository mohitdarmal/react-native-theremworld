import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, useColorScheme } from "react-native";
import { useSelector, useDispath } from "react-redux";
import axios from "axios";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import Style from "./Style";
import NavigationStrings from "../../Constant/NavigationStrings";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import * as Linking from 'expo-linking';

const UserProfile = ({navigation}) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const isUserID = useSelector((state) => state.isSignIn.token);
    const [userProfileData, setUserProfileData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const focus = useIsFocused();

      useEffect(() => {
        getUserProfile()
      },[focus])

    const getUserProfile = () => {
        axios.get(`${NavigationStrings.BASE_URL}getUserProfile.php`, {
          params : {uID:isUserID}
        }).then((val) => {
          console.log(val.data.data, "profile")
            setUserProfileData(val.data.data);
            setIsLoading(false)
        })
      }


      console.log(userProfileData)

      const logOut = () => {
        AsyncStorage.removeItem('userId');
        Updates.reloadAsync()
      }

    return(
      <View style={[themeContainerStyle, {flex:1}]}>

          {/* Data loading indicator */}
             {isLoading
                  ?
                    <View style={CommonStyle.screnLoader}>
                      <ActivityIndicator size="large" color="#062B66"  />
                    </View>
                  :
                    <View></View>
                }
            {/* Data loading indicator */}

         
           <HeaderComp backBtn title="Profile"/>

           <FlatList
                // array
                data={userProfileData}
                //
                keyExtractor={(data) => data.userID }
                // array data
                renderItem={(data) => {
                    console.log(data, "werewr")
                return(
                    <View style={CommonStyle.paddingHorizontal20}>

                        <View style={Style.userNameContainer}>
                                <Text style={[CommonStyle.heading, themeTextStyle]}>{data.item.firstName == "" ? 'Profile' : data.item.firstName} </Text>
                                <Text onPress={() => navigation.navigate(NavigationStrings.EDIT_PROFILE, {
                                     uID:isUserID,
                                     userID: data.item.userID,
                                     firstName: data.item.firstName,
                                     lastName: data.item.lastName,
                                     userGender: data.item.userGender,
                                     mobileNbr: data.item.mobileNbr,
                                     email:data.item.email,
                                     userPwd:data.item.userPwd
                                })} style={[Style.editBtn, themeTextStyle]}> <Feather style={[Style.editBtn, themeTextStyle]}  name="edit" size={20}  /> Edit </Text>
                        </View>


                              <View>
                                <Text style={[Style.userId, themeTextStyle]}><Fontisto  style={[Style.userIdIcon, themeTextStyle]}  name="email" size={18}  />  {data.item.userID} </Text>
                              </View>


                              <View>

                                {
                                    !data.item.firstName  ? <Text style={Style.dNone}> </Text> :  <Text style={[Style.userInfo, themeTextStyle]}><Entypo style={[Style.userInfoIcon, themeTextStyle]}   name="user" size={18}  /> {data.item.firstName}  {data.item.lastName}</Text>
                                }

                              </View>
 

                              <View>

                                {
                                    !data.item.userGender  ? <Text style={Style.dNone}> </Text>  :  <Text style={[Style.userInfo, themeTextStyle]}>
                                    <MaterialCommunityIcons  style={[Style.userInfoIcon, themeTextStyle]}  name="gender-male-female" size={18}  /> {data.item.userGender} </Text>
                                }

                              </View>

                              <View>

                                {
                                    !data.item.mobileNbr  ? <Text style={Style.dNone}> </Text>  :  <Text style={[Style.userInfo, themeTextStyle]}>
                                        <Entypo  style={[Style.userInfoIcon, themeTextStyle]}  name="mobile" size={18}  /> {data.item.mobileNbr} </Text>
                                }

                              </View>                                   

                              <View >
                                <Text  onPress={logOut} style={[Style.profileLogOutBtn, themeTextStyle]}>
                                <AntDesign  style={[Style.userInfoIcon,  themeTextStyle]}  name="logout" size={16}  /> Logout
                                </Text>
                              </View>

                               {/* Donate Now */}
                               <Text style={[Style.subHeading, themeTextStyle]}>We partner with Stripe to manage subscriptions. You will be redirected to their page</Text>
                                <View >
                                <TouchableOpacity onPress={() => Linking.openURL('https://billing.stripe.com/p/login/test_7sI15t7Uv5QyfzW6op')}  style={Style.donateBtn}>
                                    <Text style={Style.donateBtnTxt}> Subscribe </Text>
                                </TouchableOpacity>
                                </View>
                                {/* Donate Now */}

                            {/*   <View>

                                {
                                    !data.item.email  ? <Text style={Style.dNone}> </Text>  :  <Text style={[Style.userInfo, themeTextStyle]}><Fontisto  style={[Style.userInfoIcon, themeTextStyle]}  name="email" size={18}  /> {data.item.email} </Text>
                                }

                              </View> */}



                    </View>
                )
                }}
            />


        
      </View>
    )
}

export default UserProfile;