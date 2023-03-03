import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, ImageBackground, TextInput, Switch, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import CommonStyle from "../../ScreenCommonCss";
import Style from "./Style";
import NavigationStrings from "../../../Constant/NavigationStrings";
import { useDispatch, useSelector } from "react-redux";


const AddDreamCircleCircle = ({navigation}) => {

    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const isUserID = useSelector((state) => state.isSignIn.token);
    const [switchValue, setSwitchValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {

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

      const addDreamCircle = () => {
        setIsLoading(true)
        axios.post(`${NavigationStrings.BASE_URL}updateDreamsCircle.php`,
        JSON.stringify(addCircle)
      ).then((res) => {
        setIsLoading(false)
        navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE);
        console.log(res, "Updated Data")
      })
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
                                    onChangeText={(val) => dreamCircleValue({memberEmail: val}) }
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