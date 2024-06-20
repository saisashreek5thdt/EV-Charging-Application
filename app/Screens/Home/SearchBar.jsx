import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="location-sharp"
        size={24}
        color={Colors.GRAY}
        style={{ paddingTop: 5 }}
      />
      <GooglePlacesAutocomplete
        placeholder='Search EV Charging Station'
        fetchDetails={true}
        onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
          
            searchedLocation(details?.geometry?.location)
        }}
      query={{
        key: 'AIzaSyA2N_EmbXomYLcAyJX0Sxd4H6mWGkOh8HA',
        language: 'en',
      }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
  },
});
