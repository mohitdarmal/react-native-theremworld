import { StyleSheet } from "react-native";

const Style = StyleSheet.create({

    inputBox:{
        flex: 1,
        marginTop:25
    },
    inputFieldTxt: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 10,
        height:60,
        elevation: 20,
        shadowColor: '#00000047',
        fontSize:17,
        color:'#01203fa1',
        letterSpacing:0.5,
        marginBottom:5
    },
    inputField: {
        paddingHorizontal: 15,
        borderWidth:1,
        borderColor:'#315492',
        height:50,
        backgroundColor:'#FFFFFF10',
        color:'#fff'

    },
    label:{
        color: '#fff',
        marginBottom:10,
        fontSize:17
    },
    donateBtn:{
        borderWidth: 1,
        borderColor: '#466362',
        borderRadius: 100,
        width: '100%',
        marginVertical: 25,
        height:55,
        justifyContent:'center',
        backgroundColor:'#466362',
        alignItems:'center'
    },
    donateBtnTxt:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold',
        borderRadius:100
    },
    radioBtnGroup:{
      flexDirection:'row',
      marginTop:20
    },
    activeRadioBtn:{
        color:'#36B368',
        marginRight:15
    },
    notActiveRadioBtn:{
        color:'#8CB1AF',
        marginRight:15
    }
})

export default Style