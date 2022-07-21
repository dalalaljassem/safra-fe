import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../screens/homeScreens/HomePage";
import GroupDetails from "../screens/homeScreens/GroupDetails";

const ChatNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    // <Navigator
    //   screenOptions={{
    //     headerTitle: "",
    //     headerTransparent: true,
    //     cardStyle: {
    //       backgroundColor: "white",
    //     },
    //   }}
    // >
    //   <Screen name="Home" component={DestinationsList} />
    //   <Screen name="DestinationDetails" component={DestinationDetails} />
    // </Navigator>
    <Stack.Navigator>
      <Stack.Screen name="Groups" component={HomePage} />
      <Stack.Screen
        name="Chat"
        component={GroupDetails}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

// const MessageStack = ({navigation}) => (

//   );

export default ChatNavigator;
