import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const {width, scale} = Dimensions.get('window');
/** 450   2 */
const s = width / 640;

export default class Publish extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],  //所有数据
            currentData:[], //当前页面渲染的数据
            limit:13,  //一个页面渲染的数据量
            current:1,  //当前页码
            num:0, //页码变量
            totalNum:0, //总页码量
            random:[]
        }
    }

    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=50')
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    data:res.data,
                    totalNum:Math.ceil(res.data.length/this.state.limit),
                    currentData:res.data.slice(this.state.num,this.state.num+this.state.limit)
                });
            });
        
        
    }

    setNext = () => {
        console.log("下一页");
        if(this.state.current < this.state.totalNum){
            this.setState({
                num:this.state.num + this.state.limit,
                current:this.state.current + 1,
            },function(){
                this.setState({
                    currentData:this.state.data.slice(this.state.num,this.state.num + this.state.limit)
                })
            })
        }
    }

    setUp = () => {
        console.log("上一页");
        if(this.state.current > 1){
            this.setState({
                num:this.state.num - this.state.limit,
                current:this.state.current -1,
            },function(){
                this.setState({
                    currentData:this.state.data.slice(this.state.num,this.state.num + this.state.limit)
                })
            })
        }
        else{
            ToastAndroid.show("已经在第一页啦~",1000);
        }
    }

    render() {
        this.state.data.map((item)=>{
            if(item.title.length>15){
                item.title = item.title.slice(0,15)+'...'
            }
            item.create_at = item.create_at.slice(0,10)
        })
        return (
            <View>
                <View style={{width:'100%',height:50,backgroundColor:'red',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Text style={{color:'white',fontWeight:'bold',left:10,fontSize:16}}>返 回</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.c2}>
                    <FlatList
                        data={this.state.currentData}
                        numColumns={1}
                        renderItem={
                            ({item})=>{
                                var temp = Math.random();
                                if(temp>0.5){
                                    return(
                                        <View style={styles.c1}> 
                                            <Text style={styles.t3}>{item.title}</Text>
                                            <Text style={styles.t4}>{item.create_at}</Text>
                                            <Text style={styles.t5}>已恢复</Text>
                                        </View>
                                    )
                                }
                                else{
                                    return(
                                        <View style={styles.c1}> 
                                            <Text style={styles.t3}>{item.title}</Text>
                                            <Text style={styles.t4}>{item.create_at}</Text>
                                            <Text style={styles.t6}>待回复</Text>
                                        </View>
                                    )
                                }
                            }
                        }
                    />
                </View>
                <View style={styles.c3}>
                    <TouchableOpacity onPress={()=>this.setUp()}>
                        <View style={styles.c4}>
                            <Text style={styles.t1}>上一页</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <View style={styles.c6}>
                        <Text style={styles.t2}>第{this.state.current}页/共{this.state.totalNum}页</Text>
                    </View>

                    <TouchableOpacity  onPress={()=>this.setNext()}>
                        <View style={styles.c5}>
                            <Text style={styles.t1}>下一页</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    c1:{
        position:'relative',
        width:'100%',
        height:69*s,
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        flexDirection:'row'
    },
    c2:{
        width:'100%',
        height:899*s,
    },
    c3:{
        width:'100%',
        height:130*s,
        backgroundColor:'white',
        flexDirection:'row'      
    },
    c4:{
        width:150*s,
        height:60*s,
        backgroundColor:'red',
        justifyContent:'center',
        marginTop:40*s,
        marginLeft:40*s,
        borderRadius:50
    },
    c5:{
        width:150*s,
        height:60*s,
        backgroundColor:'red',
        justifyContent:'center',
        marginTop:40*s,
        marginLeft:20*s,
        borderRadius:50
    },
    c6:{
        width:150*s,
        height:100*s,
        marginLeft:70*s,
        flexDirection:'row',
        marginTop:30
    },
    t1:{
        color:'white',
        paddingLeft:35,
        fontWeight:'bold'
    },
    t2:{
        paddingTop:10,
        fontSize:15
    },
    t3:{
        color:'gray',
        paddingTop:17,
        paddingLeft:10
    },
    t4:{
        color:'gray',
        position:'absolute',
        left:300,
        top:20
    },
    t5:{
        position:'absolute',
        left:420,
        top:15,
        color:'gray'
    },
    t6:{
        position:'absolute',
        left:420,
        top:15,
        color:'red'
    }
})