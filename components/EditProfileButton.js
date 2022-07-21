import { Popover, Button, Modal, FormControl, Box } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import {
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  View,
  Image,
} from 'react-native';
import userStore from './stores/userStore';
import { AlertDialog } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import { useState, useEffect } from 'react';
import React from 'react';
function EditProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onClose = () => setIsOpen(false);
  const [image, setImage] = useState('');
  const [input, setInput] = useState('');

  const cancelRef = React.useRef(null);
  const [user, setUser] = useState({
    budget: userStore.user.budget,
    departDate: userStore.user.departDate,
    returnDate: userStore.user.returnDate,
    activities: userStore.user.activities,
    image: userStore.user.image,
  });

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
      setUser({
        ...user,
        image: {
          uri:
            Platform.OS === 'android'
              ? result.uri
              : result.uri.replace('file://', ''),
          name: filename,
          type: img_type,
        },
      });
      //   setUser({ ...user, image: result.uri });
      setImage(result.uri);
    }
  };

  const handleChange = (name, value) => {
    if (name === 'budget') {
      //   setUser({ ...user, [name]: value.replace(/\d/g, '') });
      //   setUser({ ...user, [name]: value.replace(/[^d]/g, '') });
      setUser({ ...user, [name]: value });
    }
    if (name === 'activities') {
      //   setUser({ ...user, [name]: value.replace(/\d/g, '') });
      //   setUser({ ...user, [name]: value.replace(/[^d]/g, '') });
      value = value.split(',');
      setUser({ ...user, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    // event.preventDefault();

    userStore.updateUser(user, userStore.user.id);

    // setUser({
    //   budget: '',
    //   departDate: '',
    //   returnDate: '',
    //   activities: [],
    //   image: '',
    // });
    setTimeout(function () {
      setImage('');
    }, 500);
  };
  //   this.myTextInput = React.createRef();
  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps} transparent>
            <AntDesign name="ellipsis1" size={32} color="black" />
          </Pressable>
        );
      }}
    >
      <Popover.Content w="90">
        <Popover.Arrow />

        <Popover.Body alignItems="center">
          <Pressable onPress={() => setShowModal(true)}>
            <Text style={styles.edit}>Edit</Text>
          </Pressable>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Edit Profile</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <View style={styles.imageTitleAndButton}>
                    <FormControl.Label>Image: </FormControl.Label>
                    <Box alignItems="center">
                      <Button onPress={pickImage}>Add Image</Button>
                    </Box>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{
                        uri: image,
                      }}
                    />
                  </View>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Budget</FormControl.Label>
                  <TextInput
                    // value={input}
                    keyboardType="number-pad"
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange('budget', text);
                    }}
                  ></TextInput>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Activities</FormControl.Label>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange('activities', text);
                    }}
                  ></TextInput>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Departure Date</FormControl.Label>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange('departDate', text);
                    }}
                  ></TextInput>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Return Date</FormControl.Label>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange('returnDate', text);
                    }}
                  ></TextInput>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      handleSubmit();
                      setShowModal(false);
                    }}
                  >
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Pressable onPress={() => setIsOpen(!isOpen)}>
            <Text style={styles.logout}>Logout</Text>
          </Pressable>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Logout</AlertDialog.Header>
              <AlertDialog.Body>
                Are you sure you want to logout?
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="danger" onPress={userStore.logout}>
                    Yes
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export default EditProfileButton;

const styles = StyleSheet.create({
  edit: {
    fontSize: 15,
    marginBottom: 10,
  },
  logout: {
    fontSize: 15,
    color: 'red',
  },
  input: {
    height: 30,
    borderWidth: 1,
    fontSize: 20,
    borderColor: 'grey',
  },

  imageTitleAndButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  image: {
    width: '15%',
    height: '100%',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});
