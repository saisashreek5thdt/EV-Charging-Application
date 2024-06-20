import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import TabNvaigation from "./app/Navigation/TabNvaigation";
import GlobalApi from "./app/Utils/GlobalApi";

import Login from "./app/Screens/Login/LoginScreen"

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
    <ClerkProvider tokenCache={tokenCache} publishableKey={GlobalApi.CLERK_API_KEY}>
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
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
