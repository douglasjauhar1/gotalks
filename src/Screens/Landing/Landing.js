import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Image, Text, TouchableHighlight } from 'react-native'
import Color from '../../../public/Style/Color';
import { Button } from 'native-base';

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.goLogin = this.goLogin.bind(this);
        this.goRegis = this.goRegis.bind(this);
    }


    goLogin() {
        this.props.navigation.navigate('login')
    }
    goRegis() {
        this.props.navigation.navigate('regis')
    }

    render() {
        return (
            <View style={style.container}>
                <StatusBar backgroundColor={Color.primary} barStyle="light-content" />
                <View style={style.topContent}>
                    <View style={style.imgContainer}>
                        <Image style={style.img} source={require('../../../public/Asset/Image/goTalk.png')} />
                    </View>
                </View>
                <View style={style.bottomContent}>
                    <Button style={style.btnLogin} onPress={this.goLogin}>
                        <Text style={style.Text2}>Login</Text>
                    </Button>
                    <Button style={style.btnLogin2} onPress={this.goRegis}>
                        <Text style={style.Text}>Register</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Color.primary
    },
    Text: {
        color: Color.TextLight
    },
    topContent: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 400,
        height: 200,
        flex: 0,
        resizeMode: "contain"
    },
    imgContainer: {
        width: 400,
        height: 80,
        justifyContent: 'center',
    },
    btnLogin: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLogin2: {
        width: 300,
        backgroundColor: Color.secondary,
        borderRadius: 5,
        height : 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    Text2: {
        color: Color.secondary,
        fontFamily: 'Roboto-Bold'
    }
})

export default Landing