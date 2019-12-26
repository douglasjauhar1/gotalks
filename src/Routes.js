import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Image, View} from 'react-native'
import Color from '../public/Style/Color'

import Appnavigator from './Appnavigator'
import Home from './Screens/Home/Home'
import Friends from './Screens/Friendlist/Friends'
import Profile from './Screens/Profileuser/Profile'
import Landing from './Screens/Landing/Landing'
import Register from './Screens/Register/Register'
import Login from './Screens/Login/Login'
import Loading from './Components/Loading/Loading'
import Chat from './Screens/Chat/Chat'
import { Text } from 'native-base';


const AppStack = createStackNavigator({

    home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    chat : {
        screen :  Chat,
        navigationOptions:{
            header : null,
        }
    },
    Apps: {
        screen: Appnavigator,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Color.primary,
                elevation: 0
            },
            headerTitle: (
                <View style={{  
                width:250,
                height:45,
                flexDirection: 'row',
                alignItems:'center'}}>
                <Image source={{uri : 'https://i.imgur.com/zJN8o6q.png'}}
                resizeMode="cover"
                    style={{width : 50, height : 50, left : 20, resizeMode : 'contain', alignSelf : 'center'}}
                />
                <Text style={{left : 20,color : '#30A5E7', fontWeight : 'bold'}}>GoTalk App</Text>
                </View>
            ),
       headerRight : <View/>
        }
    },

}, {
    initialRouteName: 'Apps',
})

const AuthStack = createStackNavigator({

    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    regis: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    landing: {
        screen: Landing,
        navigationOptions: {
            header: null
        }
    },
}, {
    initialRouteName: 'landing'
})
const Routes = createAppContainer(createSwitchNavigator({

    Auth: {
        screen: AuthStack
    },
    App: {
        screen: AppStack
    },
    LoadScreen: {
        screen: Loading
    }
}, {
    initialRouteName: 'LoadScreen',
    headerMode: 'none'
}))


export default Routes