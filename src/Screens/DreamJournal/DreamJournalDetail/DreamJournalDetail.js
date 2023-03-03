import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, ScrollView, ImageBackground, TextInput, Switch, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import HeaderComp from "../../../Components/HeaderComp";
import SearchBar from "../../../Components/SearchBar";
import ImagePath from "../../../Constant/ImagePath";
import CommonStyle from "../../ScreenCommonCss";
import Style from "./Style";
import NavigationStrings from "../../../Constant/NavigationStrings";
import { useDispatch, useSelector } from "react-redux";


const DreamJournalDetail = (props) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;


    const DreamJournalDetail = props.route.params;
    const isUserID = useSelector((state) => state.isSignIn.token);
    const [switchValue, setSwitchValue] = useState();
    const [isLoading, setIsLoading] = useState(false);
/* 
  useEffect(() =>{
    if(DreamJournalDetail.isPublic == "1"){
      setSwitchValue(true)
    }
    else{
      setSwitchValue(false)
    }
  }) */

    const [addDreamData, setAddDreamData] = useState({
        idUser:isUserID ,
        idDream: DreamJournalDetail.dreadId,
        dreamTitle:  DreamJournalDetail.dreamTitle,
        dreamText: DreamJournalDetail.dreamText,
        dreamSituation: DreamJournalDetail.dreamSituation,
        isPublic: DreamJournalDetail.isPublic,
        flag: 'U',
      });

      console.log( DreamJournalDetail.isPublic, "show")

    useEffect(() => {
      if(addDreamData.isPublic == "1"){
        setSwitchValue(true)
      }
      else{
        setSwitchValue(false)
      }
    },[])

      const addDream = (val) => {
        setAddDreamData(() => ({...addDreamData, ...val}))
      }

      const toggleSwitch = (value) => {
        console.log(value, "toggle value")
        setSwitchValue(value);
        if(value){
          addDreamData.isPublic = "1"
        }else{
          addDreamData.isPublic = "0"
        }
        
      };

      const updateDream = () => {
        setIsLoading(true)
        axios.post(`${NavigationStrings.BASE_URL}saveUserDream.php`,
        JSON.stringify(addDreamData)
      ).then((res) => {
        props.navigation.navigate(NavigationStrings.DREAM_JOURNAL);
        setIsLoading(false)
        console.log(res, "Updated Data")
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

           
               <HeaderComp backBtn />
               <View >
                {/* SearchBar */}
                <View style={Style.paddingHr20}>          
                </View>

                        <ScrollView >
                            <View style={Style.detailBox}>
                              {/*   <Text style={Style.title}>{DreamJournalDetail.dreamTitle} </Text>
                                <Text style={Style.dreamTxt}>Dream Text </Text>
                                <Text style={Style.description}>{DreamJournalDetail.dreamText}
                                 </Text>
                                 <Text style={Style.dreamTxt}>Dream Situation </Text>
                                <Text style={Style.dreamSituation}>{DreamJournalDetail.dreamSituation} </Text> */}


                                 {/* Dream tile */}
                                <Text style={[Style.label, themeTextStyle]}> Dream Title </Text>
                                   <View style={Style.inputBox}>
                                    <TextInput
                                    style={Style.inputFieldTxt}
                                    onChangeText={(val) => addDream({dreamTitle: val}) }
                                    value={addDreamData.dreamTitle}                                                           
                                />
                                   </View>
                                {/* Dream tile */}


                                  {/* About your dream */}
                                        <Text style={[Style.label, themeTextStyle]}> About your dream </Text>
                                        <View >
                                            <TextInput
                                            style={Style.textArea}
                                            multiline={true}
                                            numberOfLines={4}
                                            onChangeText={(val) => addDream({dreamText: val}) }
                                            value={addDreamData.dreamText}                                
                                            />
                                        </View>
                                    {/* About your dream */}

                                     {/* Dream situation */}
                                        <Text style={[Style.label, themeTextStyle]}> Dream Situation </Text>
                                        <View>
                                            <TextInput
                                            style={Style.textArea}
                                            multiline={true}
                                            numberOfLines={4}
                                            onChangeText={(val) => addDream({dreamSituation: val}) }
                                            value={addDreamData.dreamSituation}                                        
                                            />
                                        </View>
                                        {/* Dream situation */}

                                        {/* Toggle */}
                                            <View style={Style.switchContainer} >
                                            <Switch
                                                trackColor={{false : '#808080', true : '#466362' }}
                                                thumbColor={switchValue ? '#fff' : '#5E5E5E'}
                                                onValueChange={toggleSwitch}
                                                value={switchValue}
                                            />
                                            <Text style={switchValue ? [Style.switchBtnActive, themeTextStyle] : Style.switchBtnInActive}> Visible to all </Text>
                                            </View>
                                        {/* Toggle */}

                                        {/* Save */}
                                            <View style={Style.saveBtnContainer}>
                                            <TouchableOpacity onPress={() =>  props.navigation.navigate(NavigationStrings.DREAM_JOURNAL)} style={{flex:1,}}>
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

export default DreamJournalDetail