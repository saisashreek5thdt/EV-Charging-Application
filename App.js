import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import TabNvaigation from "./app/Navigation/TabNvaigation";
import GlobalApi from "./app/Utils/GlobalApi";

import Login from "./app/Screens/Login/LoginScreen";
import { UserLocationContext } from "./app/Context/UserLocationContext";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [location, setLocation] = useState({
    latitude: 35.23112,
    longitude: -80.8383,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("DENINED");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      if (!location?.coords) {
        setLocation({
          latitude: "35.231120",
          longitude: "-80.838300",
        });
      }
      console.log("--m", location.coords);
    };
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [fontsLoaded] = useFonts({
    Jost: require("./assets/fonts/Jost-Regular.ttf"),
    JostT: require("./assets/fonts/Jost-Thin.ttf"),
    JostL: require("./assets/fonts/Jost-Light.ttf"),
    JostM: require("./assets/fonts/Jost-Medium.ttf"),
    JostBl: require("./assets/fonts/Jost-Black.ttf"),
    JostB: require("./assets/fonts/Jost-Bold.ttf"),
    JostSB: require("./assets/fonts/Jost-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={GlobalApi.CLERK_API_KEY}
    >
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <SignedIn>
            <NavigationContainer>
              <TabNvaigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <Login />
          </SignedOut>
          <StatusBar style="auto" />
        </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
