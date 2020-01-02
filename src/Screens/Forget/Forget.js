import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react';
import {Icon} from 'native-base'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid , TouchableHighlight, Image, Alert} from 'react-native'
import {Button} from 'native-base'
import { firebase } from '@react-native-firebase/auth';

export default class Forget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            errorMessage: null,
            Onprosess: false
        }

        // this.loginSubmit = this.loginSubmit.bind(this)
    }
    login = ()=>{
     this.props.navigation.navigate('login')
    }
    handleForget = async () => {
    const {email} = this.state;
    try {
    await  firebase
    .auth()
    .sendPasswordResetEmail(email)
    Alert.alert(
      'Email Sent',
      'Please Check Your Email',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    
  } catch (error) {
    actions.setFieldError('general', error.message)
  }
}
  
  render() {
    return (
      <View style={styles.container}>
          <Image source={require('../../../public/Asset/Image/goTalk.png')} style={styles.logo}/>
      <View style={styles.inputContainer}>
      <Icon type="MaterialCommunityIcons" name="email" style={styles.inputIcon}/>
        <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={email => this.setState({ email })}/>
      </View>
      
     
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleForget}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableHighlight>


      <TouchableHighlight style={styles.buttonContainer} onPress={()=>this.props.navigation.navigate('login')}>
          <Text>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonContainer} onPress={()=>this.props.navigation.navigate('regis')}>
          <Text>Register</Text>
      </TouchableHighlight>
    </View>
    );
  }
}

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            1,
            800,
        );
        return null;
    }
    return null;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  logo :{
    width : 140,
    height : 150
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center',
    color : '#30A5E7',
    fontSize : 28
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});