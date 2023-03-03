import React, {useState, useEffect} from "react";
import {View,Modal, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, FlatList, CheckBox, ActivityIndicator, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from 'react-native-multiple-select';
import CommonStyle from "../../ScreenCommonCss";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import NavigationStrings from "../../../Constant/NavigationStrings";
import axios from "axios";
import Style from "./Style";



const DreamForAnalysisDetail = (props) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const DreamForAnalysisDetailData = props.route.params;
    const isUserID = useSelector((state) => state.isSignIn.token);
    const [getUserAnalysis, setUserAnalysis] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [dreamUpdateAnalysis, setDreamUpdateAnalysis] = useState({
        idUser:DreamForAnalysisDetailData.idUser,
        idDream: DreamForAnalysisDetailData.dreadId,
        analystID: isUserID,
        analysisText: '',
        dreamSymbols: [],
      });

     const [getSymbolList, setGetListSymbol] = useState([]);
     const [search, setSearch] = useState('');
     const [symbolActive, setSymbolActive] = useState(false)
     const [filteredDataSource, setFilteredDataSource] = useState([]);
     const [masterDataSource, setMasterDataSource] = useState([]);
     const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
     const [getSelectSymbol, setGetSelectSymbol] = useState([]);


    const [selectedItems, setSelectedItems ] = useState()

    const getAnaysisByUser = (props) => {
        setIsLoading(true)
        axios.get(`${NavigationStrings.BASE_URL}getAnalysisByUser.php`, {
            params : {idUser:isUserID, idDream:DreamForAnalysisDetailData.dreadId}
          }).then((val) => {
            setDreamUpdateAnalysis({...dreamUpdateAnalysis, ...val.data.data[0]})
            setIsLoading(false)
          })
      }

    const userAnalysis = (val) => {
        setDreamUpdateAnalysis(() => ({...dreamUpdateAnalysis, ...val}))
        console.log(val, "typing")
      }

      const updateDreamAnalysis = () => {
        setIsLoading(true)
        axios.post(`${NavigationStrings.BASE_URL}updateDreamAnalysis.php`,
        JSON.stringify(dreamUpdateAnalysis)
      ).then((res) => {
        console.log(res, "update analysis")
        setIsLoading(false)
        props.navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS)
      })
    }

      const getSymbol = () => {
        axios.get(`${NavigationStrings.BASE_URL}getSymbols.php`, {
          params : {idUser:isUserID}
        }).then((res) => {
          console.log(res, "symbol")
          setGetListSymbol(res.data.data);
          setFilteredDataSource(res.data.data);
         setMasterDataSource(res.data.data);
          console.log(res, "Realdata")
          setIsLoading(false);
        })
      }

const getDreamSymbols = () => {
  axios.get(`${NavigationStrings.BASE_URL}getDreamSymbols.php`, {
    params: {idUser: DreamForAnalysisDetailData.idUser, idDream: DreamForAnalysisDetailData.dreadId, addedBy: isUserID}
    }).then((response) => {
        console.log(response, "qqqqqqqqqqqq")

    }).catch((error) => {
       console.log(error)
});
}


useEffect(() => {
    getAnaysisByUser();
    getSymbol()
    getDreamSymbols()
},[])


const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource and update FilteredDataSource
    const newData = masterDataSource.filter(function (item) {
      // Applying filter for the inserted text in search bar
      const itemData = item.symbolName
        ? item.symbolName.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(masterDataSource);
    setSearch(text);
  }
};

const ItemView = ({ item }) => {
  return (
    // Flat List Item
      <Text style={item.selected ? Style.symbolListActive : Style.symbolList} onPress={() => selectSymbolList(item)}>
         {item.symbolName}
      </Text>

  );
};

const selectSymbolList = (item) => {
  console.log(item, "itemmmmm")
  var arr = [...getSelectSymbol]
  arr.push(item)
  console.log()
  // setGetSelectSymbol({...getSelectSymbol, item})
  setGetSelectSymbol(arr)
  // setGetSelectSymbol([...getSelectSymbol] , item)
  if( item.selected == true){
    item.selected = false;
  }else{
    item.selected = true;
  }
  dreamUpdateAnalysis.dreamSymbols = arr;
  setSymbolActive(!symbolActive)
  console.log(item.selected, "Selected")
}
console.log(getSelectSymbol, "werwer")

const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#315492',
      }}
    />
  );
};

const openSymbolList = () => {
  setSuccesModalVisible(true);
}

const saveSymbol = () => {
  setSuccesModalVisible(false);
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


           {/* Success Modal */}
           <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalSuccesVisible}
                  onRequestClose={() => {
                     setSuccesModalVisible(!modalSuccesVisible);
                  }}
               >
                  <View style={{flex: 1, alignItems: "center", backgroundColor:'#fff', paddingTop:35, overflow:'scroll'}}>
                            <View  style={[Style.symbolContainer, {width:'85%', }]}>
                                    <TextInput
                                      onChangeText={(text) => searchFilterFunction(text)}
                                      value={search}
                                      underlineColorAndroid="transparent"
                                      placeholder="Search Symbol"
                                      style={Style.searchInput}
                                      placeholderTextColor="#c1c1c1"
                                    />

                                    <View>
                                      <FlatList
                                        onEndReachedThreshold={0.5}
                                        data={filteredDataSource}
                                        keyExtractor={(item, index) => index.toString()}
                                        // ItemSeparatorComponent={ItemSeparatorView}
                                        renderItem={ItemView}
                                      />
                                    </View>


                               </View>

                              {/* Save Symol */}
                              <View style={[Style.saveBtnContainer, {width:'85%'}]}>
                                    <TouchableOpacity onPress={saveSymbol} style={{flex:1,}}>
                                    <Text style={Style.save}> Save Symbol </Text>
                                    </TouchableOpacity>
                                </View>
                                {/* Save Symol  */}
                  </View>
             </Modal>
  {/* Success Modal */}



              
               <HeaderComp backBtn/>
              

                        <ScrollView >
                            <View style={Style.detailBox}>
                                {/* <Text style={Style.title}>{DreamForAnalysisDetailData.dreamTitle} </Text> */}

                                <Text style={[Style.dreamTxt, themeTextStyle]}>Dream Text:</Text>
                                <Text style={[Style.description, themeTextStyle]}>{DreamForAnalysisDetailData.dreamText}

                                 </Text>

                                 <Text style={[Style.dreamTxt, themeTextStyle]}>Dream Situation:</Text>
                                <Text style={[Style.dreamSituation, themeTextStyle]}>{DreamForAnalysisDetailData.dreamSituation} </Text>

                                  {/* Dream tile */}
                                  <Text style={[Style.dreamTxt, themeTextStyle, {marginTop:10}]}> Your Analysis </Text>
                                   <View style={Style.inputBox}>
                                    <TextInput
                                    style={Style.textArea}
                                    value={dreamUpdateAnalysis.analysisText}
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(val) => userAnalysis({analysisText: val}) }
                                    placeholder="Enter meaningful analysis as it will be rated by the user"
                                />
                                   </View>
                                {/* Dream tile */}

                               {/*  */}
                               <View style={[Style.selectSymbol, themeTextStyle]}>
                                    <TouchableOpacity onPress={openSymbolList} style={{flex:1,}}>
                                    <Text> Select Symbol </Text>
                                    </TouchableOpacity>
                                </View>
                                {/*  */}

                              {/*   <View>
                                 <Text style={{color:'#fff'}}>  {dreamUpdateAnalysis.dreamSymbols}</Text>
                               </View> */}

                               <View style={{flexDirection:'row', flex:1}}>
                                <FlatList
                                  data={getSelectSymbol}
                                  keyExtractor={(item, index) => index.toString()}
                                  renderItem={(data) =>{
                                    return(
                                      <View >
                                        <Text style={{color:'#000'}}> {data.item.symbolName} </Text>
                                      </View>
                                    )
                                  }}
                                />
                               </View>



                                {/* Save AnALYSIS */}
                                <View style={Style.saveBtnContainer}>
                                <TouchableOpacity onPress={() => props.navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS)} style={{flex:1,}}>
                                  <Text style={Style.cancelBtn}> Cancel </Text>
                                </TouchableOpacity>
                                    <TouchableOpacity onPress={updateDreamAnalysis} style={{flex:1,}}>
                                    <Text style={Style.save}> Save Analysis </Text>
                                    </TouchableOpacity>
                                </View>
                                {/* Save AnALYSIS  */}

                            </View>
                        </ScrollView>
             


        
        </View>
    )
}

export default DreamForAnalysisDetail