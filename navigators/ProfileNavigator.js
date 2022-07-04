import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/profileScreens/ProfileScreen';

const ProfileNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={ProfileScreen} />
    </Navigator>
  );
};

export default ProfileNavigator;
