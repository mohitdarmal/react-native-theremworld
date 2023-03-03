import React, {useEffect, useState} from "react";
import {Text, View, ImageBackground, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, useColorScheme, TextInput} from "react-native";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import NavigationStrings from "../../Constant/NavigationStrings";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style";


const DreamForAnalysis = ({navigation}) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

  const isUserID = useSelector((state) => state.isSignIn.token);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [dreamForAnalysis, setDreamForAnalysis] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dreamAnalyse()
  }, [])


  const dreamAnalyse = () => {
    axios.get(`${NavigationStrings.BASE_URL}getDreamsForAnalysis.php`,
    {
      params: {idUser: isUserID}
    }).then((res) => {
      if(res.data.status == true){
      setFilteredDataSource(res.data.data);
      setDreamForAnalysis(res.data.data);
      setIsLoading(false)
      console.log(res)
      }
      else{
        alert(res.data.message);
      }
    })
  }


  
const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = dreamForAnalysis.filter(function (item) {
      const itemData = item.dreamTitle
        ? item.dreamTitle.toUpperCase()
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
    setFilteredDataSource(dreamForAnalysis);
    setSearch(text);
  }
};


    return (
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

        
           <HeaderComp backBtn title="Analyze Dream"/>

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


           <View  style={[CommonStyle.paddingHorizontal20, {flexGrow:0, marginBottom:10}]}>
            </View>
           { <FlatList

            // array
            data={filteredDataSource}
            //
            keyExtractor={(data) => data.idDream }
            // array data
            renderItem={(data) => {
              return(

                <View style={[CommonStyle.paddingHorizontal20]}>
                  <View style={Style.titleBox}>
                      <TouchableOpacity style={{flex:1, paddingRight:15}} onPress={() =>  navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS_DETAIL,
                        {
                          dreadId : data.item.idDream,
                          dreamTitle: data.item.dreamTitle,
                          dreamText: data.item.dreamText,
                          dreamSituation: data.item.dreamSituation,
                          dreamDate: data.item.dreamDate,
                          flag:data.item.flag,
                          idUser:data.item.idUser,
                          isPublic:data.item.isPublic,
                        })}>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={[Style.title, themeTextStyle]}>{data.item.dreamTitle} </Text>
                      </TouchableOpacity>
                 {/*      <TouchableOpacity>
                        <Text> <AntDesign style={Style.closeBtn} color="#4FC27D" name="closecircle" size={20}  /> </Text>
                      </TouchableOpacity> */}
                  </View>

                  <View style={Style.analysseBox}>
                      <TouchableOpacity>
                        <Text style={[Style.lightColor, themeTextStyle, {paddingRight:15}]}> {data.item.dreamDate} </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={[Style.lightColor, themeTextStyle, {paddingRight:15}]}>
                        No. of Analysis
                        <Text style={Style.whiteColor}> ({data.item.numAnalysis}) </Text> </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={[Style.lightColor, themeTextStyle,]}>
                        No. of Symbols
                        <Text style={Style.whiteColor}> ({data.item.numSymbols}) </Text> </Text>
                      </TouchableOpacity>
                  </View>
                </View>
              )
            }}
            />}


      
      </View>
    )
}

export default DreamForAnalysis;

