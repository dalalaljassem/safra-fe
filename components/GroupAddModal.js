import React, { useReducer, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Input } from "@rneui/themed";
import groupStore from "./stores/groupStore";
import userStore from "./stores/userStore";

const GroupAddModal = ({ navigation }) => {
  const [group, setGroup] = useState({
    title: "",
    image: "",
    finalBudget: "",
    finalDepartDate: "",
    finalReturnDate: "",
    finalActivities: [],
  });

  const handleSubmit = async () => {
    // await groupStore.groupCreate({ ...group, admin: userStore.user._id });
    (await groupStore.groupCreate({ ...group, admin: userStore.user._id })) &
      groupStore.groupGet();

    // console.log(
    //   "🚀 ~ file: GroupAddModal.js ~ line 19 ~ handleSubmit ~ group",
    //   group
    // );
    navigation.navigate("Home");
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.title}> Enter Your Group Details </Text>
        </View>
        <Input
          onChangeText={(title) => {
            setGroup({ ...group, title });
          }}
          placeholder="Group Name"
          errorMessage={false && "ENTER A VALID ERROR HERE"}
        />

        <Input
          onChangeText={(image) => {
            setGroup({ ...group, image });
          }}
          placeholder="Group image"
        />
        <Input
          onChangeText={(finalDepartDate) => {
            setGroup({ ...group, finalDepartDate });
          }}
          placeholder="Group Depart Date"
        />
        <Input
          onChangeText={(finalReturnDate) => {
            setGroup({ ...group, finalReturnDate });
          }}
          placeholder="Group Return Date"
        />
        <Input
          onChangeText={(finalBudget) => {
            setGroup({ ...group, finalBudget });
          }}
          placeholder="Group final Budget"
        />
        {/* <Button
          style={styles.button1}
          onPress={handleSubmit}
          title="Save"
        ></Button> */}
        <Pressable onPress={handleSubmit} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default GroupAddModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainContainer: {
    justifyContent: "space-between",
    marginHorizontal: 35,
  },
  titleBox: {
    paddingTop: 65,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    letterSpacing: 0.5,
    color: "hsl(174, 62%, 47%)",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#63C9B3",
    justifyContent: "center",
    alignItems: "center",
    height: "9%",
    paddingHorizontal: "22%",
    borderRadius: 20,
    marginTop: "10%",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
});
