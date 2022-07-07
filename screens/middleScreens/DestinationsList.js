import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Destanation from '../../components/Destanation';

export default function DestinationsList() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Destinations List</Text>
        <Destanation cityName="paris" />
        <Destanation cityName="san francesco" />
        <Destanation cityName="sidney" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    margin: 10,
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
