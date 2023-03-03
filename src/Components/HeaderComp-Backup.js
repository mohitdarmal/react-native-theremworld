import React from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePath from "../Constant/ImagePath";
import NavigationString from "../Constant/NavigationStrings"

const HeaderComp = (props) => {
    const navigation = useNavigation();
    return (
        <View style={Style.headerContainer}>
            <View>
                {props.backBtn ?
             (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text> <Ionicons style={Style.menuIcon} name="md-chevron-back" size={24}  /> </Text>
              </TouchableOpacity>

             )    :  !!props.toggleBtn ?
             (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                {/* <Text> <Feather style={Style.menuIcon} name="menu" size={24}  /> </Text> */}
                <Image style={ {
                          width : 29,
                          height : 29,
                        }}
                      source={ImagePath.hemBurger} />
              </TouchableOpacity>
             ) :
              ( <Text /> )
            }

            </View>

            <View>
            <Image style={ {
                        width : 150,
                        height : 60,
                      }}
                    source={ImagePath.logo} />
                </View>

                <View>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationString.USER_PROFILE)}>
                    <Image style={ {
                        width : 25,
                        height : 25,
                     }}
                    source={ImagePath.userProfile} />
                </TouchableOpacity>
                </View>
        </View>
    )
}

const Style = StyleSheet.create({
    headerContainer : {
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:30,
        paddingTop:50,
        paddingBottom:20,
        justifyContent:'space-between',
        alignItems:'center'
    },
    menuIcon:{
        color : '#fff'
    }
})

export default HeaderComp;