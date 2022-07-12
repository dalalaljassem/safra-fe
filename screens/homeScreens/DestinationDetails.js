import { SafeAreaView, Text, StyleSheet, Image, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DestinationDetails({ route }) {
  const destination = route.params.destination;
  const city = route.params.imageUrl;

  return (
    <View style={styles.container}>
      <Image
        style={styles.destinationImage}
        source={{
          uri: city,
        }}
      />
      <View style={styles.namePrice}>
        <View>
          <Text>{destination}</Text>
          <Text>Country Name</Text>
        </View>
        <Text>$300</Text>
      </View>
      <View style={styles.attractions}>
        <Text>Attractions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  destinationImage: {
    flex: 2,
    width: '100%',
    height: 100,
  },
  namePrice: {
    padding: 10,
    flex: 3,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attractions: {
    flex: 1,
  },
});
