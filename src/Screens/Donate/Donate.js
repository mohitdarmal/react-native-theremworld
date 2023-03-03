import React, {useState} from "react";
import { Modal, View, Linking, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import NavigationString from "../../Constant/NavigationStrings"
import Style from "./Style";
import { showError } from "../../Utils/helperFunction";
import Validator from "../../Utils/DonationValidation"

const Donate = ({navigation}) => {

   const colorScheme = useColorScheme();
   const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
   const themeContainerStyle =
   colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

 // Getting user ID
   const isUserID = useSelector((state) => state.isSignIn.token);
   const [modalErrorVisible, setErrorModalVisible] = useState(false);
   const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [paymentReceipt, setPaymentReceipt] = useState();
   const [successpaymentReceipt, setSuccessPaymentReceipt] = useState({
      name:'',
      amount:'',
      receipt_url:''
   });

   // Set user data start
   const [donateData, setDonateData] = useState(
      {
         idUser: isUserID,
         amount: '',
         firstName: '',
         lastName: '',
         Email: '',
         card: {
             number: '', exp_month: '', exp_year: '', cvc: ''
         },
        }
   )

   const addDonateValue = (name, val) => {
      setDonateData({...donateData,  [name]:val})
    }

    const addCardValue = (name, val) => {
      setDonateData({...donateData, card:{...donateData.card, [name]:val}})
    }
 // Set user data End

/* Use this code for testing
            $token = json_encode($stripe->tokens->create([
                'card' => [
                    'number' => '4242424242424242',
                    'exp_month' => 5,
                    'exp_year' => 2023,
                    'cvc' => '314',
                    'currency' => 'usd',
                ],
            ]));

        // For testing purposes use the following card numbers
        // 4242424242424242 -- valid
        // 4000000000000002 -- card declined / generic
        // 4000000000009995 -- card decline / insufficient funds
        // 4000000000009987 -- card decline / lost card
        // 4000000000009979 -- card decline / stolen card
        // 4000000000000069 -- card expired
        // 4000000000000127 -- incorrec cvc
        // 4000000000000119 -- processing error
        // 4242424242424241 -- incorrect number
   */


/* Validation part start */
const {amount, firstName, lastName, Email, card:{number, exp_month, exp_year, cvc}  } = donateData;

const isValidate = () => {
   const error = Validator({
      amount,
      firstName,
      lastName,
      Email,
      number,
      exp_month,
      exp_year,
      cvc
   })
   if(error){
       showError(error)
       return false
   }
   return true;
}
/* Validation part end */


//  Click on donate now button start
   const donateNow = () => {
      const checkValid = isValidate();
      if(checkValid){
         setIsLoading(true)
      axios.post(`${NavigationString.BASE_URL}processPayment.php`,
              JSON.stringify(donateData)
          ).then((res) => {
            //   navigation.navigate("SignIn");
            console.log(res.data.status, "Were")
            if(res.data.status == false){
               setPaymentReceipt(res.data.message)
               setErrorModalVisible(true)
            }
            else{
               successpaymentReceipt.billing_details = res.data.data.billing_details.name;
               successpaymentReceipt.amount = res.data.data.amount / 100;
               successpaymentReceipt.receipt_url = res.data.data.receipt_url;
               setSuccesModalVisible(true);
            }
            setIsLoading(false)
            console.log(res, "modal")
      }).catch((err) => {
          return alert("Please Enter Correct Information")
      })
   }
  }
//  Click on donate now button end

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


        
       <HeaderComp toggleBtn title="Donate"/>

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
                                <Text style={{color:'#000', fontSize:20}}>{paymentReceipt} </Text>
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
                        alignItems: "center", backgroundColor:'#00000085'}}>
                           <View style={{backgroundColor:'#fff', padding:20, marginHorizontal:25, position:'relative'}}>
                           <View style={{top:-7, right:-10,  position:'absolute'}}>
                               <TouchableOpacity onPress={ closeSuccessfulPopup} >
                                  <Text> <AntDesign style={[Style.closeBtn]} color="red" name="closecircle" size={20}  /> </Text>
                                </TouchableOpacity>
                           </View>
                              <View>
                                <Text style={{color:'#000', fontSize:18, marginBottom:5}}>Dear {successpaymentReceipt.billing_details}!   </Text>
                                <Text style={{marginBottom:10, fontSize:18}}>Thankyou for the Donation</Text>
                                <Text style={{marginBottom:15, fontSize:18}} >Amount of ${successpaymentReceipt.amount} has been charged to your card. Please <Text style={{fontWeight:'bold', color:'green'}} onPress={() => Linking.openURL(successpaymentReceipt.receipt_url)}>click here</Text> to view and download your receipt. Do not hesitate to contact us if you have any questions. </Text>
                              </View>

                           </View>
                  </View>
             </Modal>
  {/* Success Modal */}


              <ScrollView style={CommonStyle.paddingHorizontal20}>
              <Text style={[Style.subHeading, themeTextStyle]}>Your donation will be used for improving the plaform and covering our hosting costs. Please contact us if you have any questions.  </Text>

                   {/* Full name */}
                   <View style={{flexDirection:'row'}}>
                     <View  style={Style.inputBox}>                      
                         <TextInput
                            style={[Style.inputFieldTxt, {marginRight:10}]}
                            name="firstName"
                            onChangeText={(e) => addDonateValue('firstName', e) }
                       placeholder="First Name" />
                     </View>

                     <View style={Style.inputBox} >                     
                        <TextInput
                       style={[Style.inputFieldTxt, {marginLeft:10}]}
                       name="lastName"
                       onChangeText={(e) => addDonateValue('lastName', e) }
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
                            onChangeText={(e) => addDonateValue('Email', e) }
                       placeholder="Email Address" />
                     </View>

                 </View>
                {/* Email Address */}

                    {/* Card Number */}
                    <View style={{flexDirection:'row'}}>
                     <View  style={Style.inputBox}>                        
                         <TextInput
                            style={Style.inputFieldTxt}
                            keyboardType="numeric"
                            maxLength={16}
                            onChangeText={(e) => addCardValue('number', e) }
                       placeholder="Card Number" />
                     </View>

                 </View>
                {/* Card Number */}

                  {/* CVV name */}
                  <View style={{flexDirection:'row'}}>
                     <View  style={Style.inputBox}>                       
                         <TextInput
                            style={[Style.inputFieldTxt, {marginRight:10}]}
                            keyboardType="numeric"
                            maxLength={3}
                            onChangeText={(e) => addCardValue('cvc', e) }
                       placeholder="CVV" />
                     </View>

                     <View style={Style.inputBox} >                    
                        <TextInput
                       style={[Style.inputFieldTxt, {marginLeft:10,marginRight:10}]}
                       keyboardType="numeric"
                       maxLength={2}
                       onChangeText={(e) => addCardValue('exp_month', e)}
                       placeholder="MM" />
                     </View>

                     <View style={Style.inputBox} >                    
                        <TextInput
                       style={[Style.inputFieldTxt, {marginLeft:10}]}
                       keyboardType="numeric"
                       maxLength={4}
                       onChangeText={(e) => addCardValue('exp_year', e)}
                       placeholder="YY" />
                     </View>
                 </View>
                {/* CVV name */}


             {/* Card Number */}
            <View style={{flexDirection:'row'}}>
                     <View  style={Style.inputBox}>                        
                         <TextInput
                            style={Style.inputFieldTxt}
                            name="amount"
                            keyboardType="numeric"
                            onChangeText={(e) => addDonateValue('amount', e) }
                            placeholder="$Amount"
                        />
                     </View>

                 </View>
                {/* Card Number */}

                {/* Donate Now */}
                <View >
                 <TouchableOpacity onPress={donateNow} style={Style.donateBtn}>
                    <Text style={Style.donateBtnTxt}> Donate </Text>
                 </TouchableOpacity>
                </View>
                    {/* Donate Now */}

              </ScrollView>
         


</View>
        </>
    )
}

export default Donate