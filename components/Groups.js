import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable, Button } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import groupStore from "../components/stores/groupStore";
export default function Group({ group }) {
  // const [group, setGroup] = useState("group");
  const navigation = useNavigation();

  function GroupItem({ item: group }) {
    return (
      //card
      <Group
        group={group}
        navigation={navigation}
        key={group._id}
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

  const addUserToGroup = async () => {
    await groupStore.groupUpdate(group._id);
  };

  const showMenu = () => {};
  return (
    <Pressable style={styles.container} onPress={goToDetails}>
      <View style={styles.groupInfo}>
        <Image
          style={styles.groupImage}
          source={{
            uri: group.image,
          }}
        />
        {/* <Button
          title="Add"
          onPress={() =>
            addUserToGroup({
              _id: "62c8969bd612d3d1c73fb9b5",
              username: "Jghjghg",
              password:
                "$2b$10$eS3ocsteZxaqT05iznqPxOOEndxbgSyS5X.ScPDL7i6ZuKjTrk93m",
              budget: 0,
              image: null,
              activities: [],
              departDate: null,
              returnDate: null,
              groups: [],
              __v: 0,
            })
          }
        ></Button> */}
        <View style={styles.groupInfoTop}>
          <Text style={styles.groupNameText}>{group.title}</Text>
        </View>
        <View style={styles.groupInfoBottomLine}>
          {/* :{JSON.stringify(group.userId)} */}
          <Text style={styles.greyFont}>
            Members : {group.users.map((u) => u.username)}
          </Text>
          {console.log("🚀 ~ file: Groups.js ~ line 70 ~ Group ~ group", group)}
          {/* <Text style={styles.greyFont}>Members </Text> */}
          <Text style={styles.price}>💰${group.finalBudget}</Text>
        </View>
        {console.log(
          "🚀 ~ file: Groups.js ~ line 50 ~ Group group.admin.username",
          group.users[0]
        )}
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
    // borderTopLeftRadius: 9,
    // borderTopRightRadius: 9,
    // width: "100%",
    // height: 100,
    // borderRadius: 60 / 2,
    width: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: "#fff",
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
  groupInfoTop: {
    flex: 2,
    flexDirection: "row",
    marginTop: 2,
    alignItems: "center",
  },
  price: {
    color: "green",
    fontSize: 17,
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
