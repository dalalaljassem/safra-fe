import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import userStore from '../../components/stores/userStore';

export default function MiddleScreen() {
  const cc = () => {
    console.log('pressed');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Profile Screen</Text> */}
      {/* <Button title="Logout" onPress={userStore.logout}></Button> */}
      <Pressable style={styles.ellipsis} onPress={cc}>
        <AntDesign name="ellipsis1" size={24} color="black" />
      </Pressable>
      <View style={styles.imageUsername}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: 'https://img.freepik.com/free-vector/three-airplanes-flying-around-globe-isolated-blue-background-flat-stock-vector-illustration-flights-eps10_127746-3623.jpg?w=2000',
          }}
        />
        <Text style={styles.username}>{userStore.user.username}</Text>
      </View>
      <View style={styles.activities}>
        <Text style={styles.activitiesText}>Favourite Activities:</Text>
        <Text style={styles.activityItemText}>Activity 1</Text>
        <Text style={styles.activityItemText}>Activity 2</Text>
        <Text style={styles.activityItemText}>Activity 3</Text>
      </View>
      <View style={styles.date}>
        <Text style={styles.dateText}>Departure Date: </Text>
        <Text style={styles.dateText}>Return Date: </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  ellipsis: {
    alignItems: 'flex-end',
  },
  imageUsername: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: '50%',
    height: '50%',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  username: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activities: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  activitiesText: {
    fontSize: 27,
    marginBottom: 10,
  },
  activityItemText: {
    fontSize: 17,
    marginLeft: 15,
  },
  date: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 20,
    marginBottom: 10,
  },
});
