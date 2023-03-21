import React, {useState, useEffect} from "react";
import {View,Modal, StyleSheet, Text, ScrollView, ImageBackground, TextInput, Switch, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import CommonStyle from "../../ScreenCommonCss";
import Style from "./Style";
import NavigationStrings from "../../../Constant/NavigationStrings";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../../Utils/helperFunction";
import Validator from "../../../Utils/DreamCircleValidation";

const AddDreamCircleCircle = ({navigation}) => {

    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const isUserID = useSelector((state) => state.isSignIn.token);
    const [switchValue, setSwitchValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [getCircleDream, setGetCircleDream] = useState();
    const [saveSameEmail, setSaveSameEmail] = useState("");
    const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
    const [addNewUser, setAddNewUser] = useState(false);

    const [addCircle, setAddCircle] = useState({
        idUser:isUserID ,
        idMember:0,
        userID: 0,
        firstName: '',
        lastName: '',
        memberEmail: '',
        flag: 'I',
        autoInvite:switchValue
    });

    /* Validation part start */
const {memberEmail} = addCircle;

const isValidate = () => {
   const error = Validator({
      memberEmail
   })
   if(error){
       showError(error)
       return false
   }
   return true;
}
/* Validation part end */

    useEffect(() => {
        getDreamCircle()
    },[])

      const dreamCircleValue = (val) => {
        setAddCircle(() => ({...addCircle, ...val}))
      }

      const toggleSwitch = (value) => {
        setSwitchValue(value);
        console.log(value, "find")
        if(value){
            setAddCircle.autoInvite = "1"
        }
        else{
            setAddCircle.autoInvite = "" 
        }
      };

      const getDreamCircle = () => {

        axios.get(`${NavigationStrings.BASE_URL}getDreamsCircle.php`, {
          params : {idUser:isUserID}
        }).then((val) => {
          setGetCircleDream(val.data.data)
        })
    
      }



      const addDreamCircle = () => {
        const checkValid = isValidate();
        if(checkValid){
        var validateEmail = ""
          getCircleDream.map((item) => {
            if(item.memberEmail === addCircle.memberEmail){
              validateEmail = item.memberEmail
            }
          })

          console.log(validateEmail, "email");
       
 
        if(validateEmail === addCircle.memberEmail){       
          setSuccesModalVisible(true)         
        }
        else {
          setAddNewUser(true)
          setIsLoading(true)
          axios.post(`${NavigationStrings.BASE_URL}updateDreamsCircle.php`,
          JSON.stringify(addCircle)
        ).then((res) => {
          setIsLoading(false);
          setAddNewUser(true)                
        })         
        } 
       
    }
     }

    return(
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

             {/* If email id exist then this opup will open Modal */}
             <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalSuccesVisible}
                      onRequestClose={() => {
                        setSuccesModalVisible(!modalSuccesVisible);
                      }}
                  >
                      <View style={[themeContainerStyle,{flex: 1, alignItems: "center", justifyContent:'center', paddingTop:45, backgroundColor:'#031750f5',}]}>

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
                
                                 
                                      <Text style={[themeTextStyle, {color:'#fff', fontSize:18,paddingHorizontal:30, textAlign:'center', lineHeight:28}]}>A user account with name {addCircle.firstName} {addCircle.lastName} and email {addCircle.memberEmail} already exists in our system. Add this person to your dream circle?</Text>
                                      <TouchableOpacity onPress={() => {
                                        navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE)
                                        setSuccesModalVisible(false)
                                        }}>
                                      <Text style={{color:'#000', marginTop:30, fontSize:20, backgroundColor:'#fff', borderRadius:50, width:100,height:50, textAlign:'center', lineHeight:50}}>Okay</Text>
                                  </TouchableOpacity>   
                                        
                              </View>
                      </Modal>
                   {/* If email id exist then this opup will open Modal */}

                   {/* If email is not id exist then this opup will open Modal */}
                    <Modal
                          animationType="slide"
                          transparent={true}
                          visible={addNewUser}    
                          onRequestClose={() => {
                              setSuccesModalVisible(!addNewUser);
                           }}                       
                      >
                          <View style={[themeContainerStyle,{flex: 1, alignItems: "center", justifyContent:'center', paddingTop:45, backgroundColor:'#031750f5',}]}>

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
                    
                                    
                                          <Text style={[themeTextStyle, {color:'#fff', fontSize:18,paddingHorizontal:30, textAlign:'center', lineHeight:28}]}>An invite was sent to {addCircle.firstName} {addCircle.lastName} at {addCircle.memberEmail} Please inform the user as, based on user's email filters, the email may have been redirected to their junk or spam folder</Text>
                                          <TouchableOpacity onPress={() => {
                                              navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE);
                                              setAddNewUser(false)
                                            }}>
                                          <Text style={{color:'#000', marginTop:30, fontSize:20, backgroundColor:'#fff', borderRadius:50, width:100,height:50, textAlign:'center', lineHeight:50}}>Okay</Text>
                                      </TouchableOpacity>   
                                            
                                  </View>
                      </Modal>
                      {/* If email id is not exist then this opup will open Modal */}

             
               <HeaderComp backBtn title="Add Dream Circle"/>
               <View style={Style.container}>

               <ScrollView >
                    <View style={Style.detailBox}>

                        {/*  First Name */}
                        <View >
                            <TextInput
                            style={Style.inputField}
                            onChangeText={(val) => dreamCircleValue({firstName: val}) }
                            placeholder="Enter First Name"
                            placeholderTextColor="#c1c1c1"
                        />
                        </View>
                        {/*  First Name */}


                        {/* Last Name */}
                         <View >
                            <TextInput
                                style={Style.inputField}
                                onChangeText={(val) => dreamCircleValue({lastName: val}) }
                                placeholder="Enter Last Name"
                                placeholderTextColor="#c1c1c1"
                                    />
                        </View>
                            {/* Last Name */}

                            {/* Member Email*/}
                                <View>
                                    <TextInput
                                    style={Style.inputField}
                                    onChangeText={(val) => dreamCircleValue({memberEmail: val.toLowerCase()}) }
                                    placeholder="Enter Member Email"
                                    placeholderTextColor="#c1c1c1" />
                                </View>
                                {/* Dream situation */}

                                {/* Toggle */}
                                    <View style={Style.switchContainer} >
                                    <Switch
                                        trackColor={{false : '#808080', true : '#34B768' }}
                                        thumbColor={switchValue ? '#fff' : '#5E5E5E'}
                                        onValueChange={toggleSwitch}
                                        value={switchValue}
                                    />
                                    <Text style={switchValue ? Style.switchBtnActive : Style.switchBtnInActive}> Visible to all </Text>
                                    </View>
                                {/* Toggle */}

                                {/* Save */}
                                    <View style={Style.saveBtnContainer}>
                                    <TouchableOpacity onPress={ addDreamCircle} style={{flex:1,}}>
                                    <Text style={Style.save}> Update </Text>
                                    </TouchableOpacity>
                                    </View>
                                {/* Save */}

                             </View>
                    </ScrollView>

               </View>


   
        </View>
    )
}

export default AddDreamCircleCircle