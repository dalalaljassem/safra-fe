import { createStackNavigator } from '@react-navigation/stack';
import DestinationsList from '../screens/middleScreens/DestinationsList';
import DestinationDetails from '../screens/middleScreens/DestinationDetails';
import GroupDestinations from '../screens/middleScreens/GroupDestinations';

const MiddleNavigator = () => {
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
      <Screen name="GroupDestinations" component={GroupDestinations} />
      <Screen name="DestinationsList" component={DestinationsList} />
      <Screen name="DestinationDetails" component={DestinationDetails} />
    </Navigator>
  );
};

export default MiddleNavigator;
