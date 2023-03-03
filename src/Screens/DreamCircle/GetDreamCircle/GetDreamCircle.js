import React, {useEffect, useState} from "react";
import {Text, View, Modal, ImageBackground, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, useColorScheme, TextInput} from "react-native";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import CommonStyle from "../../ScreenCommonCss";
import NavigationStrings from "../../../Constant/NavigationStrings";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Style from "./Style";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";


const GetDreamCircle = ({navigation}) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

  const isUserID = useSelector((state) => state.isSignIn.token);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [getCircleDream, setGetCircleDream] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
  const [deleteCircle, setDeleteCircle] = useState();

  const focus = useIsFocused();
  useEffect(() => {
    getDreamCircle();
  }, [focus])

  const getDreamCircle = () => {
    axios.get(`${NavigationStrings.BASE_URL}getDreamsCircle.php`, {
      params : {idUser:isUserID}
    }).then((val) => {
      setFilteredDataSource(val.data.data)
      setGetCircleDream(val.data.data)
      setIsLoading(false)
    })
  }

  const consentBeforeDelete = (userInfo) => {
    setSuccesModalVisible(true);
    setDeleteCircle(userInfo);   
  }

  const deleteItem = (memberInfo) => {
    setIsLoading(true)
    memberInfo.flag = 'D'
    axios.post(`${NavigationStrings.BASE_URL}updateDreamsCircle.php`,
    JSON.stringify(memberInfo)).then((val) => {
        getDreamCircle()
        setSuccesModalVisible(false);
      console.log(val, "Delete item");
    })
  }




  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = getCircleDream.filter(function (item) {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
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
      setFilteredDataSource(getCircleDream);
      setSearch(text);
    }
  };



    return (
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
                               Are you sure? 
                             </Text>
                             <Text style={[Style.visiblePopupText, {marginBottom:30}]}>
                             You want to delete this dream.
                             </Text>

                                  {/* Save Symol */}
                                  <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => setSuccesModalVisible(false)}>
                                      <Text style={[Style.cancelBtn, Style.popupCancelBtn]}> Don't Delete </Text>                                     
                                    </TouchableOpacity>
                                        {/* <TouchableOpacity onPress={() =>  deleteItem(data.item) }> */}
                                        <TouchableOpacity onPress={() =>  deleteItem(deleteCircle) }>
                                          <Text style={[Style.save, Style.popupSaveBtn]}> Yes Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Save Symol  */}
                              </View>
                        </Modal>
              {/* Visible toggle Modal */}
         

            {/*Add Dream btn Start */}
            <View style={Style.addDreamBtn} >
                   <Text style={Style.addDreanBtnTxt} onPress={() => navigation.navigate(NavigationStrings.ADD_DREAM_CIRCLE)}>  
                     <AntDesign style={[themeTextStyle]}  name="plus" size={24}  /> 
                   </Text>
            </View>              
          {/* Add Dream btn End */}

         
             <HeaderComp backBtn title="Dream Circle"/>

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
              data={filteredDataSource}
              keyExtractor={(data) => data.idMember}
              // onEndReachedThreshold={0.5}
              renderItem={(data) => {
                return(
                  <View style={[CommonStyle.paddingHorizontal20]}>
                  <View style={[Style.titleBox, themeTextStyle]}>
                      <TouchableOpacity  style={{flex:1, paddingRight:15}}  >
                        <Text ellipsizeMode='tail' numberOfLines={1} style={[Style.title, themeTextStyle]}> {data.item.firstName} {data.item.lastName} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() =>  consentBeforeDelete(data.item) } >
                        <Text> <AntDesign style={[Style.closeBtn, themeTextStyle]}   name="closecircle" size={20}  /> </Text>
                      </TouchableOpacity>
                  </View>

                  <View style={Style.analysseBox}>
                      <TouchableOpacity>
                        <Text style={[Style.lightColor, themeTextStyle, {paddingRight:20}]}> {data.item.memberEmail} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.UPDATE_DREAM_JOURNAL, {
                        firstName: data.item.firstName,
                        lastName: data.item.lastName,
                        memberEmail: data.item.memberEmail,
                        userID: data.item.userID,
                        flag: data.item.flag,
                        idMember: data.item.idMember,
                        idUser: data.item.idUser,
                        autoInvite:data.item.autoInvite
                      })}>
                        <Text> <Feather style={[Style.editBtn, themeTextStyle]}  name="edit" size={20}  /> </Text>
                      </TouchableOpacity>
                  </View>
                </View>
                )
              }}
            />


        
        </View>
    )
}

export default GetDreamCircle