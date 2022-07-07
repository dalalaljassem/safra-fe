import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/homeScreens/Home';

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
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  );
};

export default HomeNavigator;
