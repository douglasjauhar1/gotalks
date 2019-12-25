import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'

import Home from './Screens/Home/Home'
import Friends from './Screens/Friendlist/Friends'
import Profile from './Screens/Profileuser/Profile'

const tabNavigate = createMaterialTopTabNavigator({

    home: {
        screen: Home,
        navigationOptions: {
            title: 'Home'
        }
    },
    friends: {
        screen: Friends,
        navigationOptions: {
            title: 'Friends'
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile'
        }
    }

}, {
    initialLayout: 'home',
    initialRouteName : 'friends',
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#25594A',
        },
        indicatorStyle: {
            backgroundColor: 'white'
        },
        labelStyle: {
            fontFamily: 'Roboto-Bold',
            fontSize: 14
        }
    }
})

const AppNavigator = createAppContainer(tabNavigate)


export default AppNavigator