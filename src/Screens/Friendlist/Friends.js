import React, { Component} from 'react'//USE EFFECT == KOMPONEN WILLMOUNT
import { Text, View, StyleSheet, ActivityIndicator,Platform, Image, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout , Polygon} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions'

export default class Friends extends Component {
state = {
 coordinates : [
  {name : '1', latitude : -6.617447, longitude : 106.823005},
  {name : '2', latitude : -6.617085, longitude : 106.818767},
  {name : '3', latitude : -6.616296, longitude : 106.815677},
  ]
}
componentDidMount(){
  this.requestPosition()
}
  requestPosition = async () =>{
    if(Platform.OS === 'ios'){
      console.log('Iphone' + response)
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if(response === 'granted'){
      this.locateCurrentPosition()
    }
    }else{
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      console.log('Android' + response)
      if(response === 'granted'){
        this.locateCurrentPosition()
      }
    }
  }
  locateCurrentPosition = ()=> {
    Geolocation.getCurrentPosition(
      position =>{
        console.log(JSON.stringify(position))
        let initialPosition ={
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        }
        this.setState({initialPosition})
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy : true, timeout : 100000, maximumAge : 1000}
    )
  }
  sayHelo = () =>{
    Alert.alert(
      'Welcome to the Jungle!',
      'This enak',
      [
        {
          text : 'cancel',
          style : 'cancel'
        },
        {
          text : 'OK'
        }
      ]
    )
  }
  render() {
    return (
 
      <MapView style={styles.map}
      provider= {PROVIDER_GOOGLE}
      ref={map => this._map = map}
      initialRegion={this.state.initialPosition}
      >
        <Polygon 
        coordinates={this.state.coordinates}
        />
        <Marker
        coordinate={{latitude : -6.617447, longitude :106.823005}}
         >
         <Callout onPress={this.sayHelo}> 
         <Image source={require('../../../public/Asset/Image/google.png')} style={{width : 50, height : 50}}/>
          <Text>Tempat Berenang</Text>
        </Callout>
        
        </Marker>  
        {
          this.state.coordinates.map(marker => (
            <Marker
            key={marker.name}
            coordinate={{latitude : marker.latitude, longitude : marker.longitude}}
            title={marker.name}
            >
        <Callout> 
          <Image style={{width : 50, height : 50}} source={{uri : 'https://reactjs.org/logo-og.png'}}/>
         <Text>{marker.name}</Text>
        </Callout>


            </Marker>

          ))
        }
        </MapView>
       
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: 400,
    height: 400,
    top : 0,
    left : 0,
    right : 0,
    bottom : 0,
   position : 'absolute',
   justifyContent : 'flex-end',
   alignItems :'center'
    },
    map: { 
      flex : 1,
      ...StyleSheet.absoluteFillObject,
    },
   });

