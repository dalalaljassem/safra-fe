import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function FirstPage() {
  const navigation = useNavigation();
  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };
  const goToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logowithName}>
        <Image style={styles.logo} source={require("../../assets/globe.png")} />

        <Text style={styles.appName}>SAFRA</Text>
      </View>
      <View style={styles.decide}>
        <Text style={styles.decideText}>Decide, Book, Explore!</Text>
        <Text style={styles.grabText}>Grab a friend and get going</Text>
      </View>
      <View style={styles.signUpLogin}>
        <Pressable onPress={goToSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>
        <View style={styles.loginPageButton}>
          <Text>Already Got An Account?</Text>
          <Button onPress={goToLogin} title="Login"></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: "30%",
  },
  logowithName: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: "3%",
  },
  appName: {
    fontSize: 50,
    fontWeight: "500",
  },
  decide: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  decideText: {
    fontWeight: "600",
    fontSize: 27,
    marginBottom: "2%",
  },
  grabText: {
    color: "grey",
  },
  signUpLogin: {
    flex: 3,
    marginTop: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#63C9B3",
    justifyContent: "center",
    alignItems: "center",
    height: "16%",
    paddingHorizontal: "22%",
    borderRadius: 20,
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  loginPageButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
});
