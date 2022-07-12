import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../screens/homeScreens/HomePage";
import GroupDetails from "../screens/homeScreens/GroupDetails";
import GroupAddModal from "../components/GroupAddModal";
const HomeNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Screen name="Home" component={HomePage} />
      <Screen name="GroupDetails" component={GroupDetails} />
      <Screen name="GroupAddModal" component={GroupAddModal} />
    </Navigator>
  );
};

export default HomeNavigator;
