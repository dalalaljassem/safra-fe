import { AspectRatio, Center, Stack, Heading, HStack, Box } from "native-base";
import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";

export default function ActivityItem({ activity }) {
  return (
    // style={styles.container}
    <View style={styles.marg}>
      <Box
        width={350}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: activity.images[0].source_url,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {activity.name}
            </Heading>
            <Text
              style={{ color: "#63C9B3" }}
              fontSize="xs"
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {activity.location_id}
            </Text>
          </Stack>
          <Text fontWeight="400">{activity.snippet}</Text>
          <HStack
            alignItems="center"
            space={4}
            justifyContent="space-between"
          ></HStack>
          <HStack alignItems="center"></HStack>
        </Stack>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  marg: {
    marginBottom: 60,
  },
});
