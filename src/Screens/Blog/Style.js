import {
    StyleSheet
} from "react-native";

const Style = StyleSheet.create({
    popupContainer: {
        flex: 0.8,
        alignItems: "center",
        backgroundColor: '#ffffff',
        paddingTop: 45,
        marginTop: 'auto'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        paddingBottom: 10,
        fontWeight:'bold'
    },
    blogDescr: {
        color: '#ffffff98',
        textAlign: 'left',
        lineHeight: 22,
    },
    readMoreBtn: {
        color: '#fff',
        marginTop: 10
    },
    popupTitle: {
        color: '#000',
        fontSize: 22,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    popupDesc: {
        paddingBottom: 50,
        marginBottom: 50,
        color: '#333',
        fontSize: 16
    },
    singBlogCloseBtn: {
        position: 'absolute',
        top: 10,
        right: 15,
        color: '#ff6666'
    },
    blogFooter:{
        flexDirection:'row', justifyContent:'space-between', marginTop:20
    },
    author:{
        color:'#ffffff98',
        paddingTop:10
    }
})

export default Style