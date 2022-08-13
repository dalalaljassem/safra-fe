import { Popover, Button, Modal, FormControl, Input } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Pressable, Text, StyleSheet, TextInput } from 'react-native';
import { AlertDialog } from 'native-base';
import { useState } from 'react';
import React from 'react';
import groupStore from './stores/groupStore';
import userStore from './stores/userStore';
import { observer } from 'mobx-react';

function EditGroups({ userId, group }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const onClose = () => setIsOpen(false);
  const [g, setG] = useState({
    users: [],
  });
  const [username, setUsername] = useState('');

  const findUserByUsername = (username) => {
    return userStore.users.find((u) => u.username === username);
  };

  const handleChange = (value) => {
    setUsername(value);
  };

  const handleSubmit = (event) => {
    console.log(findUserByUsername(username));
    const userId = findUserByUsername(username)._id;
    console.log(userId);
    setG({
      users: [...group.users.map((gg) => gg._id), userId],
    });
    console.log(g);
    groupStore.groupUpdate(g, group._id);
    // userStore.updateUser(
    //   { groups: [...findUserByUsername(username).groups, group] },
    //   findUserByUsername(username).id
    // );
    // console.log('=============>>>>>>' + JSON.stringify(group));
  };

  const findUser = async function (group) {
    const currentUser = await Parse.User.currentAsync();
    // console.log(
    //   '🚀 ~ file: EditGroups.js ~ line 17 ~ findUser ~ currentUser',
    //   currentUser
    // );

    if (currentUser !== null) {
      Alert.alert(
        'Success!',
        `${currentUser.get('username')} is the current user!`,
        group.getUser(currentUser)
      );
    }
    return currentUser;
  };

  const cancelRef = React.useRef(null);
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
      <Popover.Content w="120">
        <Popover.Arrow />

        <Popover.Body alignItems="center">
          <Pressable onPress={() => setShowModal(true)}>
            <Text style={styles.edit}>Invite Friend</Text>
          </Pressable>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Add User</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>username</FormControl.Label>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange(text);
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
                      // groupStore.groupUpdate(userId);
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
            <Text style={styles.logout}>Delete Group</Text>
          </Pressable>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Delete</AlertDialog.Header>
              <AlertDialog.Body>
                Are you sure you want to delete?
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
                  <Button
                    colorScheme="danger"
                    onPress={() => groupStore.groupDelete(groupId)}
                  >
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

export default observer(EditGroups);

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
    borderRadius: 5,
  },
});
