import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, TextInput, FlatList, useColorScheme, ActivityIndicator} from "react-native";
import HeaderComp from "../../../Components/HeaderComp";
import { ScrollView } from 'react-native-virtualized-view';
import NavigationStrings from "../../../Constant/NavigationStrings";
import ImagePath from "../../../Constant/ImagePath";
import axios from "axios";
import CommonStyle from "../../ScreenCommonCss";
import Style from "./Style";



const Symbol = (props) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const getSymbol = props.route.params;
    const [symbol, setSymbol] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        symbolAnalysis()
    }, [])

console.log(isLoading, "load")

    const symbolAnalysis = () => {
        axios.get(`${NavigationStrings.BASE_URL}getDreamSymbols.php`, {
          params : {idUser:getSymbol.idUser, idDream:getSymbol.dreadId}
        }).then((val) => {
          if(val.data.status == true){
            setSymbol(val.data.data);
            setIsLoading(false);
          }
          else{
            alert("No Symbol Found");
            setIsLoading(false);
          }
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
              
               <HeaderComp backBtn title="Symbol"/>
               <ScrollView>
                    <FlatList
                      data={symbol}

                      keyExtractor={(data) => data.idSymbol}

                      renderItem={(data) => {
                        console.log(data.item, "Data")
                        return(
                            <View style={[CommonStyle.paddingHorizontal20, Style.symbolContaniner]}>
                                        <Text style={[Style.title, themeTextStyle]}>{data.item.symbolName} </Text>
                                        <Text style={[Style.description, themeTextStyle]}>{data.item.symbolDesc} </Text>
                            </View>
                        )
                      }}
                    />              
            </ScrollView>
 
        </View>
    )
}

export default Symbol