import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import Color from '../../../public/Style/Color';
import Icon from 'react-native-vector-icons/Ionicons'

export default class FriendProfile extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('item').name + "'s Profile",
      headerTitleStyle: { fontWeight:'bold' },
      headerStyle: {
        backgroundColor: Color.secondary,
    },
    };
  };

  state = {
    dtProfile: this.props.navigation.getParam('item') || null,
  };

  render() {
    {console.log(this.state.dtProfile);
    }
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Color.secondary}></StatusBar>
        <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:3, marginBottom:1, alignItems:'center', justifyContent:'center', paddingVertical:20}}>
          <Image
            source={{
              uri: this.state.dtProfile ? this.state.dtProfile.photo : 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1577315841/hiringapp/assets/ava1.png'
            }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              overflow: "hidden",
              borderWidth: 3,
              borderColor: "gray"
            }}
          />
          
        </View>
        <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:2, paddingVertical:10, paddingHorizontal:10}}>
          <Text>Full Name</Text>
          <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{this.state.dtProfile.name || 'Your friend name'}</Text>
        
        </View>
        <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:1, marginBottom:2, paddingVertical:10, paddingHorizontal:10}}>
          <Text>Email</Text>
          <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{this.state.dtProfile.email || 'Your friend email'}</Text>
        </View>
        <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:1, marginBottom:2, paddingVertical:10, paddingHorizontal:10}}>
          <Text>Status</Text>
          <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{this.state.dtProfile.status || 'Your friend email'}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('chat', {item: this.state.dtProfile} )}>
          <View style={{Height: 900, flexDirection:'row', backgroundColor:'white', marginHorizontal:10, marginTop:20, marginBottom:5, paddingVertical:10, paddingHorizontal:10, alignItems:'center', justifyContent:'center', borderRadius:10, }}>
            <Icon name="ios-chatboxes" size={25} color={Color.darkprimary} />
            <Text style={{fontSize:18, color: Color.darkprimary, fontWeight:'bold', marginLeft:10}}>Send message to {this.state.dtProfile.name}</Text>
          </View>
        </TouchableOpacity>

        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 14,
    marginBottom: 12,
  },
});