import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Pressable,
} from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import userStore from '../../components/stores/userStore';
import EditProfileButton from '../../components/EditProfileButton';
import { observer } from 'mobx-react';
import destinationStore from '../../components/stores/destinationStore';

function ProfileScreen() {
  let user = userStore.user;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.edit}>
        <EditProfileButton />
      </View>

      <View style={styles.imageUsername}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: user.image,
          }}
        />

        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.budget}>${user.budget}</Text>
      </View>
      <View style={styles.activities}>
        <Text style={styles.activitiesText}>Favourite Activities:</Text>

        {user.activities.map((activity, index) => (
          <Text style={styles.activityItemText}>
            {index + 1}- {activity}
          </Text>
        ))}
      </View>
      <View style={styles.date}>
        <Text style={styles.dateText}>
          <Text style={styles.dateText2}>Departure Date: </Text>
          {user.departDate ? user.departDate.slice(0, 10) : user.departDate}
        </Text>
        <Text style={styles.dateText}>
          <Text style={styles.dateText2}>Return Date: </Text>

          {user.returnDate ? user.returnDate.slice(0, 10) : user.returnDate}
        </Text>
        {/* <Button
          title="Generate Destinations"
          onPress={() => destinationStore.getDestinationsOfActivities()}
        /> */}
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
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  budget: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'green',
  },
  activities: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  activitiesText: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: '700',
  },
  activityItemText: {
    fontSize: 23,
    marginLeft: 20,
  },
  date: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 23,
    marginBottom: 10,
  },
  dateText2: {
    fontSize: 23,
    marginBottom: 10,
    fontWeight: '700',
  },
});
