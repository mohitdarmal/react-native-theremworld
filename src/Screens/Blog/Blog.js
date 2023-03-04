import React, {useEffect, useState} from "react";
import {Text, View, FlatList, ActivityIndicator, useColorScheme, Modal, useWindowDimensions, ScrollView} from "react-native";
import HeaderComp from "../../Components/HeaderComp";
import CommonStyle from "../ScreenCommonCss";
import NavigationStrings from "../../Constant/NavigationStrings";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
// import RenderHtml from 'react-native-render-html';
import { Rating, RatingInput } from 'react-native-stock-star-rating'
import Style from "./Style";


const Blog = ({navigation}) => { 

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? '' : CommonStyle.darkThemeText;
const themeContainerStyle =
  colorScheme === 'light' ? CommonStyle.lightContainer : CommonStyle.darkContainer;


  const isUserID = useSelector((state) => state.isSignIn.token);
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [singleBlogData, setSingleBlogData] = useState([]);
  const [modalSuccesVisible, setSuccesModalVisible] = useState(false);
  const [rating,setRating] = React.useState(0);
  const [postRating, setPostRating] = useState({
    idPost: 2,
    idUser: isUserID,
    rating: rating
  })
 
  useEffect(() => {
    getBlog();    
  }, [])



  const getBlog = () => {
    axios.get(`${NavigationStrings.BASE_URL}getPosts.php`, {
      params : {userRole:"user", idUser: isUserID}
    }).then((res) => {
      if(res.data.status == true){
        setBlog(res.data.data);
        console.log(res.data.data, "blog data")
        setIsLoading(false);
      }
      else{
        alert(res.data.message);
      }
    })
  }

  const closeSingleBlog = () => {
    setSuccesModalVisible(false);
  }

  const savePostRating = (rate, postId) => {
    console.log(rate, postId, "rate")
    axios.post(`${NavigationStrings.BASE_URL}updatePostRating.php`,
        JSON.stringify({
            idPost: postId,
            idUser: isUserID,
            rating: rate
        })
        ).then((res) => {
            console.log(res.data)
        
    })
     
  }

  const { width } = useWindowDimensions();
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



           {/* Success Modal */}
           <Modal
                  animationType="slide"
                  animationOut="slideOutDown"
                  transparent={true}
                  visible={modalSuccesVisible}
                  onRequestClose={() => {
                     setSuccesModalVisible(!modalSuccesVisible);
                  }}
               >
                  <View style={[themeContainerStyle, Style.popupContainer]}>
                     <Text style={Style.singBlogCloseBtn} onPress={() => setSuccesModalVisible(false)}> <AntDesign  name="closecircle" size={24}  /> </Text>
                                           
                            <View  style={[Style.symbolContainer, {width:'85%', }]}>                                    
                            <Text style={[Style.popupTitle, themeTextStyle]}>{singleBlogData.title}</Text>
                                    <ScrollView style={{paddingBottom:30, marginBottom:50,}}>                                      
                                       {/* <Text style={[Style.popupDesc, themeTextStyle]}>{singleBlogData.description}</Text> */}
                                     {/*   <RenderHtml                                       
                                            contentWidth={width}
                                            source={{html: singleBlogData.description}}
                                        /> */}
                                    </ScrollView>

                               </View>

                           
                            </View>
                        </Modal>
                 {/* Success Modal */}

           
          <HeaderComp toggleBtn title="Blog"/>
 

           

                <FlatList
              data={blog}
              keyExtractor={(data, index) => index.toString()}
              onEndReachedThreshold={0.5}
              renderItem={(data) => {
                return(
                  <View style={[CommonStyle.paddingHorizontal20, {marginTop:20}]}>

                    {data.item.postTitle ?
                  <View style={{borderBottomColor:'#ffffff30', borderBottomWidth:1, paddingBottom:20, marginBottom:20}}>

                  <Text style={[Style.title, themeTextStyle]}>{data.item.postTitle} </Text>
                  <Text style={[Style.blogDescr, themeTextStyle]} numberOfLines={5} >{data.item.postText.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                  <Text onPress={() => {
                    setSingleBlogData({
                        title:data.item.postTitle,
                        description:data.item.postText
                    })
                    setSuccesModalVisible(true)
                    }} 
                  style={Style.readMoreBtn}>Read More</Text>

                  <View style={Style.blogFooter}>
                    <Text style={Style.author}>By: theREMworld</Text>
                    <RatingInput rating={data.item.postRating} setRating={(rate) => savePostRating(rate, data.item.idPost)} maxStars={5} size={23}  />
                    <Text style={Style.author}>{data.item.postDate}</Text>
                  </View>
                  
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

export default Blog