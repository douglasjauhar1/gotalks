import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { firebase } from '@react-native-firebase/auth';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        const { displayName } = firebase.auth().currentUser;
        this.setState({ name: displayName })
    }
    render() {
        return (
        <View>
            <Text>Welcome {this.state.name}</Text>
        </View>
        )
    }
}
