import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, ImageBackground, Image, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme, StyleSheet, SafeAreaView } from "react-native";
import Styles from "./Style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import ImagePath from "../../Constant/ImagePath";
import Validator  from "../../Utils/Validation";
import { showError } from "../../Utils/helperFunction";
// import Styles from "../SignUp/Style";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from "../../redux/actions/index";
import NavigationStrings from "../../Constant/NavigationStrings";
import CommonStyle from "../ScreenCommonCss";
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from "expo-auth-session";
import * as Linking from 'expo-linking';
 

const SignIn = ({navigation}) => {

    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    
    const [isLoading, setIsLoading] = useState(false);
    const myState = useSelector((token) => token.logIn);
    const disptach = useDispatch();

    const [passwordvisible, isSetPasswordVisible] = useState(true);
    const [userInfo, setUserInfo] = useState({
        isLoading: false,
        email:'',
        password:''
    });


    const updateUserInfo = (val) => {
        setUserInfo(() => ({...userInfo, ...val}))
    }

    const onSingIn =  () => {
            setIsLoading(true);
            console.log(userInfo, "gettingdetails")
            axios.get(`${NavigationStrings.BASE_URL}signinUser.php`, {
                params: {uID: userInfo.email, pwd : userInfo.password}
            }).then((res) => {
                console.log(res.data.data, "aftersingin")
                disptach(logIn(res.data.data.idUser));
                AsyncStorage.setItem('userId', res.data.data.idUser)
                setIsLoading(false)
                console.log(res.data.data.idUser, "Login Id")
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            })

    }



    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '732965393953-djohvvqn4js86582d9jv8qommv1iih27.apps.googleusercontent.com',
        iosClientId: '732965393953-5bdbug7cppfbg2fgarafsvmktdqvchsd.apps.googleusercontent.com',
        androidClientId: '732965393953-s8vt8jk95at5dvqna77k9rn234on6ao3.apps.googleusercontent.com',
        webClientId: '732965393953-bc9fctqc7v5hhkgofl3ollbt3hvjt3la.apps.googleusercontent.com',
        scopes:['profile', 'email'],
        redirectUri: makeRedirectUri({  
            useProxy: false,
                native: Platform.select({
                    android: "com.googleusercontent.apps.732965393953-s8vt8jk95at5dvqna77k9rn234on6ao3:/oauth2redirect",
                    default: undefined
                })
        })
         
    })


    React.useEffect(() => {
      
           if (response?.type === 'success') {
             const { authentication } = response;
             async function getUserData() {
                 let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                   headers: { Authorization: `Bearer  ${authentication.accessToken}`}
                 });
             
                 userInfoResponse.json().then(data => {
 
                   setIsLoading(true);
                   
                   axios.get(`${NavigationStrings.BASE_URL}signinUser.php`, {
                    params: {uID: data.email, pwd : '', isSocial:true}
                }).then((res) => {
                    if (res.data.status == true) {
                        disptach(logIn(res.data.data.idUser));
                        AsyncStorage.setItem('userId', res.data.data.idUser)
                        setIsLoading(false)
                        console.log(res.data.data.idUser, "Login Id")
                    }else{
                        alert(res.data.message, "Error")
                        setIsLoading(false);
                    }
                    
                })
              
                 });
               }
 
               getUserData();            
         
             }
       }, [response]);

  

    return (
        <View style={CommonStyle.flex1}>
            {/* Data loading indicator start*/}
            {isLoading
                ?
                    <View style={CommonStyle.screnLoader}>
                        <ActivityIndicator size="large" color="#062B66"  />
                    </View>
                :
                    <View></View>
            }
            {/* Data loading indicator end */}


{/* Page Start */}
            <View style={[CommonStyle.flex1, themeContainerStyle]} >

            {/* Header start */}
                    <ImageBackground
                        source={ImagePath.loginBg}
                        style={Styles.headerImg}
                        >
                        {/* SignIn title start*/}
                        <View style={[Styles.headerTextContainer, ]}>
                            <Text style={[Styles.loginTitle, themeTextStyle]}>Login </Text>
                            <Image source={ImagePath.loginIcon} style={{width:121, height:121, alignSelf: 'center',}}/>
                        </View>
                        {/* SignIn title end*/}
                    </ImageBackground>
            {/* Header end */}

        <ScrollView> 
            <View style={Styles.inputBoxContainer}> 
                {/* Email Address */}
                <View style={Styles.inputBox}>
                <FontAwesome style={Styles.inputBoxIcon} name="envelope-o" size={18}  />
                <TextInput
                    style={Styles.inputField}
                    onChangeText={(val) => updateUserInfo({email: val})}
                    keyboardType="email-address"
                    placeholder="E-mail Address / User Id"
                    placeholderTextColor="#c1c1c1" />
                </View>
                 
                {/* Email Address */}

                  {/* Password */}
                  <View style={Styles.inputBox}>
                    <Feather style={Styles.inputBoxIcon} name="lock" size={18}  />
                    <TextInput
                       style={Styles.inputField}
                       secureTextEntry={passwordvisible ? true : false}
                       onChangeText={(val) => updateUserInfo({password: val})}
                       placeholder="Password"
                       placeholderTextColor="#c1c1c1" />
                       <TouchableOpacity onPress={() => {isSetPasswordVisible(!passwordvisible)}}>
                           <FontAwesome style={Styles.inputBoxIconSecond} name={passwordvisible ? "eye-slash" : "eye"} size={18}  />
                       </TouchableOpacity>
                 </View>
                {/* Password */}

                    {/* Already account */}
                <View style={Styles.forgetPassword}>
                 <TouchableOpacity >
                    <Text style={[Styles.forgetPasswordBtn, themeTextStyle]}> Forget Password ?</Text>
                 </TouchableOpacity>
                </View>
                {/* Already account */}


                  {/* Sign In button */}
                  <View  style={Styles.loginBtnContanier}>
                    <TouchableOpacity onPress={onSingIn} >
                    <Text style={Styles.loginBtn}> Login </Text>
                    </TouchableOpacity>
                 </View>
                {/* Sign In button */}

                {/* Or start */}
                <View style={{paddingVertical:15}}>
                    <Image  source={ImagePath.orImage} style={Styles.orOption}/>
                </View>
               
                {/* Or end */}
    
                {/* Login with google start */}
                    <View style={Styles.loginGoogleBtnContainer}>
                        <TouchableOpacity onPress={() => { promptAsync()}} style={Styles.loginGoogleBtn}>
                            <Image  source={ImagePath.googleImg} style={{height:26, marginRight:30}}/>
                            <Text style={Styles.loginGoogleText}> Login with Gmail </Text>
                        </TouchableOpacity>
                    </View>
                {/* Login with google end */}


                {/* Already account */}
                    <View style={Styles.alreadyAccount}>
                    <Text style={[Styles.alreadyAcTxt, themeTextStyle]}> Already have an account?</Text>
                    <TouchableOpacity onPress={() =>  navigation.navigate('SignUp')}>
                        <Text style={[Styles.registerText, ]}> Sign Up Now! </Text>
                    </TouchableOpacity>
                    </View>
                {/* Already account */}



                </View>
                </ScrollView>
            </View>
{/* Page End */}
        

          


        </View>
    )

}


export default SignIn;