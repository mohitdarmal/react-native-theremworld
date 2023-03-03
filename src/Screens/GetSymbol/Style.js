import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    alphabetContainer:{
        paddingHorizontal:20,
        flexDirection:'row',
    },
    alphabetLetter:{
        color:'#fff',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:100,
        width:35,
        height:35,
        textAlign:'center',
        lineHeight:35
    },
    searchByAlphabet:{
        paddingHorizontal:20,
        marginBottom:20
    },
    lightColor:{
        color:'#8A8A8A',
        fontWeight:'400'
    },
})

export default Style