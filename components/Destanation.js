import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Destanation({ cityName }) {
  const [city, setCity] = useState("city");
  const navigation = useNavigation();

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/collections?page=1&orientation=landscape&query=${cityName}&client_id=W4F29sKZTmHfZXTHbXFAbK4lWQWQTGu7wGrYaCh9cZk`
        );
        // const view = await axios.get(
        //     `https://api.unsplash.com/search/collections?page=1&orientation=landscape&query=${cityName}&client_id=W4F29sKZTmHfZXTHbXFAbK4lWQWQTGu7wGrYaCh9cZk`
        //   );
        // console.log(response.data.results[0].title);
        // response.data.results.forEach(image => {
        //     if(image.id){

        //     }
        // })
        setCity(response.data.results[0].cover_photo.urls.full);
      } catch (error) {
        console.log("getImage", error);
      }
    };
    getImage();
  }, []);

  const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  };

  const goToDetails = () => {
    navigation.navigate("DestinationDetails", {
      destination: cityName,
      imageUrl: city,

      // we also need to add the BUDGET HERE
    });
  };

  return (
    <Pressable style={styles.container} onPress={goToDetails}>
      <Image
        style={styles.destinationImage}
        source={{
          uri: city,
        }}
      />
      <View style={styles.destinationInfo}>
        <Text style={styles.cityNameText}>{capitalize(cityName)}</Text>
        {/* DATE MUST BE CHANGED ALSO */}
        <Text style={styles.greyFont}>Dec 28, 2019 - Jan 01, 2020</Text>
        <View style={styles.destinationInfoBottomLine}>
          {/* NUM OF TRAVELLERS MUST BE CHANGED */}
          <Text style={styles.greyFont}>4 Travelers</Text>
          {/* THE PRICE MUST BE CHANGED BASED ON BUDGET OF GROUP */}
          <Text style={styles.price}>2300 USD</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#cacaca",
    height: 205,
    borderRadius: 9,
    marginBottom: 20,
  },
  destinationImage: {
    flex: 5,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    width: "100%",
    height: 100,
  },
  destinationInfo: {
    marginHorizontal: 20,
    marginVertical: 7,
    marginBottom: 30,
    flex: 2,
  },
  destinationInfoBottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    alignItems: "center",
  },
  price: {
    color: "green",
    fontSize: 21,
    fontWeight: "600",
  },
  greyFont: {
    color: "grey",
  },
  cityNameText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 3,
  },
});
