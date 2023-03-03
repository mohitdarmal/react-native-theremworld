import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SearchBar = () => {
    return(
        <View style={Style.inputBox}>
             <FontAwesome5 style={Style.inputBoxIcon} size={16} name={'search'} />
             <TextInput
                 style={Style.inputField}
                 placeholder="Search..."
                 placeholderTextColor="#D2D2D2"
             />
        </View>
    )
}

const Style = StyleSheet.create({
    inputBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#4C85DD',
        borderRadius: 50,
        backgroundColor:'#ffffff10',
        overflow: 'hidden',
        marginBottom: 30,
        height:50
    },
    inputField: {
        flex: 1,
        paddingRight: 25,
        height:50,
        color:'#fff'
    },
    inputBoxIcon: {
        paddingTop: 17,
        paddingLeft:20,
        paddingRight:12,
        color: '#D2D2D2'
    },
})

export default SearchBar