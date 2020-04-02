import React,{useState,useEffect, Component} from 'react';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';

import Test from './src/home/Home1';
import Goods from './src/goods/Goods';
import Login from './src/common/Login'

import SwiperPage from './src/common/SwiperPage';
import Register from './src/common/Register';
import Me from './src/Me/Me';
import Publish from './src/Me/Publish';

import {StyleSheet,View,Text, Image, 
	BackHandler,ToastAndroid,AsyncStorage
} from 'react-native';



console.disableYellowBox = true;

export default class App extends Component{
	constructor(){
		super();
		this.state = {
			isLogin:true,
			isInstall:true
		}
	}

	componentDidMount(){
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			console.log('isinstall',res)
			if(res){
				this.setState({
					isInstall:false
				})
				// setInstall(false);
			}
		})
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				this.setState({
					isLogin:false
				})
				SplashScreen.hide();
			}
		})
	}

	afterInstall = ()=>{
		console.log('after install')
		this.setState({
			isInstall:false
		})
	}
	
	render(){
		var now = 0;
		if(this.state.isInstall){
			return <View style={{flex:1}}>
				<SwiperPage afterInstall={this.afterInstall}/>
			</View>
		}
		return(
			<Router hideNavBar
				backAndroidHandler={()=>{	
					if(Actions.currentScene == 'login' || Actions.currentScene == null){
						if(new Date().getTime()-now<2000){
							BackHandler.exitApp();
						}else{
							ToastAndroid.show('确定要退出吗',100);
							now = new Date().getTime();
							return true;
						}
					}
					else if(Actions.currentScene != 'home'){
						Actions.pop();
						return true;
					}
					else{
						if(new Date().getTime()-now<2000){
							BackHandler.exitApp();
						}else{
							ToastAndroid.show('确定要退出吗',100);
							now = new Date().getTime();
							return true;
						}
					}
				}}
			>
				<Scene key="root">
					<Tabs 
						key='tabbar'
						hideNavBar
						activeTintColor="red"
						inactiveTintColor="blue"
						tabBarStyle={{backgroundColor:'#white'}}
					>
						{/* 首页 */}
						<Scene key='homePage'
							hideNavBar
							title='首页'
							icon={
								({focused})=><Icon 
									color={focused?'red':'blue'} 
									name="home"
								/>
							}
						>
							<Scene key='home' 
								component={Test}
							/>
						</Scene>
						{/* 商品分类 */}
						<Scene key='goodsPage'
							title='商品分类'
							hideNavBar
							icon={
								({focused})=><Icon 
									color={focused?'red':'blue'} 
									name="file"
								/>
							}
							
						>
							<Scene key="goods" component={Goods}/>
						</Scene>
						{/* 用户中心 */}
						<Scene 
							key='me'
							hideDrawerButton
							hideNavBar
							icon={({focused})=>
								<Icon 
									color={focused?'red':'blue'} 
									name='file'/>
								}
							title="用户中心"
						>
							<Scene key="me" component={Me}/>
						</Scene>
					</Tabs>
					<Scene initial={this.state.isLogin} key="login" component={Login} hideNavBar/>
					<Scene key="register" component={Register} hideNavBar/>
					<Scene key="publish" 
							component={Publish} 
							hideNavBar
					/>
				</Scene>
		</Router>
		)
	}
}

