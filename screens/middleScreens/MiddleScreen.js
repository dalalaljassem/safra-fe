import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function MiddleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Middle Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
