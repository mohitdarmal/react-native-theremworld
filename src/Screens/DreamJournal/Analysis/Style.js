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
        textTransform:'capitalize',
        marginTop:20
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

    inputBox: {
        // flexDirection: 'row',
        backgroundColor:'#ffffff10',
        borderWidth: 1,
        borderColor: '#315492',
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 20,
        flex: 1,
        paddingHorizontal:20,
        paddingVertical:15

    },
    saveBtnContainer:{
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 20,
        flex: 1,
        paddingVertical:15
    },
    textArea:{
        backgroundColor:'#ffffff10',
        borderWidth: 1,
        borderColor: '#315492',
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 10,
        flex: 1,
        paddingHorizontal:20,
        height:150
    },
    inputField:{
        color:'#A8C1EE',
    },
    label:{
        color:'#fff',
        paddingBottom:10
    },
    switchBtnActive: {
        color:'#fff'
    },
    switchBtnInActive:{
        color:'#fff5'
    },
    switchContainer:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexDirection:'row',
        alignItems:'center'
    },
    save: {
        backgroundColor: '#466362',
        color: '#fff',
        padding: 15,
        fontSize: 18,
        textAlign: 'center',
        borderRadius:7
    },


})

export default Style;




