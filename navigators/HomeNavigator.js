import { createStackNavigator } from '@react-navigation/stack';
import DestinationsList from '../screens/homeScreens/DestinationsList';
import DestinationDetails from '../screens/homeScreens/DestinationDetails';

const HomeNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={DestinationsList} />
      <Screen name="DestinationDetails" component={DestinationDetails} />
    </Navigator>
  );
};

export default HomeNavigator;
