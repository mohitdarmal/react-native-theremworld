import { StyleSheet } from "react-native"
const Style = StyleSheet.create({
    quesntion:{
        color:'#fff',
        fontSize:18,
        fontStyle:'italic',
        textAlign:'center',
        paddingHorizontal:10,
        marginBottom:20,
        lineHeight:30,
        marginTop:25,
        fontWeight:'500'
    },
    quesntionAsk:{
        color:'#fff',
        fontSize:20,
        fontStyle:'italic',
        paddingHorizontal:20,
        marginBottom:20,
        lineHeight:30,
        marginTop:25,
        fontWeight:'500'
    },
    radioBtnGroup:{
        flexDirection:'row',
        marginTop:20
      },
      activeRadioBtn:{
          color:'#fff',
          marginRight:15
      },
      notActiveRadioBtn:{
          color:'#666',
          marginRight:15
      },
      radionBtnTxt:{
        color:'#dbdbdb',
        fontSize:18,
        marginBottom:5
      },
      radionBtnTxtActive :{
        color:'#34B768',
        fontSize:18,
        marginBottom:5
      },
      saveQotdBtn:{
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
    saveQotdBtnTxt:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold',    
    },
    progressBarCount:{
        color:'#bebebe',
        marginBottom:5,
        marginTop:15
    },
    progressBar:{
        marginBottom:20,
        color:'#2052a9',
        borderColor:'#fff'
    }
})

export default Style