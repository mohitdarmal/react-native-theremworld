import { StyleSheet } from "react-native";

const Style = StyleSheet.create({

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
    label:{
        color: '#ffffff70',
        marginBottom:10
    },
    labelTextarea:{ color: '#ffffff70',
    marginTop:25, marginBottom:10},
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
        fontWeight:'bold'
    },
    closeBtn:{
        fontWeight:'bold',
        top:-8,
        left:-15,
        position:'absolute',
    },
    textArea:{
        fontSize:18,
        marginTop:25,
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
    },
    txtAreaTxt:{
        fontSize:18,
        color:'#01203fa1',
    },
 
})

export default Style