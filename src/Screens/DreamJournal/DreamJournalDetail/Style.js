import {
    StyleSheet
} from "react-native";

const Style = StyleSheet.create({
   
    paddingHr20:{
        paddingHorizontal:20
    },
    detailBox:{
        paddingHorizontal:20
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
    title:{
        color:'#fff',
        fontSize:20,
        fontWeight:'500',
        marginBottom:10,
        textTransform:'capitalize'
    },
    dreamTxt:{
        fontSize:18,
        color:'#ffffffd1'
    },
    description:{
        color:'#B1CBF561',
        fontSize:15,
        textAlign:'justify',
        marginBottom:25
    },
    dreamSituation:{
        color:'#B1CBF561',
        fontSize:15,
        textAlign:'justify'
    },
    viewMoreBtn:{
        color:'#24C29D',
        borderBottomWidth:1,
        borderBottomColor:'#24C29D',
        fontWeight:'bold'
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
        paddingBottom:50,
        marginBottom:20,
    },
      txtAreaTxt:{
        fontSize:18,
        color:'#01203fa1',
    },
    inputField:{
        color:'#A8C1EE',
    },
    label:{
        color:'#01203F',
        paddingBottom:10,
        color:'#fff'
    },
    switchBtnActive: {
        color:'#466362'
    },
    switchBtnInActive:{
        color:'#466362',
        opacity:0.4
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
    save: {
        backgroundColor: '#466362',
        marginLeft:10,
        color: '#fff',
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        borderRadius:100
    },


})

export default Style;




