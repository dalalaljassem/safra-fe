import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import GroupCard from "../../components/GroupCard";

export default function JoinGroupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txt}>You are about to join</Text>
      <Text style={styles.txt2}>Family Trip</Text>
      <GroupCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    top: 50,
  },
  txt2: {
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    top: 80,
    color: "#63C9B3",
  },
});
