import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    subHeading:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontStyle:'italic',
        lineHeight:24,
        marginTop:40,
        fontWeight:'400'
    },
    userNameContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    userName:{
        fontSize:24,
        color:'#fff',
        fontWeight:'bold'
    },
    editBtn:{
        color:'#36B368',
        fontSize:18
    },
    userInfo:{
        borderBottomColor:'#8A8A8A55',
        borderBottomWidth:1,
        paddingVertical:15,
        marginBottom:15,
        paddingVertical:20,
        // color:'#31465B'
        color:'#fff'
    },
    userId:{
        borderBottomColor:'#8A8A8A55',
        borderBottomWidth:1,
        paddingBottom:25,
        marginBottom:5,
        // color:'#31465B',
        color:'#fff',
        marginTop:20
    },
    userIdIcon:{
        position:'relative',
        top:10
    },
    userInfoIcon:{
        // color:'#31465B'
        color:'#fff'
    },
    dNone:{
        display:'none'
    },
    profileLogOutBtn:{
        color:'#fff',
        fontSize:17,
        marginTop:10, 
        
    },
    donateBtnTxt:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold',
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
})

export default Style;