import React from "react";
import {View, StyleSheet, Text, ImageBackground, ScrollView, TextInput, FlatList} from "react-native";
import HeaderComp from "../../../Components/HeaderComp";
import SearchBar from "../../../Components/SearchBar";
import ImagePath from "../../../Constant/ImagePath";
import CommonStyle from "../../ScreenCommonCss";
import Style from "./Style";



const DreamJournalDetail = (props) => {
    const DreamJournalDetail = props.route.params;
    console.log(DreamJournalDetail)
    return(
        <View style={{flex:1}}>
             <ImageBackground  source={ImagePath.bgImg} style={{flex:1, paddingBottom:80}}  resizeMode="cover"  >
               <HeaderComp backBtn/>
               <View style={Style.container}>
                {/* SearchBar */}
                <View style={Style.paddingHr20}>
                <SearchBar />
                </View>



                        <ScrollView >
                            <View style={Style.detailBox}>
                                <Text style={Style.title}>{DreamJournalDetail.dreamTitle} </Text>
                                {/* {DreamJournalDetail.dreamSituation ? : <Text/>  } */}
                                <Text style={Style.dreamTxt}>Dream Text </Text>
                                <Text style={Style.description}>{DreamJournalDetail.dreamText}
                                 {/* <Text style={Style.viewMoreBtn}>view more </Text>  */}
                                 </Text>
                                 {/* {DreamJournalDetail.dreamSituation ? : ''} */}
                                 <Text style={Style.dreamTxt}>Dream Situation </Text>
                                <Text style={Style.dreamSituation}>{DreamJournalDetail.dreamSituation} </Text>
                            </View>
                        </ScrollView>
               </View>


           </ImageBackground>
        </View>
    )
}

export default DreamJournalDetail