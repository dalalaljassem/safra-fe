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
import EditProfileButton from '../../components/EditProfileButton';
import { observer } from 'mobx-react';
import destinationStore from '../../components/stores/destinationStore';

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Logout" onPress={userStore.logout}></Button> */}

      <View style={styles.edit}>
        <EditProfileButton />
      </View>

      <View style={styles.imageUsername}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: userStore.user.image,
          }}
        />

        <Text style={styles.username}>{userStore.user.username}</Text>
        <Text style={styles.budget}>${userStore.user.budget}</Text>
      </View>
      <View style={styles.activities}>
        <Text style={styles.activitiesText}>Favourite Activities:</Text>

        {userStore.user.activities.map((activity) => (
          <Text style={styles.activityItemText}>{activity}</Text>
        ))}
        {console.log(userStore.user)}
      </View>
      <View style={styles.date}>
        <Text style={styles.dateText}>
          Departure Date:{' '}
          {userStore.user.departDate
            ? userStore.user.departDate.slice(0, 10)
            : userStore.user.departDate}
        </Text>
        <Text style={styles.dateText}>
          Return Date:{' '}
          {userStore.user.returnDate
            ? userStore.user.returnDate.slice(0, 10)
            : userStore.user.returnDate}
        </Text>
        <Button
          title="Generate Destinations"
          onPress={() => destinationStore.getDestinationsOfActivities()}
        />
      </View>
    </SafeAreaView>
  );
}
export default observer(ProfileScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  edit: {
    alignItems: 'flex-end',
  },
  imageUsername: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    height: '60%',
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
  budget: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activities: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 20,
    marginBottom: 10,
  },
});
