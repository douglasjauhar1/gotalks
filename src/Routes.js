import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Color from '../public/Style/Color'

import Appnavigator from './Appnavigator'
import Home from './Screens/Home/Home'
import Friends from './Screens/Friendlist/Friends'
import Profile from './Screens/Profileuser/Profile'
import Landing from './Screens/Landing/Landing'
import Register from './Screens/Register/Register'
import Login from './Screens/Login/Login'


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
    Apps: {
        screen: Appnavigator,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Color.primary,
                elevation: 0
            },
            headerTitle: 'Whatsip',
            headerTitleStyle: {
                color: 'white',
                fontFamily: 'Roboto-Bold',
                fontSize: 18
            }
        }
    },

}, {
    initialRouteName: 'Apps',
})

// const AuthStack = createStackNavigator({

//     login: {
//         screen: Login,
//         navigationOptions: {
//             header: null
//         }
//     },
//     regis: {
//         screen: Register,
//         navigationOptions: {
//             header: null
//         }
//     },
//     landing: {
//         screen: Landing,
//         navigationOptions: {
//             header: null
//         }
//     },
// }, {
//     initialRouteName: 'landing'
// })
const Routes = createAppContainer(createSwitchNavigator({

    // Auth: {
    //     screen: AuthStack
    // },
    App: {
        screen: AppStack
    },
    // LoadScreen: {
    //     screen: Loading
    // }
}, {
    initialRouteName: 'App',
    headerMode: 'none'
}))


export default Routes