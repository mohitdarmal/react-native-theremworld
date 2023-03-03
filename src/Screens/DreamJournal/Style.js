import {
    StyleSheet
} from "react-native";

const Style = StyleSheet.create({
    titleBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom:10

    },
    inputBox: {
        flexDirection: 'row',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden',
        width: '90%',
        marginBottom: 20,
        backgroundColor:'#dee2e7',
        height:60,
        paddingHorizontal:30
      
    },
    inputBoxIcon: {
        borderColor: '#c1c1c1',
        padding: 13,
        color: '#1E3441',
       paddingTop:22,
       paddingRight:5
    },
    inputField: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize:20
    },
    analysseBox:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderColor:'#8A8A8A50',
        paddingBottom:20,
        marginBottom:20,
        justifyContent:'space-between'
    },
    title:{
        // color : '#01203F',
        color:'#fff',
        fontSize: 18,
        fontWeight:'500',
        textTransform:'capitalize'
    },
    closeBtn:{
        color:'#E47653'
    },
    whiteColor:{
        color:'#fff',
        fontWeight:'500'
    },
    lightColor:{
        color:'#f7f7f790',
        fontWeight:'400'
    },
    addDreamBtn: {
        flex: 1,
        position: 'absolute',
        zIndex: 55,
        bottom:30,
        right:30
    },
    addDreanBtnTxt:{
      backgroundColor:'#466362',
      width:60,
      height:60,
      lineHeight:60,
      borderRadius:100,
      textAlign:'center',
      color:'#fff',
      elevation: 5,
    },
    showSymbolandAnalysis:{
        paddingTop:3
    },
    visiblePopupText:{
        fontSize:22,
        color:'#fff',
        paddingHorizontal:30,
        textAlign:'center',
        lineHeight:28,
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

export default Style