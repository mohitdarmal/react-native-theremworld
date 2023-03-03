import React, {useEffect, useState} from "react";
import {Text, View, ImageBackground, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import NavigationStrings from "../../Constant/NavigationStrings";
import Style from "./Style";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectList from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from "react-redux";


const GetSymbol = ({navigation}) => { 

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;


  const isUserID = useSelector((state) => state.isSignIn.token);
  const [symbol, setSymbol] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = React.useState("");

  /* const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']; */

  const alphabet = [
    {key:'A',value:'A'},
    {key:'B',value:'B'},
    {key:'C',value:'C'},
    {key:'D',value:'D'},
    {key:'E',value:'E'},
    {key:'F',value:'F'},
    {key:'G',value:'G'},
    {key:'H',value:'H'},
    {key:'I',value:'I'},
    {key:'J',value:'J'},
    {key:'K',value:'K'},
    {key:'L',value:'L'},
    {key:'M',value:'M'},
    {key:'N',value:'N'},
    {key:'O',value:'O'},
    {key:'P',value:'P'},
    {key:'Q',value:'Q'},
    {key:'R',value:'R'},
    {key:'S',value:'S'},
    {key:'T',value:'T'},
    {key:'U',value:'U'},
    {key:'V',value:'V'},
    {key:'W',value:'W'},
    {key:'X',value:'X'},
    {key:'Y',value:'Y'},
    {key:'Z',value:'Z'},
 ];

const alphabetSelect = (e) => {
  setIsLoading(true)
  axios.get(`${NavigationStrings.BASE_URL}getSymbolsByLetter.php`, {
    params : {letter:e}
  }).then((res) => {
    if(res.data.status == true){
      setSymbol(res.data.data);
    }
    else{
      setSymbol("No Symbol Found");
    }
    setIsLoading(false)
  })
}

  useEffect(() => {
    getSymbol();
    // getSymbolByLetter();
  }, [])


  const getSymbol = () => {
    axios.get(`${NavigationStrings.BASE_URL}getSymbols.php`, {
      params : {userRole:"user"}
    }).then((res) => {
      if(res.data.status == true){
        console.log(res.data.data)
        setSymbol(res.data.data);
      setIsLoading(false);
      }
      else{
        alert(res.data.message);
      }
    })
  }


 /*  const getSymbol = () => {
    axios.get(`${NavigationStrings.BASE_URL}getSymbols.php`, {
      params : {idUser:isUserID}
    }).then((res) => {
      console.log(res)
        setSymbol(res.data.data);
      setIsLoading(false);
    })
  } */

    return (
      <>

<View style={[CommonStyle.flex1, themeContainerStyle]} >

          {/* Data loading indicator */}
              {isLoading
                ?
                  <View style={CommonStyle.screnLoader}>
                    <ActivityIndicator size="large" color="#062B66"  />
                  </View>
                :
                  <View></View>
              }
          {/* Data loading indicator */}

           
          <HeaderComp toggleBtn title="Symbol"/>
 

              <View style={{paddingHorizontal:20, marginBottom:25}}>
                <SelectList
                  inputStyles={{color:'#01203fa1', fontSize:18, opacity:0.7}} boxStyles={[themeTextStyle, { height:60, backgroundColor:'#fff', marginTop:15,  elevation: 20, shadowColor: '#00000047', fontSize:16, color:'#01203fa1', borderColor:'#fff', paddingTop:15}]}
                  searchicon={<FontAwesome name="search" size={16} style={{color:'#01203fa1', opacity:0.5, paddingRight:15}} />}
                  placeholder="Browse by Alphabet"
                  dropdownTextStyles={[{color:'#fff', fontSize:14, opacity:0.8}, themeTextStyle]}
                  dropdownStyles={{color:'#fff'}}
                  arrowicon={<FontAwesome name="chevron-down" style={{paddingTop:7}} size={12} color={'#00000047'} />}
                  setSelected={setSelected}  data={alphabet} search={true}
                  onSelect={(e) => alphabetSelect(selected)}
                />
              </View>

              {/* {alphabet.map((data) => {
               return(
                <View style={Style.alphabetContainer}>
                  <Text style={Style.alphabetLetter} key={data}>{data} </Text>
                </View>
               )
             })} */}
             {/* <View style={Style.searchByAlphabet}>
                <SelectList
                     inputStyles={{color:'#fff'}} boxStyles={{borderWidth:1, borderRadius:0, borderColor:'#315492', height:50, backgroundColor:'#FFFFFF10',}}
                     searchicon={{color:'#fff'}}
                     dropdownTextStyles={{color:'#ffffff70'}}
                     placeholder="Search by Alphabet"
                     arrowicon={<FontAwesome name="chevron-down" style={{paddingTop:3}} size={12} color={'#ffffff70'} />}
                     setSelected={setSelected}
                     data={alphabet} search={false}
                     onSelect={(e) => alphabetSelect(selected)}
                  />
                </View> */}


                <FlatList
              data={symbol}
              keyExtractor={(data, index) => index.toString()}
              onEndReachedThreshold={0.5}
              renderItem={(data) => {
                return(
                  <View style={[CommonStyle.paddingHorizontal20]}>

                    {data.item.symbolName ?
                  <View style={{borderBottomColor:'#ffffff30', borderBottomWidth:1, paddingBottom:20, marginBottom:20}}>

                  <Text style={[{color:'#fff', fontSize:20, paddingBottom:10}, themeTextStyle]}>{data.item.symbolName} </Text>
                  <Text style={{color:'#ffffff98', paddingRight:10, textAlign:'justify', lineHeight:22}}>{data.item.symbolDesc} </Text>
                  </View>
                  :

                  <Text>   </Text>
                      }

                  </View>
                )
              }}
              />


        
        </View>
        </>
    )
}

export default GetSymbol