import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,ToastAndroid} from 'react-native';

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:''
        }
    }

    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }

    register = () => {
        if(this.state.username != '' && this.state.pwd != ''){   
            ToastAndroid.show("正在注册...",1000); 
            setTimeout(()=>{
                fetch('https://www.fastmock.site/mock/aa557e608311fb1928d8f7e097308d9e/api/login',{
                    method:'POST',
                    headers:{
                        "Accept":'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        username:this.state.username,
                        pwd:this.state.pwd
                    })
                })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res);
                    ToastAndroid.show("注册成功",1000);
                    setTimeout(function(){
                        Actions.login()
                    },2000)
                })
            },1000)
            
        }
        else{
            ToastAndroid.show("注册失败",1000);
        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{width:'100%',height:50,backgroundColor:'red',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Text style={{color:'white',fontWeight:'bold',left:10,fontSize:16}}>返 回</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{alignItems:'center',top:300}}>
                    <View
                        style={{
                        width: '80%',
                        marginRight: 10,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red"/>
                        <TextInput placeholder="用户名" 
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View
                        style={{
                        width: '80%',
                        marginRight: 10,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red"/>
                        <TextInput 
                            onChangeText={this.pwdhandle}
                            placeholder="密码" 
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '80%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.register}>
                        <Text>注册</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}
