import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import Color from './public/Style/Color'
import Routes from './src/Routes'
import AppNavigator from './src/Appnavigator'

export class App extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor={Color.indicator} barStyle="light-content" />
       <Routes/>
       {/* <AppNavigator/> */}
      </>
    )
  }
}

export default App