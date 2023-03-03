import React, {useEffect, useState} from "react";
import {Text, View, FlatList, TouchableOpacity, ActivityIndicator, useColorScheme} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import HeaderComp from "../../Components/HeaderComp";
import ImagePath from "../../Constant/ImagePath";
import CommonStyle from "../ScreenCommonCss";
import NavigationStrings from "../../Constant/NavigationStrings";
import Fontisto from "react-native-vector-icons/Fontisto";
import Style from "./Style";
import axios from "axios";
import * as Progress from 'react-native-progress';
import { useDispatch, useSelector } from "react-redux";


const QodBox = ({navigation}) => {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;


  const isUserID = useSelector((state) => state.isSignIn.token);
  const [getQuestion, setGetQuestion] = useState({
    idQOTD : '',
    qotdPrompt : '',
    qotdQuestion : '',
  });
  const [getAnswer, setGetAnswer] = useState();
  const [saveAnswer, setSaveAnswer] = useState({
    selectedAns: 0,
    qotd: [],
    qotdResults: [],
    showResults: false,

  });
  const [ansPercentage, setAnsPercentage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQod();
  }, [])

  const getQod = () => {
    axios.get(`${NavigationStrings.BASE_URL}getQOTD.php`).then((res) => {
        setGetQuestion({
            idQOTD : res.data.data.idQOTD,
            qotdPrompt : res.data.data.qotdPrompt,
            qotdQuestion : res.data.data.qotdQuestion,
        })
        setGetAnswer(res.data.data.qotdAns)
        setIsLoading(false);
    }).catch((err) => {
        console.log(err);
    })
  }

  const saveAnswerList = (e, id) => {
    setSaveAnswer(() => ({...saveAnswer, showResults: e.target.textContent, selectedAns:id}))
  }

  const saveQotd = () => {
    setIsLoading(true);
    if (saveAnswer.selectedAns == 0) {
       alert("Please select an answer");
      } else {
        //Update the answer in database
        axios.get(`${NavigationStrings.BASE_URL}saveQOTDResponse.php`, {
          params: {qID: getQuestion.idQOTD, aID: saveAnswer.selectedAns}
        }).then((res) => {
            if (res.data.status == true) {
              console.log(res.data.data, "answer")
                setAnsPercentage(res.data.data.qotdAnswer)
                setIsLoading(false);
            } else {
               alert("error");
            }
        }).catch((error) => {
              alert("Error - " + error);
        });

      }
  }



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

        
             <HeaderComp toggleBtn title="Question of the Day"/>
             <ScrollView >

              <View style={[CommonStyle.paddingHorizontal20, {borderBottomWidth: 0.5, borderColor:'#bebebe',}]}>
                    <Text style={[Style.quesntion, themeTextStyle]}>{getQuestion.qotdPrompt.replace(/<\/?[^>]+(>|$)/g, "")} </Text>                   
             </View>
             

             <Text style={[Style.quesntionAsk, themeTextStyle]}>Q. {getQuestion.qotdQuestion } </Text>

             {ansPercentage
             ?
             <FlatList
                    data={ansPercentage}
                    keyExtractor={data => data.ansText}
                    renderItem={(data) => {
                       var count = parseFloat(`0.${data.item.ansCount}`);
                       var countNumber = parseInt(`${data.item.ansCount}`);
                    return(
                    <View>
                            {/* Progress Bar List */}
                            <View style={CommonStyle.paddingHorizontal20}>
                                <Text style={[Style.progressBarCount, themeTextStyle]}>
                                <Text style={[{color:'#fff', fontWeight:'bold'}, themeTextStyle]}>{countNumber}%</Text>  {data.item.ansText }
                                </Text>
                                <Text>
                                    <Progress.Bar style={Style.progressBar} borderColor="#fff"  unfilledColor="#8A8A8A15" progress={count}  width={350} />
                                </Text>
                            </View>
                        {/* Progress Bar List */}
                    </View>
                        )
                    }}
                />
             :
                <FlatList
                    data={getAnswer}
                    keyExtractor={data => data.ansText}
                    renderItem={(data) => {
                    return(
                    <View>
                            {/* Answer List */}
                            <View style={CommonStyle.paddingHorizontal20}>
                                <Text
                                    onPress={(e) => saveAnswerList(e, data.item.idAnswer)}
                                    style={data.item.idAnswer == saveAnswer.selectedAns ? Style.radionBtnTxtActive : Style.radionBtnTxt}>
                                    <Fontisto name={data.item.idAnswer == saveAnswer.selectedAns ? 'radio-btn-active' : 'radio-btn-passive'} size={17}  />  {data.item.ansText} 
                                </Text>
                            </View>
                        {/* Answer List */}
                    </View>

                        )
                    }}
                />
            }


        {/* Save QOTD */}
        {
          ansPercentage
          ?
          <View style={CommonStyle.paddingHorizontal20}>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationStrings.ADD_YOUR_DREAM)} style={Style.saveQotdBtn}>
              <Text style={Style.saveQotdBtnTxt}> Add Your Dream </Text>
          </TouchableOpacity>
      </View>
      :
      <View style={CommonStyle.paddingHorizontal20}>
      <TouchableOpacity onPress={saveQotd} style={Style.saveQotdBtn}>
          <Text style={Style.saveQotdBtnTxt}> Submit </Text>
      </TouchableOpacity>
  </View>
        }

        {/* Save QOTD */}
        </ScrollView>
        
        </View>
        </>
    )
}

export default QodBox