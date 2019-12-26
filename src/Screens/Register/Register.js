import React, { Component } from 'react';
import {Icon} from 'native-base'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native'
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
        <View style={styles.circle}/>
       <View style={{ marginTop : 40}}>
       </View>
       <View style={{marginHorizontal : 32}}>
       <Text style={styles.header}>Register Page</Text>
       <Toast visible={this.state.visible} message={this.state.errorMessage} />
       <TextInput style={styles.input} placeholder="Name" onChangeText={name => this.setState({ name })}/>
           <TextInput style={styles.inputs} placeholder="Username" onChangeText={email => this.setState({ email })}/>
           <TextInput style={styles.inputs} placeholder="Password" secureTextEntry onChangeText={password => this.setState({ password })}/>
           <Button
          style={styles.btn} onPress={this.submitRegis}>
             <Text>Register Now</Text>
        </Button>
        <View>
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('login')}>
           <Text>
               Go Login
           </Text>
           </TouchableOpacity>
       </View>
       </View>
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
    container : {
        flex : 1,
        backgroundColor : '#304E6C'
    },
    circle : {
        width : 450,
        height : 450,
        borderRadius : 500/2,
        backgroundColor : '#fff',
        position : 'absolute',
        left : -120,
        top : -20
    }, 
    imgs : {
        height : 150,
        width : 150,
      
    }, 
    btn : {
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : '#1A73E8',
        borderRadius : 30,
        marginTop : 20,
        width : 210,
        alignItems : 'center',
        backgroundColor : '#fff',
        justifyContent : 'center',
        alignItems : 'center'
    },
    go : {
     textAlign :'center',
     color : 'red'   
    },
    header : {
        fontWeight : '700',
        fontSize : 24,
        color : '#304E6C',
        marginBottom : 130
    },
    input : {
        marginTop : -90,
        right : 20,
        height : 50,
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : '#1A73E8',
        borderRadius : 30,
        paddingHorizontal : 16,
        color : '#514E54',
        
    },
    inputs : {
        marginTop : 20,
        right : 20,
        height : 50,
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : '#1A73E8',
        borderRadius : 30,
        paddingHorizontal : 16,
        color : '#514E54',
      
    },
    input1 : {
        marginTop : -130,
        right : 20,
        height : 50,
        borderWidth : StyleSheet.hairlineWidth,
        borderColor : '#1A73E8',
        borderRadius : 30,
        paddingHorizontal : 16,
        color : '#514E54',
      
    },
    continue : {
        width : 70,
        height : 70,
        borderRadius : 70/2,
        backgroundColor : '#FCCA38',
        alignItems : 'center',
        justifyContent : 'center',
        bottom : 80
    }
})