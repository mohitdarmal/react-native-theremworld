import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, ImageBackground, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform, useColorScheme } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import ImagePath from "../../Constant/ImagePath";
import Validator  from "../../Utils/Validation";
import { showError } from "../../Utils/helperFunction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn} from "../../redux/actions/index";
import axios from "axios"
import Styles from "../SignIn/Style";
import NavigationStrings from "../../Constant/NavigationStrings";
import CommonStyle from "../ScreenCommonCss";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from "expo-auth-session";


WebBrowser.maybeCompleteAuthSession();

const SignUp = ({navigation}) => {

    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const [passwordvisible, isSetPasswordVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [googleToken, setGoggleToken] = useState();
    const myState = useSelector((token) => token.logIn);
    const disptach = useDispatch();

    
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
                  setUserInfo(data);
                  setIsLoading(true);
                  axios.post(`${NavigationStrings.BASE_URL}signupUser.php`,
                        JSON.stringify({
                            userID:  data.email,
                             password: '',
                             firstName: data.given_name,
                             lastName: data.family_name,
                             isInvited: false,
                             authType: 'google',
                             userPic: '',
                             socialToken: true,                        
                        })
                    ).then((res) => {
                        if (res.data.status == true) {
                            disptach(logIn(res.data.data.idUser));
                            AsyncStorage.setItem('userId', res.data.data.idUser.toString())
                            setIsLoading(false)
                        }
                        else{
                            alert(res.data.message, "Error");
                            setIsLoading(false);
                        }
                        
                    })                       

                });
              }

              getUserData();            
        
            }
      }, [response]);

     

const [userSigninStatus, isUserSigninStatus] = useState(false)
    const [userInfo, setUserInfo] = useState({
        userName:'',
        emailAddress :'',
        password:''
    });

    const {userName, emailAddress, password } = userInfo;


    const updateUserInfo = (val) => {
        setUserInfo(() => ({...userInfo, ...val}))
    }

    useEffect(() => {

    }, [userSigninStatus])

    const isValidate = () => {
        const error = Validator({
            userName,
            emailAddress,
        })
        if(error){
            showError(error)
            return false
        }
        return true;
    }



    const onSignUp = () => {
        const checkValid = isValidate();
        if(checkValid){
            setIsLoading(true)
        axios.post(`${NavigationStrings.BASE_URL}signupUser.php`,
                JSON.stringify({
                    userID: userInfo.emailAddress,
                     password: userInfo.password,
                     firstName: '',
                     lastName: '',
                     isInvited: false,
                     authType: 'ID',
                     userPic: '',
                     socialToken: '',
                })

            ).then((res) => {     
                if (res.data.status == true) {
                    disptach(logIn(res.data.data.idUser));
                    AsyncStorage.setItem('userId', res.data.data.idUser.toString())
                    setIsLoading(false)
                }
                else{
                    alert(res.data.message)
                    setIsLoading(false)
                }   
            console.log("signup",res.data)
        }).catch((err) => {
            return alert("Please Enter Correct Information")
        })
    }
    }


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
                            <Text style={[Styles.loginTitle, themeTextStyle]}>Register </Text>
                            <Image source={ImagePath.loginIcon} style={{width:121, height:121, alignSelf: 'center',}}/>
                        </View>
                        {/* SignIn title end*/}
                    </ImageBackground>
            {/* Header end */}

        <ScrollView> 
            <View style={Styles.inputBoxContainer}> 
            {/* Full name */}
                  <View style={Styles.inputBox}>
                    <FontAwesome style={Styles.inputBoxIcon} name="user-o" size={18}  />
                     <TextInput
                        style={Styles.inputField}
                        onChangeText={(val) => updateUserInfo({userName: val})}
                        placeholder="Full Name"
                        placeholderTextColor="#c1c1c1" />
                  </View>
                 {/* Full name */}
                
                {/* Email Address */}
                    <View style={Styles.inputBox}>
                        <FontAwesome style={Styles.inputBoxIcon} name="envelope-o" size={18}  />
                        <TextInput
                        style={Styles.inputField}
                        onChangeText={(val) => updateUserInfo({emailAddress: val})}
                        keyboardType="email-address"
                        placeholder="E-mail Address"
                        placeholderTextColor="#c1c1c1" />
                    </View>
                {/* Email Address */}

                 {/* Password */}
                    <View style={Styles.inputBox}>
                      <Feather style={Styles.inputBoxIcon} name="lock" size={18}  />
                        <TextInput
                        style={Styles.inputField}
                        onChangeText={(val) => updateUserInfo({password: val})}
                        secureTextEntry={passwordvisible ? true : false}
                        placeholder="Password"
                        placeholderTextColor="#c1c1c1" />
                        <TouchableOpacity onPress={() => {isSetPasswordVisible(!passwordvisible)}}>
                            <FontAwesome style={Styles.inputBoxIconSecond} name={passwordvisible ? "eye-slash" : "eye"} size={18}  />
                        </TouchableOpacity>
                    </View>
                {/* Password */} 
                 

                        
                {/* Register button */}
                    <View  style={Styles.loginBtnContanier}>
                        <TouchableOpacity onPress={onSignUp} >
                            <Text  style={Styles.loginBtn}> Register </Text>
                        </TouchableOpacity>
                    </View>
                {/* Register button */}

                 

                {/* Or start */}
                <View style={{paddingVertical:15}}>
                    <Image  source={ImagePath.orImage} style={Styles.orOption}/>
                </View>
               
                {/* Or end */}
    
                {/* Login with google start */}
                    <View style={Styles.loginGoogleBtnContainer}>
                        <TouchableOpacity onPress={() => { promptAsync()}}   style={Styles.loginGoogleBtn}>
                            <Image  source={ImagePath.googleImg} style={{height:26, marginRight:30}}/>
                            <Text style={Styles.loginGoogleText}> Login with Gmail </Text>
                        </TouchableOpacity>
                    </View>
                {/* Login with google end */}


                {/* Already account */}
                    <View style={Styles.alreadyAccount}>
                        <Text style={[Styles.alreadyAcTxt, themeTextStyle]}> Already have an account?</Text>
                        <TouchableOpacity onPress={() =>  navigation.navigate(NavigationStrings.SIGNIN)}>
                            <Text style={[Styles.registerText, ]}> Login! </Text>
                        </TouchableOpacity>
                    </View>
                {/* Already account */}



                </View>
                </ScrollView>
            </View>
{/* Page End */}
        

          


        </View>
    )
    // (


        
    //     <>
    //       {/* Data loading indicator */}
    //             {isLoading
    //         ?
    //             <View style={CommonStyle.screnLoader}>
    //                 <ActivityIndicator size="large" color="#062B66"  />
    //             </View>
    //         :
    //             <View></View>
    //        }
    //     {/* Data loading indicator */}
    //     <ScrollView style={Styles.container}>

    //         <ImageBackground
    //         source={ImagePath.headerImage}
    //         style={Styles.headerImg}
    //         >
    //         {/* Signup title start*/}
    //         <View style={Styles.headerTextContainer}>
    //             <Image source={ImagePath.userIcon} style={{width:55, height:55}}/>
    //              <Text style={Styles.headerText}> SIGN UP </Text>
    //              <Text style={Styles.headerSubTxt}> Create your account </Text>
    //          </View>
    //         {/* Signup title end*/}
    //          </ImageBackground>


    //         {/* Signup form start */}

    //         <View style={Styles.inputBoxContainer}>

    //             {/* Full name */}
    //              <View style={Styles.inputBox}>
    //                 <FontAwesome style={Styles.inputBoxIcon} name="user" size={18}  />
    //                 <TextInput
    //                    style={Styles.inputField}
    //                    onChangeText={(val) => updateUserInfo({userName: val})}
    //                    placeholder="Full Name"
    //                    placeholderTextColor="#c1c1c1" />
    //              </View>
    //             {/* Full name */}


    //              {/* Email Address */}
    //              <View style={Styles.inputBox}>
    //                 <FontAwesome style={Styles.inputBoxIcon} name="envelope" size={18}  />
    //                 <TextInput
    //                    style={Styles.inputField}
    //                    onChangeText={(val) => updateUserInfo({emailAddress: val})}
    //                    keyboardType="email-address"
    //                    placeholder="E-mail Address"
    //                    placeholderTextColor="#c1c1c1" />
    //              </View>
    //             {/* Email Address */}

    //              {/* Password */}
    //              <View style={Styles.inputBox}>
    //                 <FontAwesome style={Styles.inputBoxIcon} name="key" size={18}  />
    //                 <TextInput
    //                    style={Styles.inputField}
    //                    onChangeText={(val) => updateUserInfo({password: val})}
    //                    secureTextEntry={passwordvisible ? true : false}
    //                    placeholder="Password"
    //                    placeholderTextColor="#c1c1c1" />
    //                    <TouchableOpacity onPress={() => {isSetPasswordVisible(!passwordvisible)}}>
    //                        <FontAwesome style={Styles.inputBoxIconSecond} name={passwordvisible ? "eye-slash" : "eye"} size={18}  />
    //                    </TouchableOpacity>
    //              </View>
    //             {/* Password */}

    //             {/* Sign up button */}
    //             <View style={Styles.inputBox}>
    //              <TouchableOpacity onPress={onSignUp} style={{flex:1,}}>
    //                <Text style={Styles.signUpBtn}> SIGN UP </Text>
    //              </TouchableOpacity>
    //              </View>
    //             {/* Sign up button */}

    //             {/* Already account */}
    //             <View style={Styles.alreadyAccount}>
    //              <Text > Already have an account?</Text>
    //              <TouchableOpacity onPress={() =>  navigation.navigate(NavigationStrings.SIGNIN)}>
    //                 <Text style={Styles.signInNow}> Sign in Now! </Text>
    //              </TouchableOpacity>
    //             </View>
    //             {/* Already account */}

    //             <View style={{paddingVertical:15}}>
    //                 <Image  source={ImagePath.orImage} />
    //             </View>

    //             <View style={Styles.inputBox}>
    //             <TouchableOpacity  onPress={() => { promptAsync()}} style={Styles.googleAccount}>
    //             <FontAwesome style={Styles.googleIcon} name="google-plus" size={18}  />
    //             <Text style={Styles.googleTxt}> LOGIN WITH GOOGLE </Text>
    //              </TouchableOpacity>
    //             </View>


              

      

    //          </View>
    //          {/* Signup form end */}
    //     </ScrollView>


    //     </>
    // )

}

export default SignUp;