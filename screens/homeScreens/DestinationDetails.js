import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Button,
} from "react-native";
import { Heading, HStack, Spinner } from "native-base";
import React, { useState, useEffect } from "react";
import ActivityList from "../../components/ActivityList";
import activityStore from "../../stores/ActivityStore";

export default function DestinationDetails({ route }) {
  const destination = route.params.destination;
  const city = route.params.imageUrl;
  const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    const viewAttractions = async () => {
      try {
        activityStore.fetchActivities(capitalize(destination));
      } catch (error) {
        console.log("fetchActivities in DestDetails", error);
      }
    };
    viewAttractions();
  }, [destination]);

  return (
    <ScrollView>
      <Image
        style={styles.destinationImage}
        source={{
          uri: city,
        }}
      />
      <View style={styles.namePrice}>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
          {capitalize(destination)}
          <br></br>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              justifyContent: "end",
              color: "#63C9B3",
            }}
          >
            $500
          </Text>
          <Text style={{ fontSize: 18 }}> Per person</Text>
        </Text>
      </View>
      <View>
        <Text
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            color: "white",
            fontSize: 30,
            textAlign: "center",
            marginTop: 35,
            marginBottom: 35,
          }}
        >
          ATTRACTIONS
        </Text>
      </View>
      <View style={styles.list}>
        <ActivityList />
      </View>
      <View>
        <Button
          title="Book Now"
          onPress={() => Alert.alert("Simple Button pressed")}
          color="#63C9B3"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
  destinationImage: {
    width: "100%",
    height: "250px",
  },
  namePrice: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  scroll: {
    marginTop: 50,
  },
  list: {
    alignItems: "center",
  },
  // attractions: {
  //   textAlign: "center", // <-- the magic
  //   fontWeight: "bold",
  //   color: "white",
  //   fontSize: 25,
  //   marginTop: -200,
  //   marginBottom: 20,
  //   backgroundColor: "rgba(0,0,0,0.9)",

  //   // flex: 3,
  //   // backgroundColor: "rgba(7,7,7,0.3)",
  //   // position: "relative",
  // },
  // lables: {
  //   textAlign: "center", // <-- the magic
  //   fontWeight: "bold",
  //   color: "white",
  //   fontSize: 25,
  //   marginBottom: 20,
  //   backgroundColor: "rgba(0,0,0,0.9)",

  //   // flex: 3,
  //   // backgroundColor: "rgba(7,7,7,0.3)",
  //   // position: "relative",
  // },
  // img: {
  //   height: 200,
  //   width: 200,
  //   borderRadius: 50,
  // },
  // desc: {
  //   textAlign: "center", // <-- the magic
  //   fontSize: 15,
  //   marginTop: 20,
  //   // width: "60%",
  //   marginBottom: 30,
  //   backgroundColor: "rgba(10,10,10,0.1)",
  //   borderRadius: 20,
  // },
});
