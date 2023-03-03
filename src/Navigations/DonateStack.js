import React from "react";
import NavigationStrings from "../Constant/NavigationStrings";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    AddYourDream,
    Welcome,
    Donate,
    EditProfile,
    DreamJournal,
    DreamJournalDetail,
    DreamForAnalysis,
    UserProfile,
    DreamForAnalysisDetail,
    Analysis,
    Symbol,
    GetDreamCircle,
    UpdateDreamJournal,
    AddDreamCircle,
    Contact,
    QodBox,
    GetSymbol,
    Blog
  } from "../Screens/Index";

const Stack = createNativeStackNavigator();



export default function DonateStack (){
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen  name={NavigationStrings.DONATE} component={Donate} />
          <Stack.Screen name={NavigationStrings.WELCOME}  component={Welcome} />
          <Stack.Screen name={NavigationStrings.ADD_YOUR_DREAM}  component={AddYourDream} />
          <Stack.Screen  name={NavigationStrings.DREAM_FOR_ANALYSIS} component={DreamForAnalysis} />
          <Stack.Screen  name={NavigationStrings.USER_PROFILE} component={UserProfile} />
          <Stack.Screen  name={NavigationStrings.DREAM_JOURNAL} component={DreamJournal} />
          <Stack.Screen  name={NavigationStrings.DREAM_JOURNAL_DETAIL} component={DreamJournalDetail} />
          <Stack.Screen  name={NavigationStrings.DREAM_FOR_ANALYSIS_DETAIL} component={DreamForAnalysisDetail} />
          <Stack.Screen  name={NavigationStrings.EDIT_PROFILE} component={EditProfile} />
          <Stack.Screen  name={NavigationStrings.ANALYSIS} component={Analysis} />
          <Stack.Screen  name={NavigationStrings.SYMBOL} component={Symbol} />
          <Stack.Screen  name={NavigationStrings.GET_DREAM_CIRCLE} component={GetDreamCircle} />
          <Stack.Screen  name={NavigationStrings.UPDATE_DREAM_JOURNAL} component={UpdateDreamJournal} />
          <Stack.Screen  name={NavigationStrings.ADD_DREAM_CIRCLE} component={AddDreamCircle} />
          <Stack.Screen  name={NavigationStrings.CONTACT} component={Contact} />
          <Stack.Screen  name={NavigationStrings.QOTBOX} component={QodBox} />
          <Stack.Screen  name={NavigationStrings.GET_SYMBOL} component={GetSymbol} />
          <Stack.Screen  name={NavigationStrings.BLOG} component={Blog} />
        </Stack.Navigator>
    )
}