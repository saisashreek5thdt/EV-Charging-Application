import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from "../../../hooks/warnUpBroswer"

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress=async()=>{
    try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
  }

  return (
    <View style={styles.loginContainer}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logoImage}
      />
      <Image
        source={require("../../../assets/images/ev-charging.png")}
        style={styles.bgImage}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>
          Your Ultimate EV charging Station Finder App
        </Text>
        <Text style={styles.desc}>
          Find EV charging station near you, plan trip and so much more in just
          one click
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.loginBtn}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  logoImage: {
    width: 200,
    height: 40,
    objectFit: "contain",
  },
  bgImage: {
    width: "100%",
    height: 240,
    marginTop: 20,
    objectFit: "cover",
  },
  heading: {
    fontSize: 25,
    fontFamily: "JostM",
    textAlign: "center",
    marginTop: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: "Jost",
    marginTop: 15,
    textAlign: "center",
    color: "#000",
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 20,
  },
  loginBtn: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "Jost",
    fontSize: 17,
  },
});
