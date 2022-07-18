import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import React from 'react';

const focusdColor = '#63C9B3';
const normalColor = 'grey';

export default function CustomeTextInput({
  name,
  secure,
  handleChange,
  useStateName,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.inputNameAndField}>
      <View style={styles.lineWithText}>
        <View style={focused ? styles.lineLeftFocused : styles.lineLeft} />
        <Text style={styles.inputText}>{name}</Text>
        <View style={focused ? styles.lineRightFocused : styles.lineRight} />
      </View>

      <TextInput
        secureTextEntry={secure}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={focused ? styles.inputFocused : styles.input}
        onChangeText={(text) => {
          handleChange(useStateName, text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputNameAndField: {
    width: 220,
    margin: '3%',
  },

  input: {
    height: 40,
    borderWidth: 1,
    fontSize: 20,
    borderTopColor: 'transparent',
    alignItems: 'flex-start',
    // borderRadius: 10,
    borderColor: normalColor,
  },
  inputFocused: {
    height: 40,
    borderWidth: 1,
    fontSize: 20,
    borderTopColor: 'transparent',
    alignItems: 'flex-start',
    borderColor: focusdColor,
  },
  inputText: {
    flex: 9,
    fontSize: 12,
    color: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: normalColor,
  },
  lineRight: {
    flex: 18,
    height: 1,
    backgroundColor: normalColor,
  },
  lineLeftFocused: {
    flex: 1,
    height: 1,
    backgroundColor: focusdColor,
  },
  lineRightFocused: {
    flex: 18,
    height: 1,
    backgroundColor: focusdColor,
  },
  lineWithText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
