import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import groupStore from './stores/groupStore';
import EditGroups from './EditGroups';
import userStore from './stores/userStore';
import { observer } from 'mobx-react';
import { useRoute } from '@react-navigation/native';
function Group({ group }) {
  const navigation = useNavigation();

  const goToDetails = () => {
    navigation.navigate('DestinationsList');
  };

  return (
    <Pressable style={styles.container} onPress={goToDetails}>
      <View style={styles.groupInfo}>
        <Image
          style={styles.groupImage}
          source={{
            uri: group.image,
          }}
        />

        <View style={styles.groupInfoTop}>
          <Text style={styles.groupNameText}>{group.title}</Text>
        </View>

        <View style={styles.groupInfoBottomLine}>
          {/* :{JSON.stringify(group.userId)} */}

          <Text style={styles.greyFont}>
            Users :{' '}
            {group.users.map((u, index) => {
              if (index !== group.users.length - 1) {
                return u.username + ', ';
              } else {
                return u.username;
              }
            })}
          </Text>
          {/* {console.log('🚀 ~ file: Groups.js ~ line 67 ~ Group ~ group', group)} */}
          {/* {console.log("🚀 ~ file: Groups.js ~ line 70 ~ Group ~ group", group)} */}
          {/* <Text style={styles.greyFont}>Members </Text> */}
          <Text style={styles.price}>💰${group.finalBudget}</Text>
        </View>
        {/* {console.log(
          "🚀 ~ file: Groups.js ~ line 50 ~ Group group.admin.username",
          group.users
        )} */}
      </View>
    </Pressable>
  );
}
export default observer(Group);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: 'white',
    height: 200,
    borderRadius: 9,
    marginBottom: 20,
  },
  groupImage: {
    flex: 5,
    // borderTopLeftRadius: 9,
    // borderTopRightRadius: 9,
    // width: "100%",
    // height: 100,
    // borderRadius: 60 / 2,
    width: 90,

    borderRadius: '100%',
    borderWidth: 1,
    borderColor: '#fff',
  },
  groupInfo: {
    marginHorizontal: 20,
    marginVertical: 7,
    marginBottom: 30,
    flex: 2,
  },
  groupInfoBottomLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    alignItems: 'center',
  },
  groupInfoTop: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'center',
  },
  price: {
    color: 'green',
    fontSize: 17,
    fontWeight: '600',
  },
  greyFont: {
    color: 'grey',
  },
  topEdit: {
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 5,
  },
  groupNameText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 3,
  },
});
