import { createStackNavigator } from '@react-navigation/stack';

import MiddleScreen from '../screens/middleScreens/MiddleScreen';

const MiddleNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={MiddleScreen} />
    </Navigator>
  );
};

export default MiddleNavigator;
