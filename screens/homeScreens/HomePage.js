import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Groups from "../../components/Groups";
import { PlusCircle } from "react-native-feather";
import groupStore from "../../components/stores/groupStore";
import GroupAddModal from "../../components/GroupAddModal";
//group list
export default function HomePage({ group, navigation }) {
  const groups = groupStore.groups;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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

        {groups.map((g) => (
          <Groups group={g} />
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
