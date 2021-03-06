import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";

import Groups from "../../components/Groups";
import { PlusCircle } from "react-native-feather";
import groupStore from "../../components/stores/groupStore";
import userStore from "../../components/stores/userStore";
import GroupAddModal from "../../components/GroupAddModal";
//group list

export default function HomePage({ group, navigation }) {
  // const groups1 = userStore.user.groups;
  // const userGroup = userStore.user.groups;
  const groups = groupStore.groups;
  // const userGroupArray = userGroup.map((groupId) => {
  //   groupStore.fetchGroup(groupId);
  // });
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(
      (resolve) => setTimeout(resolve, timeout) & groupStore.groupGet
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerAdd}>
          <Text style={styles.header}>My Groups</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("GroupAddModal", { group: group })
            }
          >
            <PlusCircle color={"black"} />
          </TouchableOpacity>
        </View>

        {groups.map((item) => (
          <Groups key={item._id} group={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerAdd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
  },
});
