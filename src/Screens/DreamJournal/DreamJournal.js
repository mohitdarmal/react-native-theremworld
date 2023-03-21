import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, FlatList, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme, Modal} from "react-native";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import NavigationStrings from "../../Constant/NavigationStrings";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Style from "../DreamJournal/Style";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";


const DreamJournal = ({navigation}) => {
  
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;


  const isUserID = useSelector((state) => state.isSignIn.token);

  const [dreamAnalyze, setDreamAnalyze] = useState();
  // 
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [dreamJournal, setDreamJournal] = useState([]);
  const [analysisDetail, setAnalysisDetail] = useState([]);
  const [symbolDetail, setSymbolDetail] = useState([]);
  const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
  const [deleteDream, setDeleteream] = useState();
  // 
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false)

  const focus = useIsFocused();
  useEffect(() => {
    getDreamJournal();
 
  }, [focus])

  const getDreamJournal = () => {
    axios.get(`${NavigationStrings.BASE_URL}getDreamJournal.php`, {
      params : {idUser:isUserID}
    }).then((val) => {
      if(val.data.status == true){ 
      setDreamJournal(val.data.data);
      setFilteredDataSource(val.data.data);
      setDreamAnalyze(val.data.data);
      setIsLoading(false);
      }
      else{
        alert(val.data.message);
              setIsLoading(false);
      }
    })
  }

 

const consentBeforeDelete = (userInfo) => {
  setSuccesModalVisible(true);
  setDeleteream(userInfo);   
}
 
const dreamDelete = (deleteItem) => {
  setIsLoading(true)
  deleteItem.flag = 'D'
  axios.post(`${NavigationStrings.BASE_URL}saveUserDream.php`,
  JSON.stringify(
    deleteItem)).then((val) => {
      getDreamJournal()
    console.log(val, "Delete item")
  })
  setSuccesModalVisible(false)
}


const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = dreamJournal.filter(function (item) {
      const itemData = item.dreamText
        ? item.dreamText.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
    console.log(text, "filteredDataSource")
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(dreamJournal);
    setSearch(text);
  }
};

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
                               Are you sure? 
                             </Text>
                             <Text style={[Style.visiblePopupText, {marginBottom:30}]}>
                              you want to delete this dream? This action cannot be undone.
                             </Text>

                                  {/* Save Symol */}
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => setSuccesModalVisible(false)}>
                                      <Text style={[Style.cancelBtn, Style.popupCancelBtn]}> Cancel</Text>                                     
                                    </TouchableOpacity>
                                        <TouchableOpacity onPress={() => dreamDelete(deleteDream)} >
                                          <Text style={[Style.save, Style.popupSaveBtn]}> Delete this dream</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Save Symol  */}
                              </View>
                        </Modal>
              {/* Visible toggle Modal */}





            {/*Add Dream btn Start */}
            
                  <View style={Style.addDreamBtn}>
                   <Text style={Style.addDreanBtnTxt} onPress={() => navigation.navigate(NavigationStrings.ADD_YOUR_DREAM)}>  
                     <AntDesign style={[themeTextStyle]}  name="plus" size={24}  /> 
                   </Text>
                  </View>
              
          {/* Add Dream btn End */}

         
             <HeaderComp toggleBtn title="Dream Journal"/>

     

            {/* Search Bar Start */}
              <View style={Style.inputBox}>
                <AntDesign style={Style.inputBoxIcon} name="filter" size={18}  />
                <TextInput
                    style={Style.inputField}
                    value={search}
                    onChangeText={(text) => searchFilterFunction(text)}
                    placeholder="Filter"
                    placeholderTextColor="#1E3441" />
                </View>
            {/* Search Bar End */}
             
              <FlatList

              // array
              data={filteredDataSource}
              //
              keyExtractor={(data) => data.idDream }
              // array data
              renderItem={(data) => {
                return(
                  <View style={[CommonStyle.paddingHorizontal20]}>
                    <View style={Style.titleBox}>
                        <TouchableOpacity  style={{flex:1, paddingRight:15}} onPress={() =>  navigation.navigate(NavigationStrings.DREAM_JOURNAL_DETAIL,
                          {
                            dreadId : data.item.idDream,
                            dreamTitle: data.item.dreamTitle,
                            dreamText: data.item.dreamText,
                            dreamSituation: data.item.dreamSituation,
                            dreamDate: data.item.dreamDate,
                            flag:data.item.flag,
                            idUser:data.item.idUser,
                            dreamDate:data.item.dreamDate,
                            isPublic:data.item.isPublic,
                          })}>
                          <Text ellipsizeMode='tail' numberOfLines={1} style={[Style.title, themeTextStyle]}> {data.item.dreamTitle} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() =>  consentBeforeDelete(data.item) }
                        >
                          <Text> <AntDesign style={[Style.closeBtn, themeContainerStyle, themeTextStyle]}  name="closecircle" size={20}  /> </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Style.analysseBox}>
                        <TouchableOpacity>
                          <Text style={[Style.lightColor, themeTextStyle, {paddingRight:20}]}> {data.item.dreamDate} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.ANALYSIS, {
                           dreadId : data.item.idDream,
                           idUser:data.item.idUser,
                        })}>
                          <Text style={[Style.whiteColor, {paddingRight:20}]}>
                          {/* {getDreamCount(data.item.idUser, data.item.idDream)} */}
                          {data.item.numAnalysis}
                          <Text style={[Style.lightColor, themeTextStyle]}> Analysis </Text> </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.SYMBOL, {
                           dreadId : data.item.idDream,
                           idUser:data.item.idUser,
                        })}>
                          <Text style={[Style.whiteColor, themeTextStyle]}> {data.item.numSymbols} <Text style={[Style.lightColor, themeTextStyle]}> Symbols </Text> </Text>
                        </TouchableOpacity>

                  {/*       <TouchableOpacity style={Style.showSymbolandAnalysis}   
                           
                        >
                          <Text>
                            <Feather style={[Style.whiteColor, themeContainerStyle, themeTextStyle]}  name="chevron-down" size={20}  />
                          </Text>
                        </TouchableOpacity> */}
                    </View>

                     <View>
                       
                     </View>

                  </View>
                )
              }}
              />


      
        </View>
        </>
    )
}

export default DreamJournal