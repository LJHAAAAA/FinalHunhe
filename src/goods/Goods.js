import React,{Component} from 'react';
import {
    StyleSheet,	
    View, 
    Text, 
    StatusBar,
    Dimensions,
    TextInput,
    // ImageBackground,
    Image,
    FlatList
} from 'react-native';
// import { Icon } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';

const {width, scale} = Dimensions.get('window');
/** 450   2 */
const s = width / 640;

const content = [
    {
        title:'居家维修保养',
        img:require('../img/4.png')
    },
    {
        title:'住宿优惠',
        img:require('../img/5.png')
    },
    {
        title:'出行接送',
        img:require('../img/6.png')
    },
    {
        title:'E族活动',
        img:require('../img/7.png')
    }
]

export default class Goods extends Component {
    render() {
        return (
            <View style={{backgroundColor:'#eee',flex:1}}>
                <StatusBar backgroundColor='##f23030' />
                {/* 顶部 */}
                <View style={styles.header}>
                    <View style={styles.search}>
                        <Icon name='search1' size={25}  style={{
                            color:'white',
                            paddingLeft:17
                            
                        }}/>
                        <TextInput
                            placeholder='请输入您要搜索的关键字'
                            placeholderTextColor='white'
                            style={{
                                fontSize:15
                            }}
                        />
                    </View>
                    <Icon name='shoppingcart' size={30} style={{
                        color:'white',
                        left:20
                    }}/>
                </View>
                {/* 轮播 */}
                <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}>
                    <View style={styles.slide1}>
                        <Image source={require('../img/3.png')} style={{width:'100%',height:275*s}}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image source={require('../img/3.png')} style={{width:'100%',height:275*s}}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image source={require('../img/3.png')} style={{width:'100%',height:275*s}}/>
                    </View>
                </Swiper> 
                {/* 内容 */}
                <View style={{
                    width:'100%',
                    height:521*s,
                    top:-160*s
                }}>
                    <FlatList
                        data={content}
                        numColumns={1}
                        renderItem={
                            ({item})=>(
                                <View style={styles.content}>
                                    <Image 
                                        resizeMode='contain'
                                        source={item.img}
                                        style={{
                                            height:80*s,
                                            width:80*s
                                        }}
                                    />
                                    <Text style={{
                                        paddingLeft:80*s,
                                        paddingTop:30*s,
                                        color:'#9a9a9a',
                                        fontSize:18
                                    }}>{item.title}</Text>
                                    <Image source={require('../img/8.png')} style={{position:'absolute',left:580*s,top:35*s,paddingTop:50*s}}/>
                                </View>
                            )
                        }
                    />
                </View>

                <View style={styles.bot}>
                    <Text style={{paddingTop:16*s,fontSize:16}}>发布需求</Text>
                </View>               
                
                <Text style={{position:'absolute',left:200*s,top:980*s}}>@E族之家 版权所有</Text> 
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        height:81*s,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f23030',
        flexDirection:'row'
    },
    search:{
        width:527*s,
        height:50*s,
        backgroundColor:'rgba(255,255,255,0.6)',
        borderRadius:30,
        marginLeft:-20,
        color:'white',
        flexDirection:'row',
        alignItems:'center'
    },
    wrapper:{
        height:275*s
    },
    slide1:{
        width:'100%',
        height:230*s,
    },
    content:{
        width:'100%',
        height:110*s,
        backgroundColor:'white',
        paddingLeft:20*s,
        paddingTop:10*s,
        marginTop:10*s,
        flexDirection:'row'
        // alignItems:'center',
        // justifyContent:'center'
    },
    bot:{
        width:540*s,
        height:60*s,
        backgroundColor:'red',
        borderRadius:10,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        position:'absolute',
        top:870*s,
        left:40*s
    }
})