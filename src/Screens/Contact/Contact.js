import React, {useState} from "react";
import { Modal, View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import SelectList from 'react-native-dropdown-select-list';
import NavigationString from "../../Constant/NavigationStrings";
import Style from "./Style";
import { showError } from "../../Utils/helperFunction";
import Validator from "../../Utils/ContactValidation";

const Contact = ({navigation}) => {

   const colorScheme = useColorScheme();
   const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
   const themeContainerStyle =
   colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

 // Getting user ID
   const isUserID = useSelector((state) => state.isSignIn.token);
   const [modalErrorVisible, setErrorModalVisible] = useState(false);
   const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [selected, setSelected] = React.useState("");
   const data = [
      {key:'Report an issue',value:'Report an issue'},
      {key:'Provide feedback',value:'Provide feedback'},
      {key:'Ask a question',value:'Ask a question'},
      {key:'Request a feature',value:'Request a feature'},
      {key:'General',value:'General'},
   ];

   // Set user data start
   const [contactUsData, setContactUsData] = useState(
      {
         idUser: isUserID,
         firstName: '',
         lastName: '',
         contactEmail: '',
         contactPhone: '',
         contactReason:'',
         contactText:''
        }
   )

   const addContactDetail = (name, val) => {
      setContactUsData({...contactUsData,  [name]:val})
    }

    const addCardValue = (name, val) => {
      setContactUsData({...contactUsData, card:{...contactUsData.card, [name]:val}})
    }

/* Validation part start */
const {firstName, lastName, Email, reason, message} = contactUsData;

const isValidate = () => {
   const error = Validator({
      firstName, lastName, Email, reason, message
   })
   if(error){
       showError(error)
       return false
   }
   return true;
}
/* Validation part end */


//  Click on donate now button start
   const submitNow = () => {
      const checkValid = isValidate();
      if(checkValid){
         setIsLoading(true)
      axios.post(`${NavigationString.BASE_URL}saveContactUs.php`,
              JSON.stringify(contactUsData)
          ).then((res) => {
            //   navigation.navigate("SignIn");
            console.log(res, "Were")
             if(res.data.status == false){
               setErrorModalVisible(true)
            }
            else{
               setSuccesModalVisible(true);
            }
            setIsLoading(false)
      }).catch((err) => {
          return alert("Please Enter Correct Information")
      })
   }
  }

  const closeSuccessfulPopup = () => {
   setSuccesModalVisible(!modalSuccesVisible);
   navigation.navigate(NavigationString.WELCOME)
}

    return (
        <>
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


         

            {/* Error Modal */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalErrorVisible}
                  onRequestClose={() => {
                     setErrorModalVisible(!modalErrorVisible);
                  }}
               >
                  <View style={{  flex: 1,
                        justifyContent: "center",
                        alignItems: "center", backgroundColor:'#00000085'}}>

                           <View style={{backgroundColor:'#fff', flexDirection:'row', padding:20, marginHorizontal:25}}>
                              <View>
                                <Text style={{color:'#000', fontSize:20}}> Error </Text>
                              </View>

                              <View>
                                 <TouchableOpacity onPress={() => setErrorModalVisible(!modalErrorVisible)} >
                                   <Text> <AntDesign style={Style.closeBtn} color="red" name="closecircle" size={20}  /> </Text>
                                </TouchableOpacity>
                                </View>
                           </View>

                  </View>
             </Modal>
          {/* Error Modal */}


             {/* Success Modal */}
             <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalSuccesVisible}
                  onRequestClose={() => {
                     setSuccesModalVisible(!modalSuccesVisible);
                  }}
               >
                  <View style={{  flex: 1,
                        justifyContent: "center",
                        alignItems: "center", backgroundColor:'#031750f5'}}>
                           <View style={{backgroundColor:'#fff', padding:20, marginHorizontal:25, position:'relative'}}>
                           <View style={{top:-7, right:-10,  position:'absolute'}}>
                               <TouchableOpacity onPress={ closeSuccessfulPopup} >
                                  <Text> <AntDesign style={[Style.closeBtn]} color="red" name="closecircle" size={20}  /> </Text>
                                </TouchableOpacity>
                           </View>
                              <View>
                                <Text style={{marginBottom:10, fontSize:18}}>Thank you for contacting us. We will get back to you as soon as we can.</Text>
                              </View>

                           </View>
                  </View>
             </Modal>
  {/* Success Modal */}


  <HeaderComp toggleBtn title="Contact Us"/>

  <View style={CommonStyle.paddingHorizontal20}><Text style={[Style.contactTxt, themeTextStyle]}>Thank you for contacting us. Please fill in all the details below and we will respond at the earliest possible. Currently our response times are more than one week. All fields are required </Text></View>

              <ScrollView style={CommonStyle.paddingHorizontal20}>
                   {/* Full name */}
                   <View style={{flexDirection:'row'}}>
                     <View  style={Style.inputBox}>
                         <TextInput
                            style={[Style.inputFieldTxt, {marginRight:10}]}
                            name="firstName"
                            onChangeText={(e) => addContactDetail('firstName', e) }
                       placeholder="First Name" />
                     </View>

                     <View style={Style.inputBox} >
                        <TextInput
                       style={[Style.inputFieldTxt, {marginLeft:10}]}
                       name="lastName"
                       onChangeText={(e) => addContactDetail('lastName', e) }
                       placeholder="Last Name" />
                     </View>
                 </View>
                {/* Full name */}

                 {/* Email Address */}
                 <View style={{flexDirection:'row'}}>
                     <View  style={Style.inputBox}>
                         <TextInput
                            style={Style.inputFieldTxt}
                            name="Email"
                            keyboardType="email-address"
                            onChangeText={(e) => addContactDetail('contactEmail', e) }
                       placeholder="Email" />
                     </View>

                 </View>
                {/* Email Address */}

                {/*  */}
                  <SelectList
                     inputStyles={{color:'#01203fa1', fontSize:18, opacity:0.7}} boxStyles={[themeTextStyle, { height:60, backgroundColor:'#fff', marginTop:25,  elevation: 20, shadowColor: '#00000047', fontSize:16, color:'#01203fa1', borderColor:'#fff', paddingTop:15}]}
                     searchicon={{color:'#fff'}}
                     dropdownTextStyles={[{color:'#fff', fontSize:14, opacity:0.8}, themeTextStyle]}
                     arrowicon={<FontAwesome name="chevron-down" style={{paddingTop:7}} size={12} color={'#00000047'} />}
                     search={false}
                     setSelected={setSelected}
                     data={data} onSelect={(e) => addContactDetail('contactReason', selected)}
                  />
                {/*  */}

               {/* Message dream */}
                  <View style={Style.textArea}>
                        <TextInput
                        style={Style.txtAreaTxt}
                       multiline={true}
                     //   numberOfLines={4}
                       onChangeText={(e) => addContactDetail('contactText', e) }
                       placeholder="Message"
                       placeholderTextColor="#c1c1c1" />
                </View>
                {/* Message dream */}




                {/* Send Now */}
                <View >
                 <TouchableOpacity onPress={submitNow} style={Style.donateBtn}>
                    <Text style={Style.donateBtnTxt}> Submit Now </Text>
                 </TouchableOpacity>
                </View>
                    {/* Send Now */}

              </ScrollView>
         


      </View>
        </>
    )
}

export default Contact