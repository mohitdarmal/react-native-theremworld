import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, ImageBackground, TextInput, Switch, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import CommonStyle from "../../ScreenCommonCss";
import Style from "./Style";
import NavigationStrings from "../../../Constant/NavigationStrings";
import { useDispatch, useSelector } from "react-redux";


const UpdateDreamJournal = (props) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const getdream = props.route.params;
    const isUserID = useSelector((state) => state.isSignIn.token);
    const [switchValue, setSwitchValue] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [updateCircleDream, setUpdateCircleDream] = useState({
        idUser:isUserID ,
        idMember: getdream.idMember,
        userID: getdream.userID,
        firstName: getdream.firstName,
        lastName: getdream.lastName,
        memberEmail: getdream.memberEmail,
        autoInvite:getdream.autoInvite,
        flag: getdream.flag,
      });

    useEffect(() => {
      if(updateCircleDream.autoInvite == "1"){
        setSwitchValue(true)
      }
      else{
        setSwitchValue(false)
      }
    })

   
 
      const toggleSwitch = (value) => {
        console.log(value, "toggle value")
        setSwitchValue(value);
        if(value){
          updateCircleDream.autoInvite = "1"
      }
      else{
          updateCircleDream.autoInvite = "" 
      }
      };

      const addDream = (val) => {
        setUpdateCircleDream(() => ({...updateCircleDream, ...val}))
      }

      const updateDream = () => {
        setIsLoading(true)
        axios.post(`${NavigationStrings.BASE_URL}updateDreamsCircle.php`,
        JSON.stringify(updateCircleDream)
      ).then((res) => {
        if (res.data.status == true) {
          props.navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE);
        }
        else{
          alert("An error occured. Try again");
        }
        setIsLoading(false)
      })
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
           
               <HeaderComp />
               <View >

               <ScrollView >
                    <View style={Style.detailBox}>

                        {/*  First Name */}
                        <Text style={[Style.label, themeTextStyle]}>First Name</Text>
                        <View style={Style.inputBox}>
                            <TextInput
                            style={Style.inputFieldTxt}
                            onChangeText={(val) => addDream({firstName: val}) }
                            value={updateCircleDream.firstName}
                            placeholder="Enter First Name"
                        />
                        </View>
                        {/*  First Name */}


                        {/* Last Name */}
                        <Text style={[Style.label, themeTextStyle]}>Last Name</Text>
                         <View>
                            <TextInput
                                style={Style.inputFieldTxt}
                                onChangeText={(val) => addDream({lastName: val}) }
                                value={updateCircleDream.lastName}
                                placeholder="Enter Last Name"
                                    />
                        </View>
                            {/* Last Name */}

                            {/* Member Email*/}
                                <Text style={[Style.label, themeTextStyle]}>Member Email </Text>
                                <View>
                                <TextInput
                                  style={Style.inputFieldTxt}
                                  onChangeText={(val) => addDream({memberEmail: val}) }
                                  value={updateCircleDream.memberEmail}
                                  placeholder="Enter Last Name"
                               
                                    />                               
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
                                    <Text style={switchValue ? Style.switchBtnActive : Style.switchBtnInActive}> Auto Invite </Text>
                                    </View>
                                {/* Toggle */}

                                {/* Save */}
                                    <View style={Style.saveBtnContainer}>
                                    <TouchableOpacity onPress={() =>  props.navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE)} style={{flex:1,}}>
                                      <Text style={Style.cancelBtn}> Cancel </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ updateDream} style={{flex:1,}}>
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

export default UpdateDreamJournal