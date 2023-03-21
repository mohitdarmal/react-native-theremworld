import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Modal,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  CheckBox,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "react-native-multiple-select";
import CommonStyle from "../../ScreenCommonCss";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import NavigationStrings from "../../../Constant/NavigationStrings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Style from "./Style";
import { any } from "is_js";
import { showError } from "../../../Utils/helperFunction";
import Validator from "../../../Utils/DreamForAnalysisDetailValidation";

const DreamForAnalysisDetail = (props) => {
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? "" : CommonStyle.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light"
      ? CommonStyle.lightContainer
      : CommonStyle.darkContainer;

  const DreamForAnalysisDetailData = props.route.params;
  const isUserID = useSelector((state) => state.isSignIn.token);
  const [getUserAnalysis, setUserAnalysis] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [dreamUpdateAnalysis, setDreamUpdateAnalysis] = useState({
    idUser: DreamForAnalysisDetailData.idUser,
    idDream: DreamForAnalysisDetailData.dreadId,
    analystID: isUserID,
    analysisText: "",
    dreamSymbols: [],
  });


  /* Validation part start */
  const {analysisText} = dreamUpdateAnalysis;
  const isValidate = () => {
    const error = Validator({
      analysisText
    })
    if(error){
        showError(error)
        return false
    }
    return true;
  }
/* Validation part end */

  const [getSymbolList, setGetListSymbol] = useState([]);
  const [search, setSearch] = useState("");
  const [symbolActive, setSymbolActive] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
  const [getSelectSymbol, setGetSelectSymbol] = useState([]);
  const [newSelectedSymbol, setNewSelectedSymbol] = useState([]);

  const [saveSelectedSymbol, setSaveSelectedSymbol] = useState([]);
  const newarr = [];

  const getAnaysisByUser = (props) => {
    setIsLoading(true);
    axios
      .get(`${NavigationStrings.BASE_URL}getAnalysisByUser.php`, {
        params: {
          idUser: isUserID,
          idDream: DreamForAnalysisDetailData.dreadId,
        },
      })
      .then((val) => {
        setDreamUpdateAnalysis({ ...dreamUpdateAnalysis, ...val.data.data[0] });
        setIsLoading(false);
      });
  };

  const userAnalysis = (val) => {
    setDreamUpdateAnalysis(() => ({ ...dreamUpdateAnalysis, ...val }));
  };

  const updateDreamAnalysis = () => {
    const checkValid = isValidate();
    if(checkValid){
    setIsLoading(true);
    axios
      .post(
        `${NavigationStrings.BASE_URL}updateDreamAnalysis.php`,
        JSON.stringify(dreamUpdateAnalysis)
      )
      .then((res) => {
        if (res.data.status == true) {
          setIsLoading(false);
          props.navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS);
        }
      });
    }
  };

  const getSymbol = () => {
    axios
      .get(`${NavigationStrings.BASE_URL}getSymbols.php`, {
        params: { userRole: "user" },
      })
      .then((res) => {
        setGetListSymbol(res.data.data);
        setFilteredDataSource(res.data.data);
        setMasterDataSource(res.data.data);
      });
  };

  const getDreamSymbols = () => {
    axios
      .get(`${NavigationStrings.BASE_URL}getDreamSymbols.php`, {
        params: {
          idUser: DreamForAnalysisDetailData.idUser,
          idDream: DreamForAnalysisDetailData.dreadId,
          addedBy: isUserID,
        },
      })
      .then((response) => {
        if (response.data.status == true) {
          dreamUpdateAnalysis.dreamSymbols = response.data.data;
          var sumbolArr = [];
          var previouSaveSymbol = [];
          dreamUpdateAnalysis.dreamSymbols.map((data) => {
            sumbolArr.push(data.symbolName);
            previouSaveSymbol.push(data);
            // console.log(previouSaveSymbol, "werwerwe")
            // selectSymbolList(data);
          });
          setSaveSelectedSymbol(previouSaveSymbol);
          setNewSelectedSymbol(sumbolArr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAnaysisByUser();
    getSymbol();
    getDreamSymbols();
    
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.symbolName
          ? item.symbolName.toUpperCase()
          : "".toUpperCase();
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

  const ItemView = ({ item, index }) => {
    return (
      // Flat List Item
      <Text
        style={item.isSelected ? Style.symbolListActive : Style.symbolList}
        onPress={() => selectSymbolList(item)}
      >
        {item.symbolName}
      </Text>
    );
  };

  useEffect(()=> {

    // console.log("check" , saveSelectedSymbol)
    setSaveSelectedSymbol(saveSelectedSymbol)

  } , [saveSelectedSymbol])

  const selectSymbolList = (item) => {

    /* Deslect symbol list */
    const newaar = [...saveSelectedSymbol];
    const indexlist = newaar.findIndex(
      (data) => data.idSymbol == item.idSymbol
    );

    if (indexlist > -1) {
      newaar.splice(indexlist, 1);
      setSaveSelectedSymbol(newaar);
    } else {
      newaar.push(item)
      setSaveSelectedSymbol(newaar);
    }
    /* Deslect symbol list */

    

    dreamUpdateAnalysis.dreamSymbols = newaar;
    const newItem = filteredDataSource.map((data) => {
      if (item.symbolName == data.symbolName) {
        return { ...data, isSelected: !data.isSelected };
      } else {
        return data;
      }
    });

    setFilteredDataSource(newItem);
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#315492",
        }}
      />
    );
  };

  const openSymbolList = () => {
    setSuccesModalVisible(true);
    filteredDataSource.map((data) => {
      if (newSelectedSymbol.includes(data.symbolName)) {
        data.isSelected = true;
      }
    });
  };

  const saveSymbol = () => {
    setSuccesModalVisible(false);
    // dreamUpdateAnalysis.dreamSymbols = saveSelectedSymbol;
  };

console.log(saveSelectedSymbol, "asdfsf")

  return (
    <View style={[themeContainerStyle, { flex: 1 }]}>
      {/* Data loading indicator */}
      {isLoading ? (
        <View style={CommonStyle.screnLoader}>
          <ActivityIndicator size="large" color="#062B66" />
        </View>
      ) : (
        <View></View>
      )}
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
        <View
          style={[
            themeContainerStyle,
            { flex: 1, alignItems: "center", paddingTop: 45 },
          ]}
        >
          <TextInput
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Symbol"
            style={Style.searchInput}
            placeholderTextColor="#c1c1c1"
          />
          <View style={[Style.symbolContainer, { width: "85%" }]}>
            <View>
              <FlatList
                style={[Style.symbolContainer]}
                onEndReachedThreshold={0.5}
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                // ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
              />
            </View>
          </View>

          {/* Save Symol */}
          <View style={[Style.saveBtnContainer, { width: "85%" }]}>
            <TouchableOpacity
              onPress={() => setSuccesModalVisible(false)}
              style={{ flex: 1 }}
            >
              <Text style={Style.cancelBtn}> Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveSymbol} style={{ flex: 1 }}>
              <Text style={Style.save}> Save Symbol </Text>
            </TouchableOpacity>
          </View>
          {/* Save Symol  */}
        </View>
      </Modal>
      {/* Success Modal */}

      <HeaderComp backBtn />

      <ScrollView>
        <View style={Style.detailBox}>
          {/* <Text style={Style.title}>{DreamForAnalysisDetailData.dreamTitle} </Text> */}

          <Text style={[Style.dreamTxt, themeTextStyle]}>Dream Text:</Text>
          <Text style={[Style.description, themeTextStyle]}>
            {DreamForAnalysisDetailData.dreamText}
          </Text>

          <Text style={[Style.dreamTxt, themeTextStyle]}>Situation:</Text>
          <Text style={[Style.dreamSituation, themeTextStyle]}>
            {DreamForAnalysisDetailData.dreamSituation}{" "}
          </Text>

          {/* Dream tile */}
          <Text style={[Style.dreamTxt, themeTextStyle, { marginTop: 10 }]}>
            {" "}
            Your Analysis{" "}
          </Text>
          <View style={Style.inputBox}>
            <TextInput
              style={Style.textArea}
              value={dreamUpdateAnalysis.analysisText}
              multiline={true}
              numberOfLines={4}
              onChangeText={(val) => userAnalysis({ analysisText: val })}
              placeholder="Enter meaningful analysis as it will be rated by the user"
            />
            <Text style={{color:'#fff', marginBottom:25}}>Please enter meaningful analysis of twenty words or more</Text>
          </View>
          {/* Dream tile */}

          {/*  */}
          <View style={[Style.selectSymbol, themeTextStyle]}>
            <TouchableOpacity onPress={openSymbolList} style={{ flex: 1 }}>
              <Text> Select Symbol </Text>
            </TouchableOpacity>
          </View>
          {/*  */}

          {/*   <View>
                                 <Text style={{color:'#fff'}}>  {dreamUpdateAnalysis.dreamSymbols}</Text>
                               </View> */}

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {saveSelectedSymbol.map((data) => {
              return (
                <View key={data.idSymbol}>
                  <Text
                    style={{
                      color: "#fff",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 40,
                      fontSize: 12,
                      backgroundColor: "#466362",
                      marginRight: 10,
                      marginTop: 15,
                    }}
                  >
                    {data.symbolName}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Save AnALYSIS */}
          <View style={Style.saveBtnContainer}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS)
              }
              style={{ flex: 1 }}
            >
              <Text style={Style.cancelBtn}> Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={updateDreamAnalysis} style={{ flex: 1 }}>
              <Text style={Style.save}> Save Analysis </Text>
            </TouchableOpacity>
          </View>
          {/* Save AnALYSIS  */}
        </View>
      </ScrollView>
    </View>
  );
};

export default DreamForAnalysisDetail;
