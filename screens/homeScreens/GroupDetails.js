import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useCallback, useEffect } from "react";
import { PlusCircle } from "react-native-feather";
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
      // user_image: group.user.image,
      user_image:
        "https://cdn.discordapp.com/attachments/990987687060209674/998986558818492456/Group_1_Ibrahim_Shaaban.JPG",
      user_name: "Ibraheem", //group.user.username
      onPress: () => navigation.navigate("ProfileScreen"),
    },
    {
      user_id: 2,
      user_image:
        "https://cdn.discordapp.com/attachments/990987687060209674/998986558260658196/Group_1_Dalal_AlJassem.JPG",
      user_name: "Dalal",
      // onPress: () => navigation.navigate("Home"),
    },
    {
      user_id: 3,
      user_image:
        "https://cdn.discordapp.com/attachments/990987687060209674/998986559284051978/Group_1_Rawan_AlMusallam.JPG",
      user_name: "Rawan",
      // onPress: () => navigation.navigate("Home"),
    },
    {
      user_id: 4,
      user_image:
        "https://cdn.discordapp.com/attachments/990209764933902356/1002134623012266014/7AC89E63-4EC1-49BE-8983-9637B7F7AEE1.jpg",
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
          avatar:
            "https://cdn.discordapp.com/attachments/990987687060209674/998986558818492456/Group_1_Ibrahim_Shaaban.JPG",
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
          <Text style={styles.title}>{group.title} Group Chat </Text>
          {/* <Text style={styles.titleBlue}> Generate </Text> */}
          <TouchableOpacity
            onPress={() => {
              Toast.show({
                type: "error",
                text1: "Destination is now generated ✅",
              });
            }}
          >
            <PlusCircle color={"black"} />
          </TouchableOpacity>
        </View>

        <InstaStory
          style={styles.story}
          data={data}
          duration={10}
          unPressedBorderColor="gray"
          avatarSize={70}
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
    // flexWrap: "wrap",
    // justifyContent: "center",
    // alignItems: "center",
    // paddingBottom: 20,
    // flexDirection: "row",

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleBlue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginLeft: 10,
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
