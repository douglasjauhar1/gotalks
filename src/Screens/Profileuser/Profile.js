import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native'
import Iconaa from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            avatar: 'ttps://image.flaticon.com/icons/png/512/147/147144.png',
            uid: ''
        }

    }

    goEdit = () => {
        this.props.navigation.navigate('editprofile')
    }

    componentDidMount() {
        const { displayName, email, photoURL, uid } = auth().currentUser
        this.setState({ name: displayName, email, avatar: photoURL, uid })
    }


    signOutUser = async () => {
        try {
            database()
                .ref('users/' + this.state.uid)
                .update({ status: 'Offline' });
            auth().signOut();
            ToastAndroid.show('Logout success', ToastAndroid.SHORT);
        } catch (error) {
            this.setState({ errorMessage: error.message })
            ToastAndroid.show('Logout error', ToastAndroid.SHORT);
        }

    };

    render() {
        return (
            <View style={style.container}>
                <View style={style.topContent}>
                    <View style={style.AvatarContainer}>
                        <Image source={{ uri: this.state.avatar }} style={style.Avatar} />
                    </View>
                </View>
                <View style={style.dataUser}>
                    <TouchableOpacity style={{ marginLeft: 29, flexDirection: 'column', }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icons name="user" size={20} style={{ width: 20, height: 20, color: "#30A5E7" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Name : {this.state.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>  
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa name="email-box" size={20} style={{ width: 20, height: 20, color: "#30A5E7" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Email : {this.state.email}</Text>
                        </View> 
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }} onPress={this.goEdit}>
                        <View style={{ flexDirection: 'row' }}>
                            <IonIcon name="ios-options" size={20} style={{ width: 20, height: 20, color: "#30A5E7" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Settings</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={20} style={{ width: 20, height: 20, color: "#30A5E7" }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }} onPress={this.signOutUser}>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa name="logout" size={20} style={{ width: 20, height: 20, color: "#30A5E7" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Logout</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={20} style={{ width: 20, height: 20, color: "black" }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    Avatar: {
        width: null,
        height: null,
        resizeMode: "cover",
        flex: 1,
        borderRadius: 110
    },
    topContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    AvatarContainer: {
        width: 120,
        height: 120,
    },
    dataUser: {
        flex: 3,
        marginTop: 50,
    }
})

export default Profile