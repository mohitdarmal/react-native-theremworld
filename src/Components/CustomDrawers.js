import React, {useEffect} from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
import NavigationStrings from '../Constant/NavigationStrings';
import { Welcome } from '../Screens/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from "react-native";

import * as Updates from 'expo-updates';




  function CustomDrawer(props) {
    const {navigation} = props;

    const logOut = () => {
      AsyncStorage.removeItem('userId');
      Updates.reloadAsync()
    }
    


    return (
      <DrawerContentScrollView {...props}>
 
        <DrawerItem
          label="Home"
          onPress={() => navigation.navigate(NavigationStrings.WELCOME)}
        />

        <DrawerItem
          label="Add Your Dream"
          onPress={() => navigation.navigate(NavigationStrings.ADD_YOUR_DREAM)}
        />
        <DrawerItem
          label="Dream Journal"
          onPress={() => navigation.navigate(NavigationStrings.DREAM_JOURNAL)}
        />

        <DrawerItem
          label="Analyze Dream"
          onPress={() => navigation.navigate(NavigationStrings.DREAM_FOR_ANALYSIS)}
        />

        <DrawerItem
          label="Dream Circle"
          onPress={() => navigation.navigate(NavigationStrings.GET_DREAM_CIRCLE)}
        />
        
          <DrawerItem
          label="Donate"
          onPress={() => navigation.navigate(NavigationStrings.DONATE)}
        />

        <DrawerItem
          label="Contact Us"
          onPress={() => navigation.navigate(NavigationStrings.CONTACT)}
        />

        <DrawerItem
          label="Question of the Day"
          onPress={() => navigation.navigate(NavigationStrings.QOTBOX)}
        />

        <DrawerItem
          label="Log Out"
          onPress={logOut}
        />

      </DrawerContentScrollView>
    );
  }

  export default CustomDrawer