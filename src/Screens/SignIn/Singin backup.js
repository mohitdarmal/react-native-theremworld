import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, ImageBackground, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePath from "../../Constant/ImagePath";
import Validator  from "../../Utils/Validation";
import { showError } from "../../Utils/helperFunction";
import Styles from "../SignUp/Style";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from "../../redux/actions/index";
import NavigationStrings from "../../Constant/NavigationStrings";
import CommonStyle from "../ScreenCommonCss";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from "expo-auth-session";


const SignIn = ({navigation}) => {


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
            setIsLoading(true)
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
                useProxy: true,
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
        <>
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

        <ScrollView style={Styles.container}>
            <ImageBackground
            source={ImagePath.headerImage}
            style={Styles.headerImg}
            >
            {/* SignIn title start*/}
            <View style={Styles.headerTextContainer}>
                <Image source={ImagePath.userIcon} style={{width:55, height:55}}/>
                 <Text style={Styles.headerText}> SIGN IN </Text>
                 <Text style={Styles.headerSubTxt}> Create your account </Text>
             </View>
            {/* SignIn title end*/}
             </ImageBackground>


            {/* SignIn form start */}

            <View style={Styles.inputBoxContainer}>


                 {/* Email Address */}
                 <View style={Styles.inputBox}>
                    <FontAwesome style={Styles.inputBoxIcon} name="envelope" size={18}  />
                    <TextInput
                       style={Styles.inputField}
                       onChangeText={(val) => updateUserInfo({email: val})}
                       keyboardType="email-address"
                       placeholder="E-mail Address"
                       placeholderTextColor="#c1c1c1" />
                 </View>
                {/* Email Address */}

                 {/* Password */}
                 <View style={Styles.inputBox}>
                    <FontAwesome style={Styles.inputBoxIcon} name="key" size={18}  />
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

                {/* Sign In button */}
                <View style={Styles.inputBox}>
                 <TouchableOpacity onPress={onSingIn} style={{flex:1,}}>
                   <Text style={Styles.signUpBtn}> SIGN IN </Text>
                 </TouchableOpacity>
                 </View>
                {/* Sign In button */}

                {/* Already account */}
                <View style={Styles.alreadyAccount}>
                 <Text > Already have an account?</Text>
                 <TouchableOpacity onPress={() =>  navigation.navigate('SignUp')}>
                    <Text style={Styles.signInNow}> Sign Up Now! </Text>
                 </TouchableOpacity>
                </View>
                {/* Already account */}

                <View style={{paddingVertical:15}}>
                    <Image  source={ImagePath.orImage} />
                </View>

                <View style={Styles.inputBox}>
                <TouchableOpacity onPress={() => { promptAsync()}} style={Styles.googleAccount}>
                <FontAwesome style={Styles.googleIcon} name="google-plus" size={18}  />
                <Text style={Styles.googleTxt}> LOGIN WITH GOOGLE </Text>
                 </TouchableOpacity>
                </View>

             </View>
             {/* SignIn form end */}
        </ScrollView>
        </>
    )

}

export default SignIn;