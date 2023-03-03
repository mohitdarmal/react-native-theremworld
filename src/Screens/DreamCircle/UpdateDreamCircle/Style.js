import {
    StyleSheet
} from "react-native";

const Style = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff10',
        paddingTop: 25,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        // paddingHorizontal:20
    },
    paddingHr20:{
        paddingHorizontal:20
    },
    detailBox:{
        paddingHorizontal:20
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
        marginBottom:20
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
    label:{
        color:'#fff',
        fontSize:17,
        paddingBottom:10
    },
    switchBtnActive: {
        color:'#34B768',
        fontWeight:'bold'
    },
    switchBtnInActive:{
        color:'#ADADAD'
    },
    switchContainer:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexDirection:'row',
        alignItems:'center'
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




