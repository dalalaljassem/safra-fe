import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { observer } from "mobx-react-lite";
import { TabView } from "@rneui/base";
// import io from "socket.io-client";
import InstaStory from "react-native-insta-story";

export default function GroupDetails({ route }) {
  const group = route.params;
  const [messages, setMessages] = useState([]);
  //here the chat happens

  //socketio
  // this.socket = io(this.url);
  // this.socket.connect();

  // public sendMeessage(text: String, user: any , groupId: number){
  //   this.socket.emit('new-message', {text, user: user.name, groupId})
  // }

  // public getMessages = () => {
  //   return Observable.create(observer)=>{
  //     this.socket.on('new-message', (message, user)=>{
  //       observer.next(message);
  //     })
  //   }
  // }

  const data = [
    {
      user_id: 1,
      user_image: group.user.image,
      user_name: "Ibraheem", //group.user.username
      onPress: () => navigation.navigate("ProfileScreen"),
    },
    {
      user_id: 2,
      user_image: group.user.image,
      user_name: "Dalal",
      // onPress: () => navigation.navigate("Home"),
    },
    {
      user_id: 3,
      user_image: group.user.image,
      user_name: "Rawan",
      // onPress: () => navigation.navigate("Home"),
    },
    {
      user_id: 4,
      user_image: group.user.image,
      user_name: "Rashed",
      // onPress: () => navigation.navigate("Home"),
    },
  ];

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello", //value msg from socket
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "username", //name of users
          avatar: group.image,
        },
      },
    ]);
  }, []);
  //"https://placeimg.com/140/140/any"

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{group.title} Group Chat</Text>
        </View>

        <InstaStory
          style={styles.story}
          data={data}
          duration={10}
          onStart={(item) => console.log(item)}
          onClose={(item) => console.log("close: ", item)}
        />
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  userslisting: {
    paddingTop: 100,
    paddingLeft: 1,
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    // flexWrap: "wrap",
    // alignItems: "center",
    flex: 1,
    // justifyContent: "center",
  },
  story: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  top: {
    paddingTop: 30,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
