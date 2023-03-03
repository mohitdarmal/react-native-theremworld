import React from "react";
import NavigationStrings from "../Constant/NavigationStrings";
import TabRoute from "./TabRoutes";


export default function (Stack) {
    return (
        <>
          <Stack.Screen name={NavigationStrings.TABS}  component={TabRoute} />
          {/* <Stack.Screen name={NavigationStrings.WELCOME}  component={Welcome} />
          <Stack.Screen  name={NavigationStrings.DREAM_JOURNAL} component={DreamJournal} />
          <Stack.Screen  name={NavigationStrings.DREAM_JOURNAL_DETAIL} component={DreamJournalDetail} />
          <Stack.Screen  name={NavigationStrings.DONATE} component={Donate} /> */}
        </>
    )
}