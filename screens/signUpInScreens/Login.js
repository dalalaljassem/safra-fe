import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import React from 'react';
import userStore from '../../components/stores/userStore';

export default function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    userStore.login(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logowithName}>
        <Image style={styles.logo} source={require('../../assets/globe.png')} />
        <Text style={styles.appName}>SAFRA</Text>
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputNameAndField}>
          <Text style={styles.inputText}>USERNAME</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              handleChange('username', text);
            }}
          />
        </View>

        <View style={styles.inputNameAndField}>
          <Text style={styles.inputText}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => {
              handleChange('password', text);
            }}
          />
        </View>
        <Pressable onPress={handleSubmit} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: '30%',
  },
  logowithName: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: '3%',
  },
  appName: {
    fontSize: 50,
    fontWeight: '500',
  },
  inputView: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputNameAndField: {
    width: 220,
    margin: '3%',
  },

  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    // borderColor: '#63C9B3',
    marginTop: '3%',
    fontSize: 20,
  },
  inputText: {
    fontSize: 12,
    color: 'grey',
    marginLeft: '2%',
    marginBottom: '1%',
  },

  signInButton: {
    backgroundColor: '#63C9B3',
    justifyContent: 'center',
    alignItems: 'center',
    height: '9%',
    paddingHorizontal: '22%',
    borderRadius: 20,
    marginTop: '10%',
  },
  signInButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
});
