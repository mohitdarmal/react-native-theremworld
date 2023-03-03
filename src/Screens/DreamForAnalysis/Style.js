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
        marginBottom:20
    },
    title:{
        color : '#fff',
        fontSize: 18,
        fontWeight:'500',
        textTransform:'capitalize'
    },
    whiteColor:{
        color:'#fff',
        fontWeight:'500'
    },
    lightColor:{
        color:'#ffffff95',
        fontWeight:'400'
    },
})

export default Style