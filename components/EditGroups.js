import { Popover, Button, Modal, FormControl, Input } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Pressable, Text, StyleSheet, TextInput } from 'react-native';
import { AlertDialog } from 'native-base';
import { useState } from 'react';
import React from 'react';
import groupStore from './stores/groupStore';
import userStore from './stores/userStore';
import { observer } from 'mobx-react';
import instance from '../axios/instance';
const usersGet = async () => {
  try {
    const response = await instance.get('/users');
    return response.data;
  } catch (error) {
    console.log('UserStore -> usersGet -> error', error);
  }
};
const usersList = usersGet();
function EditGroups({ userId, group }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const onClose = () => setIsOpen(false);
  const groupUsers = group.users;
  const [g, setG] = useState({
    users: groupUsers,
  });
  const [username, setUsername] = useState('');

  const findUserByUsername = (username) => {
    return usersList['_W'].find((u) => u.username === username);
  };

  const handleChange = (value) => {
    setUsername(value);
  };

  const handleSubmit = (event) => {
    if (!username.includes(',')) {
      console.log('user====>' + findUserByUsername(username));
      const userIdd = findUserByUsername(username)._id;
      console.log(userIdd);
      console.log('before', groupUsers);

      setG({
        users: [...groupUsers, userIdd],
      });
      groupUsers.push(userIdd);

      console.log(g);
      groupStore.groupUpdate(g, group._id);
      userStore.updateUser(
        { groups: [...findUserByUsername(username).groups, group] },
        userIdd
      );
      // console.log('=============>>>>>>' + JSON.stringify(group));
    } else {
      const usernamesList = username.split(',');
      const usersIdList = [];
      usernamesList.forEach((u) => usersIdList.push(findUserByUsername(u)._id));
      console.log('usersIdList====>' + usersIdList);
      console.log('before', groupUsers);

      // groupUsers.push(userIdd);
      // console.log('after', groupUsers);

      setG({
        // users: [...group.users.map((gg) => gg._id), userIdd],
        users: [...groupUsers, ...usersIdList],
      });
      usersIdList.forEach((u) => groupUsers.push(u));
      console.log(g);
      groupStore.groupUpdate(g, group._id);

      usernamesList.forEach((u, index) =>
        userStore.updateUser(
          { groups: [...findUserByUsername(u).groups, group] },
          usersIdList[index]
        )
      );
    }
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
              <Modal.Header>
                Invite Users
                <Text style={styles.inviteHint}>
                  Hint: You can invite multiple users when seperating with
                  commas
                </Text>
              </Modal.Header>

              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
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
  inviteHint: {
    color: 'grey',
    fontSize: 10,
    marginTop: 10,
    fontWeight: '400',
  },
});
