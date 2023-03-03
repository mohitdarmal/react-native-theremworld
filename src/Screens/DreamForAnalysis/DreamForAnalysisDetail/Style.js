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
    title:{
        color:'#fff',
        fontSize:20,
        fontWeight:'500',
        marginBottom:10,
        textTransform:'capitalize'
    },
    dreamTxt:{
        fontSize:20,
        color:'#fff',
        marginBottom:10
    },
    description:{
        color:'#ffffff90',
        fontSize:15,
        textAlign:'justify',
        marginBottom:40,
        lineHeight:24

    },
    dreamSituation:{
        color:'#ffffff90',
        fontSize:15,
        textAlign:'justify',
        marginBottom:40,

    },
    viewMoreBtn:{
        color:'#24C29D',
        borderBottomWidth:1,
        borderBottomColor:'#24C29D',
        fontWeight:'bold'
    },
    selectSymbol:{
        backgroundColor:"#fff",
        borderColor:'#dbdbdb', 
        borderWidth:1, 
        padding:20,
        elevation: 20,
        shadowColor: '#00000047',
        borderRadius: 5,
    },

    saveBtnContainer:{
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 20,
        flex: 1,
        flexDirection:'row',
        paddingVertical:15,
        marginTop:30
    },
    textArea:{
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 10,
        flex: 1,
        paddingHorizontal:20,
        paddingBottom:50,
        color:'#01203F66',
        fontSize:18,    
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
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        borderRadius:100
    },
    searchInput:{
        backgroundColor: "#fff",
        width:'85%',
        paddingHorizontal: 20,
        borderRadius: 10,
        height:60,
        elevation: 20,
        shadowColor: '#00000047',
        fontSize:18,
        color:'#01203fa1',
        letterSpacing:0.5,
        marginBottom:35,
        borderColor:'#ededed',
        borderWidth: 1,
    },
    symbolContainer:{
        backgroundColor:'#ffffff',
        borderColor: '#dbdbdb',
        borderRadius: 10,
        elevation: 20,
        shadowColor: '#00000047',
        height:450,

    },
    symbolList:{
        color:'#01203fa1',
       paddingHorizontal:20,
        paddingVertical:15,
        borderBottomWidth:1,
        borderColor:'#dbdbdb',
        fontSize:16
    },
    symbolListActive:{
        backgroundColor:'#36B368',
        color:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#dbdbdb',
        paddingHorizontal:20,
        paddingVertical:15,
    },
    cancelBtn:{
        backgroundColor: '#7D7D7D',
        color: '#fff',
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        borderRadius:100,
        marginRight:10,
        width:'86%'
    },
    symbolTagContainer:{
        flexDirection:'column',
        flex:1
    },
    symbolTag:{
        backgroundColor:'red',

    }

})

export default Style;




