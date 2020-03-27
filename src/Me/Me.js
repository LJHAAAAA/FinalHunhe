import React,{Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,	
    View, 
    Text, 
    StatusBar,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-picker';




const {width, scale} = Dimensions.get('window');
/** 450   2 */
const s = width / 640;

const content1 = [
    {
        title:'账户管理',
        img:require('../img/11.png')
    },
    {
        title:'收获地址',
        img:require('../img/12.png')
    },
    {
        title:'我的信息',
        img:require('../img/13.png')
    },
    {
        title:'我的订单',
        img:require('../img/14.png')
    },
    {
        title:'我的二维码',
        img:require('../img/15.png')
    },
    {
        title:'我的积分',
        img:require('../img/16.png')
    },
    {
        title:'我的收藏',
        img:require('../img/17.png')
    }
]
const content2 = [
    {
        title:'居家维修保养',
        img:require('../img/19.png')
    },
    {
        title:'出行接送',
        img:require('../img/20.png')
    },
    {
        title:'我的受赠人',
        img:require('../img/21.png')
    },
] 
const content3 = [
    {
        title:'我的住宿优惠',
        img:require('../img/22.png')
    },
    {
        title:'我的活动',
        img:require('../img/23.png')
    },
]

export default class Me extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatarSource: require('../img/9.png')
        };
    }

    back = () => {
        AsyncStorage.clear();
        Actions.login();
    }

    componentDidMount(){
        AsyncStorage.getItem('uri')
        .then((res)=>{
            if(res){
                let temp = {uri:res}
                this.setState({
                    avatarSource:temp
                })
                console.log(this.state.avatarSource);
            }
        })
    }

    //选择图片设置属性
    selectPhotoTapped() {
        const options = {
            title: '选择图片', 
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', 
            chooseFromLibraryButtonTitle: '选择照片', 
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high', 
            durationLimit: 10, 
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8, 
            angle: 0,
            rotation:90,
            allowsEditing: false, 
            noData: false,
            storageOptions: {
                skipBackup: true  
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // console.log(source);
                this.setState({
                    avatarSource: source
                });
                AsyncStorage.setItem('uri',response.uri,
                    ()=>{console.log("store success");}
                );
            }
        });
    }

    render() {
        console.log(this.state.avatarSource);
        return (
            <View style={{backgroundColor:'#eee',flex:1}}>
                <StatusBar backgroundColor='##f23030' />
                {/* 顶部 */}
                <View style={{
                    backgroundColor:'#f23030',
                    width:'100%',
                    height:260*s,
                    alignContent:'center',
                    justifyContent:'center'
                }}>


                    <TouchableOpacity onPress={()=>this.selectPhotoTapped()}>
                        <Image source={this.state.avatarSource} style={{width:170*s,height:170*s,marginLeft:220*s,marginTop:-30*s,borderRadius:100}}/>
                    </TouchableOpacity>



                    <Text style={{color:'white',fontSize:18,fontWeight:'bold',paddingLeft:210*s,paddingTop:20*s}}>BINNU DHILLON</Text>
                </View>

                {/* 内容一 */}
                <View style={styles.c1}>
                    <View style={styles.c11}>
                        <Image source={require('../img/10.png')} style={{width:60*s,height:60*s,marginTop:10*s}}/>
                        <Text style={{color:'#8a8989',paddingTop:23*s,fontSize:16}}>我的个人中心</Text>
                    </View>
                    <View style={styles.c12}></View>
                    <FlatList
                        data={content1}
                        numColumns={3}
                        renderItem={
                            ({item})=>(
                                <View style={styles.c13}> 
                                    <Image source={item.img} style={styles.c14}/>
                                    <Text style={styles.c15}>{item.title}</Text>
                                </View>
                            )
                        }
                    />
                </View>
                <View style={{width:'100%',height:8*s,backgroundColor:'#eee'}}></View>
                {/* 内容二 */}
                <View style={styles.c2}>
                    <View style={styles.c11}>
                        <Image source={require('../img/18.png')} style={{width:60*s,height:60*s,marginTop:0*s}}/>
                        <Text style={{color:'#8a8989',paddingTop:15*s,fontSize:16}}>E族活动</Text>
                    </View>
                    <View style={styles.c12}></View>
                    <FlatList
                        data={content2}
                        numColumns={3}
                        renderItem={
                            ({item})=>(
                                <View style={styles.c13}> 
                                    <Image source={item.img} style={styles.c14}/>
                                    <Text style={styles.c15}>{item.title}</Text>
                                </View>
                            )
                        }
                    />
                </View>
                {/* 内容三 */}
                <View style={{flexDirection:'row'}}>
                    <View style={styles.q1}>
                        <Image source={require('../img/22.png')} style={{width:60*s,height:60*s}}/>
                        <Text style={{color:'#4f4e4e',marginLeft:-20*s,paddingTop:10*s}}>我的住宿优惠</Text>
                    </View>
                    <View style={styles.q1}>
                        <Image source={require('../img/23.png')} style={{width:60*s,height:60*s}}/>
                        <Text style={{color:'#4f4e4e',marginLeft:-10*s,paddingTop:10*s}}>我的活动</Text>
                    </View>
                    <View style={styles.q2}>
                        <TouchableOpacity onPress={()=>Actions.publish()}>
                            <Image source={require('../img/24.png')} style={{width:60*s,height:60*s}}/>
                            <Text style={{color:'#4f4e4e',marginLeft:-10*s,paddingTop:10*s}}>我的发布</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableOpacity onPress={this.back}>
                    <View style={styles.back}>
                        <Text style={{color:'white'}}>退出</Text>
                    </View>
                </TouchableOpacity>
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    c1:{
        backgroundColor:'white',
        width:'100%',
        height:400*s
    },
    c11:{
        width:'100%',
        height:65*s,
        flexDirection:'row'
    },
    c12:{
        width:"100%",
        height:1*s,
        backgroundColor:'gray'
    },
    c13:{
        width:"30%",
        height:100*s,
        // backgroundColor:'black',
        marginLeft:15*s,
        marginTop:10*s
    },
    c14:{
        width:60*s,
        height:60*s,
        marginLeft:65*s
    },
    c15:{
        color:'#4f4e4e',
        paddingLeft:55*s,
        paddingTop:6*s
    },
    c2:{
        width:'100%',
        height:170*s,
        backgroundColor:'white',
        // flexDirection:'row'
    },
    c3:{
        width:'60%',
        height:100*s,
        backgroundColor:'red'
    },
    q1:{
        width:'32%',
        height:120*s,
        backgroundColor:'white',
        paddingLeft:80*s,
        paddingTop:20*s
    },
    q2:{
        width:'36%',
        height:120*s,
        backgroundColor:'white',
        paddingLeft:80*s,
        paddingTop:20*s
    },
    back:{
        width:100,
        height:30,
        backgroundColor:'red',
        top:15,
        left:190,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    }

})