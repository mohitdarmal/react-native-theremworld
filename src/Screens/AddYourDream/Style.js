import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    subHeading:{
        // color:'#001B35',
        color:'#fff',
        fontSize:20,
        fontStyle:'italic',
        textAlign:'center',
        paddingHorizontal:35,
        lineHeight:30,
        marginTop:25,
        // marginBottom:50,
        fontWeight:'500'
    },
    inputFieldTxt: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 10,
        height:60,
        elevation: 20,
        shadowColor: '#00000047',
        fontSize:18,
        color:'#01203fa1',
        letterSpacing:0.5,
        marginBottom:35
    },
    descTxt:{
        // color:'#31465B',
        color:'#ffffff80',
        // paddingLeft:20,
        marginBottom:30,
    },
    saveBtnContainer:{
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 20,
        flex: 1,
        flexDirection:'row',
        paddingVertical:15
    },
    textArea:{
        fontSize:18,
        color:'#01203fa1',
        backgroundColor:'#fff',
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 10,
        elevation: 20,
        shadowColor: '#00000047',
        flex: 1,
        paddingHorizontal:20,
        height:130,
        marginBottom:20
    },
    txtAreaTxt:{
        paddingTop:10,
        fontSize:18,
        color:'#01203fa1',
    },
    visiblePopupText:{
        fontSize:20,
        color:'#ffffff',
        backgroundColor:'#fff',
        padding:30,
        margin:30,
        borderRadius:10,
        lineHeight:28,
        marginBottom:40
    },
    inputField:{
        color:'#A8C1EE',
    },
    label:{
        color:'#fff',
        paddingBottom:10
    },
    switchBtnActive: {
        // color:'#01203F',
        color:'#fff',
        fontSize:18,
        paddingTop:40,
        marginBottom:20,
        width:'90%'
    },
    switchBtnInActive:{
        // color:'#01203F66',
        color:'#7D7D7D',
        fontSize:18,
        paddingTop:40,
        marginBottom:20,
        width:'90%'
    },
    switchContainer:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexDirection:'row',
        alignItems:'center'
    },
    cancelBtn:{
        backgroundColor: '#7D7D7D',
        color: '#fff',
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        borderRadius:100,
        marginRight:10
    },
    popupCancelBtn:{
        marginBottom:20
    },
    save: {
        backgroundColor: '#466362',
        marginLeft:10,
        color: '#fff',
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        borderRadius:100
    },
    popupSaveBtn:{
        marginLeft:0
    }

})

export default Style;