import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react';
import {Icon} from 'native-base'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native'
import {Button} from 'native-base'
import { firebase } from '@react-native-firebase/auth';


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
        this.loginSubmit = this.loginSubmit.bind(this)
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



    loginSubmit = () => {
        this.setState({ Onprosess: true })
        const { email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                this.setState({ Onprosess: false })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message,
                    visible: true
                }, () => this.hideToast())
            })
    }

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
        <View style={styles.circle}/>
       <View style={{ marginTop : 40}}>
       </View>
       <View style={{marginHorizontal : 32}}>
       <Text style={styles.header}>Login Page</Text>
       <TextInput style={styles.input} placeholder="Email"onChangeText={email => this.setState({ email })} />
           <TextInput style={styles.inputs} placeholder="Password" secureTextEntry onChangeText={password => this.setState({ password })}/>
           <Button
          style={styles.btn}>
              <Icon type="FontAwesome5" name="google" style={{color : '#304E6C', fontWeight : 600}}/>
             <Text>Signin With Google</Text>
        </Button>
       <View>
           <TouchableOpacity onPress={()=>this.props.navigation.navigate('register')}>
           <Text>
               Don't Have Account ? Register Here
           </Text>
           </TouchableOpacity>
       </View>
       <View style={{alignItems : 'flex-end', marginTop : 64}}>
           <TouchableOpacity style={styles.continue} onPress={this.loginSubmit}>
           <Icon type="MaterialIcons" name="arrow-forward" style={{color : '#4A3014', fontWeight : 600}}/>
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