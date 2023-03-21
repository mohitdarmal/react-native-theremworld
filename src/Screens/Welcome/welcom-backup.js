import React, {useEffect, useState, useRef} from "react";
import {Text, View, FlatList, ScrollView, Image, TextInput, Switch, TouchableOpacity, useColorScheme, Dimensions} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import NavigationStrings from "../../Constant/NavigationStrings";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import Style from "./Style";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';
 


const Welcome = ({navigation}) => {
  const isUserID = useSelector((state) => state.isSignIn.token);
 
  const [searchValue, setSearcValue] = useState();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [symbol, setSymbol] = useState();
  const {height, width} = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();

    const [profileData, setProfileData] = useState();

    useEffect(() => {
      reAuth()
      getSymbol()
    }, [])

    const reAuth = () => {
      axios.get(`${NavigationStrings.BASE_URL}getUserProfile.php`, {
        params : {uID:isUserID}
      }).then((val) => {
        val.data.data.map((data) => {
          if(data.idUser === isUserID){
            return true
          }
          else{
            AsyncStorage.removeItem('userId');
            Updates.reloadAsync()
          }
         })
           
         
      })
    }


    
  const getSymbol = () => {
    axios.get(`${NavigationStrings.BASE_URL}getSymbols.php`, {
      params : {userRole:"user"}
    }).then((res) => {
      if(res.data.status == true){
        setSymbol(res.data.data);
      }
      else{
        alert(res.data.message);
      }
    })
  }



    const searchFilterFunction = () => {
      // Check if searched text is not blank
      console.log(filteredDataSource, "Asdfsf")
      if (searchValue) {

         if(searchValue == null) {
          alert("Not Found")
         }
         else{
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = symbol.filter(function (item) {
          const itemData = item.symbolName
            ? item.symbolName.toUpperCase()
            : ''.toUpperCase();
          const textData = searchValue.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });

        if(newData == ""){
          alert("The following symbols could not be found. Fear not! Our team continues to research and add new symbols on a regular basis")
        }
        console.log(newData, "newdata")
        setFilteredDataSource([...filteredDataSource, ...newData]);
        setSearch(searchValue);
      }
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        alert("Please enter symbol")
        setSearch("");
      }
    };

 

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;


  // const navigation = useNavigation();
  const [active, setActive] = useState(true)
  const [inActive, setInActive] = useState(false)

  const goToScreen = () => {
    navigation.navigate(NavigationStrings.WELCOME, {title:'Welcome Screen'});
  }
    return(
        <View style={[themeContainerStyle, {flex:1}]}>
            <HeaderComp title="theREMworld"/>

            {/* Search Bar Start */}
              <View style={Style.inputBox}>                
                <TextInput
                    style={Style.inputField}
                    value={searchValue}
                    extraData ={filteredDataSource}
                    onChangeText={(val) => setSearcValue(val)}
                    placeholder="Symbol Search"
                    placeholderTextColor="#1E3441" />
                    <FontAwesome onPress={searchFilterFunction} style={Style.inputBoxIcon} name="search" size={18}  />
                </View>
            {/* Search Bar End */}
          

            {/* Search Symbol Data */}
            {/*   {filteredDataSource.map((data) => {
                 return(
                  <View style={{backgroundColor:'#dee2e7', padding:20, borderBottomWidth:1, borderColor:'#dbdbdb'}} key={data.idSymbol}>
                    <Text style={{fontSize:18, }}>{data.symbolName}</Text>
                    <Text style={{fontSize:16, color:'#777'}}>{data.symbolDesc}</Text>
                  </View>
                 )
              })} */}

           <View>
                <FlatList 
                  data={filteredDataSource}
                  keyExtractor={(data) => data.idSymbol}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  inverted
                  ref={ref}
                  renderItem = {(data) => {
                    return(
                      <>
                        <View style={[{backgroundColor:'#dee2e7', padding:20, width:width, borderBottomWidth:1, borderColor:'#dbdbdb'}]} key={data.item.idSymbol}>
                        <Text onPress={() => {
                          setFilteredDataSource("");
                          setCurrentIndex(0)
                        }} style={{position:'absolute', right:0, top:10, }}><AntDesign color="#BC4E2A" name="closecircle" size={28} /> </Text>
                          <Text style={{fontSize:20, color:'#000', marginBottom:10, fontWeight:'bold'}}>{data.item.symbolName}</Text>
                          <Text style={{fontSize:16, lineHeight:24, color:'#444', paddingBottom:15}}>{data.item.symbolDesc}</Text>
                        </View>                   
                      </>
                  )
                  }}
                />


              {filteredDataSource == "" ? null : 
                  <>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        { currentIndex == 0 ? null : 
                              <>
                                  <TouchableOpacity  onPress={() => {
                                    setCurrentIndex(currentIndex - 1)
                                    ref.current.scrollToIndex({index: currentIndex - 1})
                                  }
                                  }>
                                    <Text style={[themeTextStyle, {color:'#fff', margin:10}]}> <Feather name="arrow-left-circle" size={28}  /></Text>
                                  </TouchableOpacity>
                              </>
                              
                        }

                        {  filteredDataSource.length-1 == currentIndex ? null :
                              <>
                                <TouchableOpacity  onPress={() => {
                                  setCurrentIndex(currentIndex + 1)
                                  ref.current.scrollToIndex({index: currentIndex + 1})
                                }
                                }>
                                  <Text  style={[themeTextStyle, {color:'#fff', margin:10}]}><Feather name="arrow-right-circle" size={28}  /></Text>
                                </TouchableOpacity>
                            </> 
                        }
                      </View>
                </>
              }
            </View>
 
            {/*  */}        
            <ScrollView style={CommonStyle.paddingHorizontal20}>   
          {/* Your Dream and Dream Journal Start */}
              <View style={Style.boxContainer}>
                <TouchableOpacity  onPress={() => navigation.navigate(NavigationStrings.ADD_YOUR_DREAM)} style={Style.activeboxBtn}>
                  <Image source={ImagePath.addDreanIcon} style={Style.boxImg}  />
                  <Text  style={[Style.boxHeading, themeTextStyle]}> Your Dream </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.DREAM_JOURNAL, )}  style={Style.boxBtn}>
                  <Image source={ImagePath.dreamJournalIcon}  style={Style.boxImg} />
                  <Text style={[Style.boxHeading, themeTextStyle]}> Dream Journal </Text>
                </TouchableOpacity>
              </View>
            {/* Your Dream and Dream Journal End */}  


            {/* Analyze Dream and Dream Circle Start */}
              <View style={Style.boxContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS)}  style={Style.boxBtn}>
                  <Image source={ImagePath.analyzeDreamIcon} style={Style.boxImg}  />
                  <Text style={[Style.boxHeading, themeTextStyle]}> Analyze Dream </Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE, )} style={Style.boxBtn}>
                  <Image source={ImagePath.dreamCircleIcon}  style={Style.boxImg} />
                  <Text style={[Style.boxHeading, themeTextStyle]}> Dreams Circle </Text>
                </TouchableOpacity>
              </View>
              {/* Analyze Dream and Dream Circle Emd */}


            {/* Symbol and Donate Start */}
              <View style={Style.boxContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.GET_SYMBOL)}  style={Style.boxBtn}>
                  <Image source={ImagePath.symbolIcon} style={Style.boxImg}  />
                  <Text style={[Style.boxHeading, themeTextStyle]}>Browse Symbols </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.DONATE)}  style={Style.boxBtn}>
                  <Image source={ImagePath.donateIcon} width="110" height="110"   />
                  <Text style={[Style.boxHeading, themeTextStyle]}  >  Subscribe </Text>
                </TouchableOpacity>
              </View>
            {/* Symbol and Donate End */}

              {/* Contact Us and Blog Start */}
              <View style={Style.boxContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.BLOG)}  style={Style.boxBtn}>
                  <Image source={ImagePath.blogIcon} style={Style.boxImg}  />
                  <Text style={[Style.boxHeading, themeTextStyle]}> Blog </Text>
                </TouchableOpacity>     

                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.QOTBOX)}  style={Style.boxBtn}>
                  <Image source={ImagePath.question} style={Style.boxImg}  />
                  <Text style={[Style.boxHeading, themeTextStyle]}> Question of the Day </Text>
                </TouchableOpacity>                
              </View>
            {/* Contact Us and Blog End */}

             {/* Contact Us and Blog Start */}
             <View style={Style.boxContainer}>
              

                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.CONTACT)}  style={Style.boxBtn}>
                  <Image source={ImagePath.contactUs} style={Style.boxImg}  />
                  <Text style={[Style.boxHeading, themeTextStyle]}> Contact Us </Text>
                </TouchableOpacity>             
              </View>
            {/* Contact Us and Blog End */}

        

            </ScrollView>
        </View>
    )
}


export default Welcome