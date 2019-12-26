import React, { Component } from 'react';
import {Icon} from 'native-base'
import {Text, View, TextInput, TouchableHighlight, StyleSheet, ToastAndroid, Image} from 'react-native'
import {Button} from 'native-base'
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latitude: '',
            longitude: '',
            name: '',
            email: '',
            password: '',
            errorMessage: null,
            visible: false
        }
        this.goBack = this.goBack.bind(this)
        this.submitRegis = this.submitRegis.bind(this);
    }

    goBack() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    async componentDidMount() {
        try {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                this.setState({ latitude, longitude })
            },
            (error) => {
                this.setState({
                    errorMessage: "Check youre GPS",
                    visible: true
                }, () => {
                    this.hideToast()
                })
                return
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    } else {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    this.setState({ latitude, longitude })
                },
                (error) => {
                    this.setState({
                        errorMessage: "Check youre GPS",
                        visible: true
                    }, () => {
                        this.hideToast()
                    })
                    return
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
                    this.setState({
                        errorMessage: "location denied",
                        visible: true
                    }, () => {
                        this.hideToast()
                    })
                    return
                }
            }
        } catch (err) {
            this.setState({
                errorMessage: err,
                visible: true
            }, () => {
                this.hideToast()
            })
            return
        }
    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };

    submitRegis() {
        const { name, email, password } = this.state

        if (!name || !email || !password) {
            this.setState({
                errorMessage: "name, email and password isEmpty",
                visible: true
            }, () => {
                this.hideToast()
            })
            return
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                console.log(res)
                database().ref('/users/' + res.user.uid)
                    .set({
                        name: this.state.name,
                        status: 'Online',
                        email: this.state.email,
                        photo: 'https://image.flaticon.com/icons/png/512/147/147144.png',
                        latitude: this.state.latitude || null,
                        longitude: this.state.longitude || null,
                        id: res.user.uid,
                    })
                return res.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message,
                    visible: true
                }, () => {
                    this.hideToast()
                })
            })
    }
  render() {
    return (
        <View style={styles.container}>
                 <Image source={{uri : 'https://i.imgur.com/zJN8o6q.png'}} style={styles.logo}/>
                 <Toast visible={this.state.visible} message={this.state.errorMessage} />
        <View style={styles.inputContainer}>
        <Icon type="FontAwesome5" name="user-circle" style={styles.inputIcon}/>
         
          {/* <TextInput style={styles.input1}
              placeholder="Your Name"
              keyboardType="name"
              underlineColorAndroid='transparent'
              onChangeText={name => this.setState({ name })}/> */}
          <TextInput style={styles.inputs}
          placeholder="Your Name"
          keyboardType="name"
          underlineColorAndroid='transparent'
          onChangeText={name => this.setState({ name })}/>
        </View>
        
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
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.submitRegis}>
          <Text style={styles.loginText}>Register Now</Text>
        </TouchableHighlight>


        <TouchableHighlight style={styles.buttonContainer} onPress={()=>this.props.navigation.navigate('login')}>
            <Text>Login</Text>
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
    input1:{
        height:60,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
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