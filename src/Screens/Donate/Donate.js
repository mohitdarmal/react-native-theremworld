import React, {useState} from "react";
import {  View, Linking, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import { useSelector } from "react-redux";
import HeaderComp from "../../Components/HeaderComp";
import CommonStyle from "../ScreenCommonCss";
import Style from "./Style";


const Donate = ({navigation}) => {

   const colorScheme = useColorScheme();
   const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
   const themeContainerStyle =
   colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

 // Getting user ID
   const isUserID = useSelector((state) => state.isSignIn.token);
   const [isLoading, setIsLoading] = useState(false);

 
  

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
 

 


              <ScrollView style={CommonStyle.paddingHorizontal20}>
              <Text style={[Style.subHeading, themeTextStyle]}>We partner with Stripe to manage subscriptions. You will be redirected to their page</Text>                  

                {/* Donate Now */}
                <View >
                 <TouchableOpacity onPress={() => Linking.openURL('https://billing.stripe.com/p/login/test_7sI15t7Uv5QyfzW6op')}  style={Style.donateBtn}>
                    <Text style={Style.donateBtnTxt}> Subscribe </Text>
                 </TouchableOpacity>
                </View>
                    {/* Donate Now */}

              </ScrollView>
         


</View>
        </>
    )
}

export default Donate