import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import userStore from '../../stores/userStore';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
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
