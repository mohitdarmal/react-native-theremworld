import 'react-native-gesture-handler';
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlashMessage from "react-native-flash-message";
import Routes from "./src/Navigations/Route";
import { Provider } from "react-redux";
import store from './src/redux/store';



// import store from "./src/Redux/store";
/* import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
} from '@expo-google-fonts/roboto';
import { useFonts } from '@expo-google-fonts/roboto';
import AppLoading from "expo-app-loading"; */

export default function App() {


  /* let [fontsLoad] = useFonts({
    Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
  }); */

  // if(!fontsLoad){
  //   return <AppLoading />
  // }

  return (
   /*  <Provider store={store}>
    <View style={styles.container}>
      <Routes/>
      <FlashMessage position="bottom" />
      <StatusBar style="auto" />
    </View>
    </Provider> */
<Provider store={store}>
    <View style={styles.container}>
      <Routes/>
      <FlashMessage position="bottom" />
      <StatusBar style="auto" />
    </View>
</Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width:'100%',
    height:'100%'
  },
});
