import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import userStore from '../../stores/userStore';

export default function MiddleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile Screen</Text>

      <Button title="Logout" onPress={userStore.logout}></Button>
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
