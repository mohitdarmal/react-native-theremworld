import react, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const TextInputForm = (props) =>{


    const [visible, isSetVisible] = useState(true)

    return (
        <>
        <FontAwesome style={Styles.inputBoxIcon} name={props.leftIcon} size={20}  />
            <TextInput
            secureTextEntry={props.hideText}
            style={Styles.inputbox}
            placeholder={props.placeholder}
            placeholderTextColor={props.color}
            backgroundColor={props.bgColor} />
        <FontAwesome onPress={()=>{
            isSetVisible(!visible)
            console.log(visible)
            }}  style={Styles.inputBoxIconSecond} name={visible ?  props.rightIcon : "eye"} size={20}  />
            </>
    )
}

export default TextInputForm;

const Styles = StyleSheet.create({
    inputbox:{ flex:1, paddingHorizontal:12},


})