import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react';
import {Icon} from 'native-base'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid , TouchableHighlight, Image} from 'react-native'
import {Button} from 'native-base'
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            visible: false,
            errorMessage: null,
            Onprosess: false
        }

        this.goBack = this.goBack.bind(this);
        // this.loginSubmit = this.loginSubmit.bind(this)
    }

    goBack() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };
    // loginSubmit = () => {
    //     this.setState({ Onprosess: true })
    //     const { email, password } = this.state
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then(res => {
    //             this.setState({ Onprosess: false })
    //         })
    //         .catch(err => {
    //             this.setState({
    //                 errorMessage: err.message,
    //                 visible: true
    //             }, () => this.hideToast())
    //         })
    // }

    handleLogin = () => {
        const {email, password} = this.state;
        if (email.length < 6) {
          ToastAndroid.show(
            'Please input a valid email address',
            ToastAndroid.LONG,
          );
        } else if (password.length < 6) {
          ToastAndroid.show(
            'Password must be at least 6 characters',
            ToastAndroid.LONG,
          );
        } else {
          database()
            .ref('users/')
            .orderByChild('/email')
            .equalTo(email)
            .once('value', result => {
              let data = result.val();
              if (data !== null) {
                let user = Object.values(data);
    
                AsyncStorage.setItem('user.email', user[0].email);
                AsyncStorage.setItem('user.name', user[0].name);
                AsyncStorage.setItem('user.photo', user[0].photo);
              }
            });
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async response => {
              console.log('resLoginEmail: ', response);
    
              database()
                .ref('/user/' + response.user.uid)
                .update({
                  status: 'Online',
                  latitude: this.state.latitude || null,
                  longitude: this.state.longitude || null,
                });
             
              await AsyncStorage.setItem('uid', response.user.uid);
              // await AsyncStorage.setItem('user', response.user);
              ToastAndroid.show('Login success', ToastAndroid.LONG);
             
            })
            .catch(error => {
              this.setState({
                errorMessage: error.message,
                email: '',
                password: '',
              });
              ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
            });
        }
      };
  render() {
    if (this.state.loding) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }
    return (
      <View style={styles.container}>
    
          <Image source={{uri : 'https://i.imgur.com/zJN8o6q.png'}} style={styles.logo}/>
        
      <View style={styles.inputContainer}>
      <Icon type="MaterialCommunityIcons" name="email" style={styles.inputIcon}/>
        <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={email => this.setState({ email })}/>
      </View>
      
      <View style={styles.inputContainer}>
      <Icon type="MaterialCommunityIcons" name="lock" style={styles.inputIcon}/>
        <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
      </View>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>
        <Text style={styles.loginText}>Login</Text>
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