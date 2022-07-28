import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import MiddleNavigator from "./MiddleNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  const iconSize = 38;
  const tabButtonActive = "#1e2029";
  const tabButtonInactive = "#8D9C98";
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tab,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={iconSize} />
          ),

          tabBarActiveTintColor: tabButtonActive,
          tabBarInactiveTintColor: tabButtonInactive,
        }}
      />
      <Tab.Screen
        name="middle"
        component={MiddleNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plane" size={iconSize} color={color} />
          ),
          tabBarActiveTintColor: tabButtonActive,
          tabBarInactiveTintColor: tabButtonInactive,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={iconSize}
              color={color}
            />
          ),
          tabBarActiveTintColor: tabButtonActive,
          tabBarInactiveTintColor: tabButtonInactive,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#fffffc",
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: "3%",
  },
});
