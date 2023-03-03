import React, {useState} from "react";
import {Text, View, ImageBackground, ScrollView, Image, TextInput, Switch, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationStrings from "../../Constant/NavigationStrings";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import Style from "./Style";


const Welcome = ({navigation}) => {
  // const navigation = useNavigation();
  const [active, setActive] = useState(true)
  const [inActive, setInActive] = useState(false)

  const goToScreen = () => {
    navigation.navigate(NavigationStrings.WELCOME, {title:'Welcome Screen'});
  }
    return(
        <View style={{flex:1,}}>
          <ImageBackground  source={ImagePath.bgImg} style={{flex:1, paddingBottom:80}}  resizeMode="cover"  >
            <HeaderComp toggleBtn/>
            <ScrollView style={CommonStyle.paddingHorizontal20}>
              <Text style={CommonStyle.heading}>Welcome!</Text>
              <Text style={CommonStyle.subHeading}>Lorem Ipsum is dummy. </Text>

              <View style={Style.boxContainer}>
                <TouchableOpacity  onPress={() => navigation.navigate(NavigationStrings.ADD_YOUR_DREAM)} style={Style.activeboxBtn}>
                  <Image source={ImagePath.addDreanIcon} style={Style.boxImg}  />
                  <Text  style={Style.boxHeading}> Your Dream </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.DREAM_JOURNAL, )}  style={Style.boxBtn}>
                  <Image source={ImagePath.dreamJournalIcon}  style={Style.boxImg} />
                  <Text style={Style.boxHeading}> Dream Journal </Text>
                </TouchableOpacity>
              </View>


              <View style={Style.boxContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS)}  style={Style.boxBtn}>
                  <Image source={ImagePath.analyzeDreamIcon} style={Style.boxImg}  />
                  <Text style={Style.boxHeading}> Analyze Dream </Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE, )} style={Style.boxBtn}>
                  <Image source={ImagePath.dreamCircleIcon}  style={Style.boxImg} />
                  <Text style={Style.boxHeading}> Dreams Circle </Text>
                </TouchableOpacity>
              </View>

              <View style={Style.boxContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.GET_SYMBOL)}  style={Style.boxBtn}>
                  <Image source={ImagePath.symbolIcon} style={Style.boxImg}  />
                  <Text style={Style.boxHeading}> Symbol </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.DONATE)}  style={Style.boxBtn}>
                  <Image source={ImagePath.donateIcon} width="81" height="81"  style={{  marginBottom: 15,}} />
                  <Text style={Style.boxHeading} width="81" height="81">  Donate </Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
            </ImageBackground>
        </View>
    )
}


export default Welcome