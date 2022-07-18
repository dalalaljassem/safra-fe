import { SafeAreaView, Text, StyleSheet, Image, View } from "react-native";
import React from "react";

export default function GroupDetails({ route }) {
  const group = route.params;
  //here the chat happens

  return (
    <SafeAreaView>
      <>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{group.title}</Text>
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: "100%",
  },
  infoContainer: {
    padding: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
});
