import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState } from 'react';

import Groups from '../../components/Groups';
import { PlusCircle } from 'react-native-feather';
import groupStore from '../../components/stores/groupStore';
import userStore from '../../components/stores/userStore';
import GroupAddModal from '../../components/GroupAddModal';
//group list

export default function HomePage({ group, navigation }) {
  const groupsIds = userStore.user.groups;
  const groups = groupStore.groups.filter((g) => groupsIds.includes(g._id));
  let hasNoGroups = groups.length == 0;
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(
      (resolve) => setTimeout(resolve, timeout) & groupStore.groupGet
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const goToGroupModal = () => {
    hasNoGroups = false;
    navigation.navigate('GroupAddModal', { group: group });
  };

  if (hasNoGroups) {
    return (
      <SafeAreaView style={styles.noGroupsContainer}>
        {/* <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        > */}
        <View style={styles.headerAdd2}>
          <Text style={styles.header}>My Groups 🌟</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('GroupAddModal', { group: group }) &
              groupStore.groupGet()
            }
          >
            <PlusCircle color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.noGroupsMsg}>
          <Text style={styles.msg}>You are not in any group</Text>
        </View>

        {/* </ScrollView> */}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.headerAdd}>
            <Text style={styles.header}>My Groups 🌟</Text>
            <TouchableOpacity onPress={goToGroupModal}>
              <PlusCircle color={'black'} />
            </TouchableOpacity>
          </View>

          {groups.map((g) => (
            <Groups group={g} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'Bold',
  },
  noGroupsContainer: {
    flex: 1,
    margin: 10,
  },
  noGroupsMsg: {
    flex: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAdd2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  msg: {
    color: 'grey',
  },
});
