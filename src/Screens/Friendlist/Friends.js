import React, { Component , useState, useEffect} from 'react'//USE EFFECT == KOMPONEN WILLMOUNT
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

// const initialState = {
//   latitude: null,
//   longitude: null,
//   latitudeDelta: 0.015,
//   longitudeDelta: 0.0121,
// }

// const Friends = ()=> { 
//   const[curentPosition, setCurentPosition] = useState(initialState)

//   useEffect(()=>{
//     Geolocation.getCurrentPosition(info =>{
//     //  alert(JSON.stringify(info))
//       const {latitude, longitude}= info.coords;
//       setCurentPosition({
//         ...curentPosition,
//         latitude,
//         longitude
//       })
//     }, 
//     error => alert(error.message),
//     {timeout : 200000, maximumAge : 1000}
//     )

//   }, [])
//         return curentPosition.latitude ? (
//             <View style={styles.container}>
//             <MapView
//               initialregion={curentPosition}
//               showsUserLocation 
//             />
          
//           </View>
//         ) : <ActivityIndicator style={{flex : 1}} animating size="large"/>
    
// }

export default class Friends extends Component {
  render() {
    return (
      <View style={styles.container}>
      <MapView style={styles.map}
      provider= {PROVIDER_GOOGLE}
      initialRegion={{
        latitude:-7.865425,
        longitude:112.030197,
        latitudeDelta: 0.00422,
        longitudeDelta: 0.00421,
      }}
      >
        </MapView>
        </View>
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

