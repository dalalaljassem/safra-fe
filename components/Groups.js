import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Group({ group }) {
  // const [group, setGroup] = useState("group");
  const navigation = useNavigation();

  function GroupItem({ item: group }) {
    return (
      <Group
        group={group}
        navigation={navigation}
        key={group.id}
        onPress={() => {
          navigation.navigate("GroupDetails", {
            group: group,
            id: group.id,
          });
        }}
      />
    );
  }

  const goToDetails = () => {
    navigation.navigate("GroupDetails", {
      title: group.title,
    });
  };

  return (
    <Pressable style={styles.container} onPress={goToDetails}>
      <Image
        style={styles.groupImage}
        source={{
          uri: group.image,
        }}
      />

      <View style={styles.groupInfo}>
        <Text style={styles.groupNameText}>{group.title}</Text>
        <Text style={styles.greyFont}>{group.title}</Text>
        <View style={styles.groupInfoBottomLine}>
          <Text style={styles.greyFont}>Members:{group.user}</Text>
          <Text style={styles.price}>{group.budget}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderWidth: 1,
    borderColor: "#cacaca",
    height: 205,
    borderRadius: 9,
    marginBottom: 20,
  },
  groupImage: {
    flex: 5,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    width: "100%",
    height: 100,
    // borderRadius: 60 / 2,
  },
  groupInfo: {
    marginHorizontal: 20,
    marginVertical: 7,
    marginBottom: 30,
    flex: 2,
  },
  groupInfoBottomLine: {
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
  groupNameText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 3,
  },
});
