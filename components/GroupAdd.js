import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import groupStore from "./stores/groupStore";
import GroupAddModal from "./GroupAddModal";

const GroupAdd = ({ route, navigation }) => {
  const id = route.params?.id;
  groupStore.setSingleGroupWithId(id);
  const group = groupStore.singleGroup;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <GroupAddModal group={group} navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GroupAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    letterSpacing: 0.5,
    color: "hsl(174, 62%, 47%)",
    fontWeight: "bold",
  },
});
