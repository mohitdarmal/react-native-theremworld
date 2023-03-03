import React, {useState, useEffect} from "react";
import {Text, Modal, View, ImageBackground, ScrollView, TextInput, Switch, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import axios from "axios";
import NavigationStrings from "../../Constant/NavigationStrings";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import Style from "./Style";
import CommonStyle from "../ScreenCommonCss";
import { useSelector } from "react-redux";




const AddYourDream = ({navigation}) => {
  // const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

  const userID = useSelector((state) => state.isSignIn.token);
  const [isLoading, setIsLoading] = useState(false);
  const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
  const [aiModalSuccesVisible, setAiModalSuccesVisible] = useState(false);
  const [aiAnalyze, setAiAnalyze] = useState();
  
  console.log(userID, "iuserID")

  const [switchValue, setSwitchValue] = useState(false);

  const [addDreamData, setAddDreamData] = useState({
    idUser:userID ,
    idDream: 0,
    dreamTitle: '',
    dreamText: '',
    dreamSituation: '',
    isPublic: switchValue,
    dreamDate:'',
    flag: 'I',
  });

  const addDream = (val) => {
    setAddDreamData(() => ({...addDreamData, ...val}))
  }

  const toggleSwitch = (value) => {
    setSwitchValue(value);
    if(value){
    addDreamData.isPublic = "1"
  }
  else{
    addDreamData.isPublic = "0"
  }
  };


  /* const saveDream = () => {
 axios({
  method:'post',
  url:'http://theremworld/src/api/saveUserDream.php',
  data:{
    addDreamData
  }
 }).then((res) => {
  console.log(res, "adddream")
 })
} */

const saveDream = () => {
  setIsLoading(true)
  axios.post(`${NavigationStrings.BASE_URL}saveUserDream.php`,
  JSON.stringify(addDreamData)
).then((res) => {
  setAiAnalyze(res.data.message);
  setIsLoading(false)
  // alert(res.data.message, "welcome");
  setAiModalSuccesVisible(true);
})
 
}

const showPoupupVisible = () => {
  setSuccesModalVisible(true);
}

const saveAndVisibleDream = () => {
  setIsLoading(true)
  addDreamData.isPublic = "1";
  axios.post(`${NavigationStrings.BASE_URL}saveUserDream.php`,
  JSON.stringify(addDreamData)
).then((res) => {
  setAiAnalyze(res.data.message);
  if (res.data.message.length > 0) {
    console.log(res.data.message);
}
  setIsLoading(false)
  setAiModalSuccesVisible(true);
  // navigation.navigate(NavigationStrings.QOTBOX)
})
}

const saveWithoutVisible = () => {
  setIsLoading(true)
  addDreamData.isPublic = "0";
  axios.post(`${NavigationStrings.BASE_URL}saveUserDream.php`,
  JSON.stringify(addDreamData)
).then((res) => {
  setAiAnalyze(res.data.message);
  // alert(res.data.message);
 /*  if (res.data.message.length > 0) {
    console.log(res.data.message);
}
else{
  console.log(res.data.data)
} */
  setIsLoading(false);
  setAiModalSuccesVisible(true);
  // navigation.navigate(NavigationStrings.QOTBOX)
})
}

const ok = () => {
  navigation.navigate(NavigationStrings.QOTBOX)
}

console.log(aiAnalyze, "aiAnala")
 
  const goToScreen = () => {
    navigation.navigate(NavigationStrings.WELCOME, {title:'Welcome Screen'});
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


        {/* Visible toggle Modal */}
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
                
                                  <Text style={Style.visiblePopupText}>
                                    We recommend that you make the dream visble to all so that other user can help analyze it.
                                  </Text>

                                        {/* Save Symol */}
                                        <View>
                                          <TouchableOpacity onPress={saveWithoutVisible}>
                                            <Text style={[Style.cancelBtn, Style.popupCancelBtn]}> No, Keep it private </Text>                                     
                                          </TouchableOpacity>
                                              <TouchableOpacity onPress={saveAndVisibleDream} >
                                                <Text style={[Style.save, Style.popupSaveBtn]}> Yes, make it visible to all </Text>
                                              </TouchableOpacity>
                                          </View>
                                          {/* Save Symol  */}
                              </View>
                  </Modal>
              {/* Visible toggle Modal */}


              {/* Visible toggle Modal */}
            <Modal
                      animationType="slide"
                      transparent={true}
                      visible={aiModalSuccesVisible}
                      onRequestClose={() => {
                        setSuccesModalVisible(!modalSuccesVisible);
                      }}
                  >
                      <View style={[themeContainerStyle,{flex: 1, alignItems: "center", justifyContent:'center', paddingTop:45, backgroundColor:'#031750f5',}]}>
 
                
                                  <Text style={Style.visiblePopupText}>
                                     {aiAnalyze}                                  
                                  </Text>
                                  <TouchableOpacity onPress={ok}>
                                      <Text style={{color:'#000', fontSize:20, backgroundColor:'#fff', borderRadius:50, width:40, height:40, textAlign:'center', lineHeight:40}}>Ok</Text>
                                  </TouchableOpacity>
                                       
                              </View>
                  </Modal>
              {/* Visible toggle Modal */}

 
          <HeaderComp title="Add your Dream"/>

         

            <ScrollView style={CommonStyle.paddingHorizontal20}>
              <Text style={[Style.subHeading, themeTextStyle]}>Let's start your dream journal. Add your first dream now... </Text>

               {/* Visibel to all toggle btn */}
               <View style={Style.switchContainer} >
                <Switch
                  trackColor={{false : '#808080', true : '#466362' }}
                  thumbColor={switchValue ? '#fff' : '#5E5E5E'}
                  onValueChange={toggleSwitch}
                  value={switchValue}
                />
                 <Text style={switchValue ? Style.switchBtnActive : Style.switchBtnInActive}>  We recommand making the dream visible to all </Text>
                </View>
                {/* Visibel to all toggle btn */}

                {/*  */}
                  <View style={Style.switchContainer}>
                    <Text style={{color:'#ffffff', marginBottom:20,}}>When you make your dream visible to all, ONLY the text of your dream and related situation will be visible to other users. Your name and other personal information will never be visible. We encourage you to make it visible to all to enable others to help you analyse the dream</Text>
                  </View>
                {/*  */}

              {/* Dream tile */}
                    <TextInput
                       style={[Style.inputFieldTxt]}
                       onChangeText={(val) => addDream({dreamTitle: val}) }
                       placeholder="Title of the Dream"
                       placeholderTextColor="#01203F66"  />
                {/* Dream tile */}


            {/* About your dream */}
              <View style={Style.textArea}>
                    <TextInput
                       style={Style.txtAreaTxt}
                       multiline={true}
                       numberOfLines={4}
                       onChangeText={(val) => addDream({dreamText: val}) }
                       placeholder="Describe the Dream"
                       placeholderTextColor="#01203F66" />
                </View>
                <Text style={[Style.descTxt, themeTextStyle]}>Please make dream details as descriptive as possible (20 or more words) </Text>
                {/* About your dream */}

                 {/* Dream situation */}            
              <View style={Style.textArea}>
                    <TextInput
                       style={Style.txtAreaTxt}
                       multiline={true}
                       numberOfLines={4}
                       onChangeText={(val) => addDream({dreamSituation: val}) }
                       placeholder="Enter your dream situation"
                       placeholderTextColor="#01203F66" />
                </View>
                {/* Dream situation */}             


                  {/* Save */}
                  <View style={Style.saveBtnContainer}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{flex:1,}}>
                   <Text style={Style.cancelBtn}> Cancel </Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={switchValue ? saveDream : showPoupupVisible} style={{flex:1,}}>
                   <Text style={Style.save}> Save </Text>
                 </TouchableOpacity>
                 </View>
                {/* Save */}
            </ScrollView>
          
        </View>
      
    )
}


export default AddYourDream