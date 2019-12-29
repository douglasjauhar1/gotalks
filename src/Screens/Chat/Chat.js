import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import {
  GiftedChat,
  Send,
} from 'react-native-gifted-chat';
import Color from '../../../public/Style/Color'
import AsyncStorage from '@react-native-community/async-storage';
import {Bubble, } from 'react-native-gifted-chat';
import database, {firebase} from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Chat extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <TouchableOpacity onPress={()=> navigation.navigate('friend', {item:navigation.getParam('item')})}><View style={{flexDirection:'row',alignItems:'center'}}><View><Image source={{uri:navigation.getParam('item').photo}} style={{width:45, height:45,borderRadius: 100, overflow:'hidden', marginRight:10, backgroundColor:Color.darkprimary}} /></View><View><Text style={{fontSize:18, fontWeight:'bold', color:'black',}}>{navigation.getParam('item').name}</Text><Text>{navigation.getParam('item').status}</Text></View></View></TouchableOpacity>,
      headerStyle: {
        backgroundColor: Color.primary,
    },
    };
  };

  
  state = {
    message: '',
    messageList: [],
    person: this.props.navigation.getParam('item'),
    userId: AsyncStorage.getItem('uid'),
    userName: AsyncStorage.getItem('user.name'),
    userAvatar: AsyncStorage.getItem('user.photo'),
  };

  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.person.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.userAvatar,
        },
      };
      updates[
        'messages/' +
          this.state.userId +
          '/' +
          this.state.person.id +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.id +
          '/' +
          this.state.userId +
          '/' +
          msgId
      ] = message;
      firebase.database()
        .ref()
        .update(updates);
      this.setState({message: ''});
    }
  };

  componentDidMount = async () => {
        
    const userId = await AsyncStorage.getItem('uid');
    const userName = await AsyncStorage.getItem('user.name');
    const userAvatar = await AsyncStorage.getItem('user.photo');
    this.setState({userId, userName, userAvatar});
    database()
      .ref('messages')
      .child(this.state.userId)
      .child(this.state.person.id)
      .on('child_added', val => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(previousState.messageList, val.val()),
        }));
      });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Color.secondary,
          },
        }}
        textStyle={{
            right: {
          color: Color.primary,
        }
        
      }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 20,
            marginBottom: 5,
          }}>
          <Ionicons name='ios-paper-plane' size={35} color={Color.secondary} />
        </View>
      </Send>
    );
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" style={{backgroundColor : '#30A5E7'}}></StatusBar>
       
        <GiftedChat
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
          text={this.state.message}
          onInputTextChanged={val => {
            this.setState({message: val});
          }}
          messages={this.state.messageList}
          onSend={() => this.onSend()}
          user={{
            _id: this.state.userId,
          }}
        />
      </View>
    );
  }
}