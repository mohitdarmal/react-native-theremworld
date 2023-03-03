import React, {useState, useEffect} from "react";
import {View,Modal, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, FlatList, CheckBox, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from 'react-native-multiple-select';
import CommonStyle from "../../ScreenCommonCss";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import NavigationStrings from "../../../Constant/NavigationStrings";
import axios from "axios";
import Style from "./Style";



const DreamForAnalysisDetail = (props) => {

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
     const [modalSuccesVisible, setSuccesModalVisible] = useState(true);


    const [selectedItems, setSelectedItems ] = useState()

    const getAnaysisByUser = () => {
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


      const closeSuccessfulPopup = () => {
        setSuccesModalVisible(!modalSuccesVisible);
        navigation.navigate(NavigationString.WELCOME)
     }


useEffect(() => {
    getAnaysisByUser();
    getSymbol()

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
  if( item.selected == true){
    item.selected = false;
  }else{
    item.selected = true;
  }

  setSymbolActive(!symbolActive)
  console.log(item.selected, "Selected")
}
console.log(symbolActive)

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

const getItem = (item) => {
  // Function for click on an item
  alert('Id : ' + item.id + ' Title : ' + item.title);
};

    return(
        <View style={{flex:1}}>


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
                  <View style={{flex: 1,

                        alignItems: "center", backgroundColor:'#000000de', paddingTop:35, overflow:'scroll'}}>
                            <View  style={[Style.symbolContainer, {width:'85%'}]}>
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

                                        data={filteredDataSource}
                                        keyExtractor={(item, index) => index.toString()}
                                        ItemSeparatorComponent={ItemSeparatorView}
                                        renderItem={ItemView}
                                      />
                                    </View>
                               </View>
                  </View>
             </Modal>
  {/* Success Modal */}



             <ImageBackground  source={ImagePath.bgImg} style={{flex:1, paddingBottom:80}}  resizeMode="cover"  >
               <HeaderComp backBtn/>
               <View style={Style.container}>

                        <ScrollView >
                            <View style={Style.detailBox}>
                                <Text style={Style.title}>{DreamForAnalysisDetailData.dreamTitle} </Text>

                                <Text style={Style.dreamTxt}>Dream Text </Text>
                                <Text style={Style.description}>{DreamForAnalysisDetailData.dreamText}

                                 </Text>

                                 <Text style={Style.dreamTxt}>Dream Situation </Text>
                                <Text style={Style.dreamSituation}>{DreamForAnalysisDetailData.dreamSituation} </Text>

                                  {/* Dream tile */}
                                  <Text style={[Style.label, {marginTop:10}]}> Your Analysis </Text>
                                   <View style={Style.inputBox}>
                                    <TextInput
                                    style={Style.inputField}
                                    value={dreamUpdateAnalysis.analysisText}
                                    multiline={true}
                                    numberOfLines={4}
                                    onChangeText={(val) => userAnalysis({analysisText: val}) }
                                    // placeholder="Enter meaningful analysis"
                                    placeholderTextColor="#c1c1c1"
                                />
                                   </View>
                                {/* Dream tile */}

                               {/*  */}

                                {/*  */}

                                <View>
                                 <Text style={{color:'#fff'}}>  {dreamUpdateAnalysis.dreamSymbols}</Text>
                               </View>



                                {/* Save AnALYSIS */}
                                <View style={Style.saveBtnContainer}>
                                    <TouchableOpacity onPress={updateDreamAnalysis} style={{flex:1,}}>
                                    <Text style={Style.save}> Save Analysis </Text>
                                    </TouchableOpacity>
                                </View>
                                {/* Save AnALYSIS  */}

                            </View>
                        </ScrollView>
               </View>


           </ImageBackground>
        </View>
    )
}

export default DreamForAnalysisDetail