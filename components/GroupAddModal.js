import React, { useEffect, useState } from 'react';
import {
  Pressable,
  TextInput,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import { Popover, Button, Modal, FormControl, Box } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import { Input } from '@rneui/themed';
import groupStore from './stores/groupStore';
import userStore from './stores/userStore';

const user = userStore.user;

const GroupAddModal = ({ navigation }) => {
  const [group, setGroup] = useState({
    title: '',
    image: '',
    finalBudget: '',
    finalDepartDate: '',
    finalReturnDate: '',
    finalActivities: [],
  });
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      let filename = result.uri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let img_type = match ? `image/${match[1]}` : `image`;
      // setUser({
      //   ...user,
      //   image: {
      //     uri:
      //       Platform.OS === 'android'
      //         ? result.uri
      //         : result.uri.replace('file://', ''),
      //     name: filename,
      //     type: img_type,
      //   },
      // });
      setGroup({ ...group, image: result.uri, finalBudget: user.budget });
      setImage(result.uri);
      // setGroup({ ...group, finalBudget: user.budget });
      console.log(image);
    }
  };
  const handleSubmit = async () => {
    // await groupStore.groupCreate({ ...group, admin: userStore.user._id });

    // setGroup({ ...group, finalBudget: user.budget });
    console.log(user.budget);

    console.log(group);

    (await groupStore.groupCreate({ ...group, admin: userStore.user._id })) &
      groupStore.groupGet();

    navigation.navigate('Home');
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.title}> Enter Your Group Details </Text>
        </View>
        <Input
          onChangeText={(title) => {
            setGroup({ ...group, title });
          }}
          placeholder="Group Name"
          errorMessage={false && 'ENTER A VALID ERROR HERE'}
        />

        <View style={styles.dateBtn}>
          <View>
            <Box alignItems="center">
              <Button style={styles.dateBtnColor} onPress={pickImage}>
                Pick Profile Image
              </Button>
            </Box>
          </View>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>

        {/* <Input
          onChangeText={(finalDepartDate) => {
            setGroup({ ...group, finalDepartDate });
          }}
          placeholder="Group Depart Date"
        />
        <Input
          onChangeText={(finalReturnDate) => {
            setGroup({ ...group, finalReturnDate });
          }}
          placeholder="Group Return Date"
        />
        <Input
          onChangeText={(finalBudget) => {
            setGroup({ ...group, finalBudget });
          }}
          placeholder="Group final Budget"
        /> */}

        <Pressable onPress={handleSubmit} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default GroupAddModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainContainer: {
    justifyContent: 'space-between',
    marginHorizontal: 35,
  },
  titleBox: {
    paddingTop: 65,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    letterSpacing: 0.5,
    color: 'hsl(174, 62%, 47%)',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#63C9B3',
    justifyContent: 'center',
    alignItems: 'center',
    height: '9%',
    paddingHorizontal: '22%',
    borderRadius: 20,
    marginTop: '10%',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
  dateBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    flexDirection: 'row',
  },
  dateBtnColor: {
    backgroundColor: '#63C9B3',
  },
  image: {
    width: '15%',
    height: '100%',
    borderRadius: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});
