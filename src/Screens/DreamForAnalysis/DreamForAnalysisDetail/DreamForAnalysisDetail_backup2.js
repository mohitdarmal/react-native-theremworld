import React, {useState, useEffect} from "react";
import {View, Text, ImageBackground, ScrollView, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from 'react-native-multiple-select';
import CommonStyle from "../../ScreenCommonCss";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import NavigationStrings from "../../../Constant/NavigationStrings";
import axios from "axios";
import Style from "./Style";
import { render } from "react-dom";



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
      const {dreamSymbols} = dreamUpdateAnalysis;
     const [getSymbolList, setGetListSymbol] = useState([]);

     const [multiSelectItem, setMultiSelectItem ] = useState([])
    const [selectedItems, setSelectedItems ] = useState([])

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
          console.log(res)
          setGetListSymbol(res.data.data);
          setIsLoading(false);
        })
      }


const onSelectedSymbol = (e) => {

    console.log(e.length, "hemant bhai ")
    const arrP = []
    const arr = {'idSymbol':'', 'symbolName':'', 'symbolDesc':''}
    for (let index = 0; index < e.length; index++) {
      console.log(e[index], "eindex")
      arr.symbolName = e[index];
      arrP.push(arr);
      var sa = [...selectedItems]
      sa.push(arr)
      setSelectedItems(sa)
      console.log(arr, "arrandrwala")
    }
    console.log(selectedItems, "arrbarahwaa")
    // setDreamUpdateAnalysis({...dreamUpdateAnalysis,  dreamSymbols:[...dreamSymbols, {idSymbol:'', symbolName:e, symbolBOW:null}]})
   /*  setDreamUpdateAnalysis({...dreamUpdateAnalysis, dreamSymbols:[...dreamUpdateAnalysis.dreamSymbols, {idSymbol:'', symbolName:e, symbolDesc:''}]}) */

}

console.log(dreamUpdateAnalysis, "selectedItems")

useEffect(() => {
    getAnaysisByUser();
    getSymbol()
},[])

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
                                <View style={{height:200, overflow:'scroll'}}>
                                <MultiSelect
                                    hideTags
                                    items={getSymbolList}
                                    uniqueKey="symbolName"
                                    // ref={(component) => { console.log(component, "Ref") }}
                                    onSelectedItemsChange={onSelectedSymbol}
                                    selectedItems={multiSelectItem}
                                    selectText="Select Symbol"
                                    fixedHeight={true}
                                    searchInputPlaceholderText="Search Symbols..."
                                    onChangeInput={(text)=> console.log(text)}
                                    tagRemoveIconColor="red"
                                    tagBorderColor="red"
                                    tagTextColor="red"
                                    selectedItemTextColor="#21a921"
                                    selectedItemIconColor="#21a921"
                                    itemTextColor="#000"
                                    displayKey="symbolName"
                                    searchInputStyle={{ color: '#CCC'  }}
                                    submitButtonColor="#CCC"
                                    submitButtonText="Select"
                                    />
                                </View>
                                {/*  */}

                                <View>
                                  <FlatList
                                    data={dreamUpdateAnalysis.dreamSymbols.symbolName}
                                    keyExtractor={(data, index) => index.toString()}
                                    renderItem={(data) => {
                                      console.log(data, "dddddddddddddd")
                                      render(
                                        <View>
                                          <Text> {data.item} </Text>
                                          </View>
                                      )
                                    }}
                                  />
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