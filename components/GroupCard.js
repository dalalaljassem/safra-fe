import React, { useState, useEffect } from "react";
import { VStack, Box, Divider, Select, CheckIcon } from "native-base";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import CalendarModal from "./CalendarModal";

export default function () {
  let [service, setService] = React.useState("");
  return (
    <View style={StyleSheet.container}>
      <Box border="1" borderRadius="md" style={styles.card}>
        <VStack space="4" divider={<Divider />}>
          <Box px="4" pt="4">
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Budget:</Text>
          </Box>
          <Box px="4">
            <Select
              marginBottom="5"
              selectedValue={service}
              minWidth="200"
              accessibilityLabel="Choose Currency"
              placeholder="Choose Currency"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              <Select.Item label="KWD" value="KWD" />
              <Select.Item label="USD" value="USD" />
            </Select>
            <TextInput
              style={{ backgroundColor: "white" }}
              placeholder="Set budget..."
              keyboardType="numeric"
            />
          </Box>
        </VStack>
      </Box>

      <View>
        <Box border="1" borderRadius="md" style={styles.card2}>
          <VStack space="4" divider={<Divider />}>
            <Box px="4" pt="4">
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Set Date:
              </Text>
            </Box>
            <Box px="4">
              <CalendarModal />
            </Box>
          </VStack>
        </Box>
      </View>
      <View style={styles.btn}>
        <Button
          //   onPress={onPressLearnMore}
          title="Confirm"
          color="#63C9B3"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  card2: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingBottom: 10,

    marginTop: 30,
    fontWeight: "bold",
    color: "white",
  },
  btn: {
    marginTop: 30,
  },
});
