import React, {useEffect, useState} from "react";
import {View, Text, FlatList, ActivityIndicator, useColorScheme} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import { Rating, RatingInput } from 'react-native-stock-star-rating';
import { useDispatch, useSelector } from "react-redux";
import HeaderComp from "../../../Components/HeaderComp";
import ImagePath from "../../../Constant/ImagePath";
import NavigationStrings from "../../../Constant/NavigationStrings";
import axios from "axios";
import CommonStyle from "../../ScreenCommonCss";
import Style from "../Symbol/Style";



const Analysis = (props) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
  const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;

    const getAnalysis = props.route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [analysis, setAnalysis] = useState();
    const [rating,setRating] = React.useState(0);

    useEffect(() => {
        dreamJournalAnalysis()
    }, [])



    const dreamJournalAnalysis = () => {
        axios.get(`${NavigationStrings.BASE_URL}getDreamAnalysis.php`, {
          params : {idUser:getAnalysis.idUser, idDream:getAnalysis.dreadId}
        }).then((val) => {
          if(val.data.status == true){
            setAnalysis(val.data.data);
            setIsLoading(false)
          }
          else{
            alert("No Analysis Found");
            setIsLoading(false)
          }
        })
      }


      const savePostRating = (rate, anyalsisId) => {
        setIsLoading(true)
        console.log(rate, "rate")
        axios.post(`${NavigationStrings.BASE_URL}updateAnalysisRating.php`,
            JSON.stringify({
                idAnalysis: anyalsisId,
                rating: rate
            })
            ).then((res) => {
              dreamJournalAnalysis();
                console.log(res.data)               
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

               <HeaderComp backBtn title="Analysis" />

                    <ScrollView>
                          <FlatList
                                  data={analysis}

                                  keyExtractor={(data) => data.idAnalysis}

                                  renderItem={(data) => {
                                    console.log(data, "Data")
                                    return(
                                        <View style={[CommonStyle.paddingHorizontal20, Style.symbolContaniner]}>
                                                    <Text style={[Style.description, themeTextStyle]}>{data.item.analysisText} </Text>
                                                    <Text style={[Style.description, themeTextStyle]}>{data.item.analysisDate} </Text>
                                                    <RatingInput rating={data.item.analysisRating} setRating={(rate) => savePostRating(rate, data.item.idAnalysis)} maxStars={5} size={23}  />                                                    
                                        </View>

                                    )
                                  }}
                                />
                      </ScrollView>                      

 
        </View>
    )
}

export default Analysis