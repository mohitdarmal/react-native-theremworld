import React, {useState} from "react";
import { StyleSheet, View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import { useSelector, useDispath } from "react-redux";
import Fontisto from "react-native-vector-icons/Fontisto";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import CommonStyle from "../../ScreenCommonCss";
import NavigationStrings from "../../../Constant/NavigationStrings";
import Style from "./Style";


const EditProfile = (props) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const profileInfo = props.route.params;
    const isUserID = useSelector((state) => state.isSignIn.token);
    const [gender, setGender] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [userProfileInfo, setUserProfileInfo] = useState({
        idUser:isUserID,
        userID: profileInfo.userID,
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
        userGender: profileInfo.userGender,
        mobileNbr: profileInfo.mobileNbr,
        email:profileInfo.email,
        userPwd:profileInfo.userPwd
      });
      console.log(userProfileInfo, "up")
      const addProfile = (val) => {
        setUserProfileInfo(() => ({...userProfileInfo, ...val}))
      }



    const updateProfile = () => {
      setIsLoading(true)
        axios.post(`${NavigationStrings.BASE_URL}updateUserProfile.php`,
        JSON.stringify(userProfileInfo)
      ).then((res) => {
        props.navigation.navigate(NavigationStrings.USER_PROFILE)
        console.log(res, "Updated Data")
      })
     }

     const setMaleGender = () => {
      setGender('Male');
      setUserProfileInfo(() => ({...userProfileInfo, userGender: 'Male'}))
     }

     const setFemaleGender = () => {
      setGender('Female');
      setUserProfileInfo(() => ({...userProfileInfo, userGender: 'Female'}))
     }

  /*   const getChecked = (value) => {
      setUserProfileInfo(() => ({...userProfileInfo, userGender: value}))
      console.log(value, "gender")
    }
 */
    console.log(gender, "gender")


    return (
        <>
         <View style={[CommonStyle.flex1, themeContainerStyle]} >
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
         
             <HeaderComp backBtn title="Edit Profile"/>
              <ScrollView style={CommonStyle.paddingHorizontal20}>

                   {/* Full name */}
                   <View style={{flexDirection:'row'}}>
                     <View  style={Style.inputBox}>
                        <Text style={[Style.label, themeTextStyle]}>First Name </Text>
                         <TextInput
                            style={[Style.inputFieldTxt, {marginRight:10}]}
                            onChangeText={(val) => addProfile({firstName: val}) }
                            value={userProfileInfo.firstName}
                        />
                     </View>

                     <View style={Style.inputBox} >
                     <Text style={[Style.label, themeTextStyle]}>Last Name </Text>
                        <TextInput
                       style={[Style.inputFieldTxt, {marginLeft:10}]}
                       onChangeText={(val) => addProfile({lastName: val}) }
                       value={userProfileInfo.lastName}
                        />
                     </View>
                 </View>
                {/* Full name */}

                 {/*Last name */}
                 <View style={{flexDirection:'row'}}>
                 <View style={Style.inputBox} >
                     <Text style={[Style.label, themeTextStyle, {marginLeft:10}]}>Email </Text>
                        <TextInput
                       style={[Style.inputFieldTxt, {marginRight:10}]}
                       onChangeText={(val) => addProfile({userID: val}) }
                       value={userProfileInfo.userID}
                        />
                     </View>


                     <View  style={Style.inputBox}>
                        <Text style={[Style.label, themeTextStyle, {marginLeft:10}]}>Mobile Number </Text>
                         <TextInput
                            style={[Style.inputFieldTxt, {marginLeft:10}]}
                            onChangeText={(val) => addProfile({mobileNbr: val}) }
                            value={userProfileInfo.mobileNbr}
                        />
                     </View>

                 </View>
                {/*Last name */}




                 {/*Password */}
                 <View style={{flexDirection:'row'}}>
                 <View style={Style.inputBox} >
                     <Text style={[Style.label, themeTextStyle, {marginLeft:10}]}>Password</Text>
                        <TextInput
                       style={[Style.inputFieldTxt, {marginRight:10}]}
                       onChangeText={(val) => addProfile({userPwd: val}) }
                       value={userProfileInfo.userPwd}
                        />
                     </View>
                 </View>
                {/*Password */}




                    {/* Gender */}

                    <View style={Style.radioBtnGroup}>

                    <View>
                        <Text onPress={setMaleGender}>
                        {
                            gender === 'Male' || userProfileInfo.userGender ===  'Male' ?
                            <Text  style={[Style.activeRadioBtn, themeTextStyle]}> <Fontisto name="radio-btn-active" size={18}  /> Male </Text>
                            :
                            <Text style={Style.notActiveRadioBtn}> <Fontisto  name="radio-btn-passive" size={18}  /> Male </Text>
                         }
                         </Text>
                     </View>


                     <View   >
                         <Text onPress={setFemaleGender}>
                            {
                              gender === 'Female' || userProfileInfo.userGender ===  'Female' ?
                              <Text style={[Style.activeRadioBtn, themeTextStyle]}> <Fontisto name="radio-btn-active" size={18}  /> Female </Text>
                              :
                              <Text style={Style.notActiveRadioBtn}><Fontisto  name="radio-btn-passive" size={18}  /> Female </Text>
                            }
                          </Text>
                     </View>



                    
                 </View>



                {/* Update Profile */}
                <View >
                 <TouchableOpacity onPress={updateProfile} style={Style.donateBtn}>
                    <Text style={Style.donateBtnTxt}> Update Profile </Text>
                 </TouchableOpacity>
                </View>
                    {/* Update Profile */}

              </ScrollView>
        
         </View>
        </>
    )
}

export default EditProfile