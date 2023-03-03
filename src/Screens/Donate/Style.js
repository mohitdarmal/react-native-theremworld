import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    subHeading:{
        color:'#fff',
        fontSize:20,
        fontStyle:'italic',
        textAlign:'center',
        paddingHorizontal:20,
        marginBottom:20,
        lineHeight:30,
        marginTop:25,
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
    },

    inputBox:{
        flex: 1,
        marginTop:25
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
        color: '#ffffff70',
        marginBottom:10
    },
    donateBtn:{
        borderWidth: 1,
        borderColor: '#466362',
        borderRadius: 5,
        width: '100%',
        marginVertical: 25,
        height:55,
        justifyContent:'center',
        backgroundColor:'#466362',
        alignItems:'center',
        borderRadius:100
    },
    donateBtnTxt:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold',
    },
    closeBtn:{
        fontWeight:'bold',
        top:-27,
        left:13,
        position:'absolute',
    }
})

export default Style