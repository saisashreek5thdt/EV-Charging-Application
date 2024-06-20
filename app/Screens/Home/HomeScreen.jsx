import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import AppMapView from './AppMapView'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'
import { UserLocationContext } from '../../Context/UserLocationContext'
import GlobalApi from "../../Utils/GlobalApi"

export default function HomeScreen() {

  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList,setPlaceList]=useState([]);
  const [selectedMarker,setSelectedMarker]=useState(0);
  useEffect(()=>{
    setSelectedMarker(0)
    location&&GetNearByPlace();
  },[location])

  /**
   * Used to get Near by place using google place api
   */
  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude
          },
          "radius": 5000.0
        }
      }
    }
    GlobalApi.NewNearByPlace(data).then(resp => {
      setPlaceList(resp.data?.places);
    })
  }

  return (
    <SelectMarkerContext.Provider value={{selectedMarker,setSelectedMarker}}>
    <View>
      <View style={styles.headerContainer}>
        <Header />
        <SearchBar />        
      </View>
      <AppMapView />
    </View>
    </SelectMarkerContext.Provider>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20
  },
  placeListContainer:{
    position:'absolute',
    bottom:0,
    zIndex:10,
    width:'100%'
  }
})