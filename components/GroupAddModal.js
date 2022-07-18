import React, { useReducer, useState } from "react";
import { Button, TextInput, View, Text, SafeAreaView } from "react-native";
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

    console.log(
      "🚀 ~ file: GroupAddModal.js ~ line 19 ~ handleSubmit ~ group",
      group
    );
    navigation.navigate("Home");
  };

  return (
    <>
      <SafeAreaView>
        <Text> Groups </Text>
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
        <Button onPress={handleSubmit} title="Create "></Button>
      </SafeAreaView>
    </>
  );
};

export default GroupAddModal;
