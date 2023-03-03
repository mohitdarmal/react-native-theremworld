import {
    StyleSheet
} from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImg: {
        height: 370,
        resizeMode: "center",
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 80
    },
    headerText: {
        color: '#fff',
        fontSize: 26,
        paddingTop: 10
    },
    headerSubTxt: {
        color: '#fff',
        fontSize: 18,
    },
    inputBoxContainer: {
        alignItems: 'center',
        flex: 1,
        marginTop: 20,
        paddingTop: 25,
        backgroundColor: '#fff',
        marginHorizontal: 25,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: -130
    },

    inputBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#c1c1c1',
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 20,
        flex: 1
    },
    inputBoxIcon: {
        borderRightWidth: 1,
        borderColor: '#c1c1c1',
        padding: 13,
        color: '#c1c1c1'
    },
    inputBoxIconSecond: {
        padding: 13,
        color: '#c1c1c1'
    },
    inputField: {
        flex: 1,
        paddingHorizontal: 12
    },
    signUpBtn: {
        backgroundColor: '#466362',
        color: '#fff',
        padding: 15,
        fontSize: 18,
        textAlign: 'center',
    },
    alreadyAccount: {
        flexDirection: 'row',
    },
    signInNow: {
        color: '#000',
        fontWeight: 'bold'
    },
    googleAccount:{
        flex:1,
        flexDirection:'row',

        color:'#fff',
        alignItems:'center',
    },
    googleTxt:{ backgroundColor:'#EB5944', color:'#fff', flex:1, paddingVertical:15, textAlign:'center'},
    googleIcon:{backgroundColor:'#D85038', color:'#fff', paddingVertical:15, paddingHorizontal:15, borderRightColor:'#D85038', borderRightWidth:1}

})

export default Styles;