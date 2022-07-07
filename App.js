// import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './navigators/BottomNav';
import SignUpInNavigator from './navigators/SignUpInNavigator';
import userStore from './stores/userStore';
import { observer } from 'mobx-react';
import Toast from 'react-native-toast-message';

function App() {
  const checkUser = userStore.user;

  return (
    <NavigationContainer>
      {checkUser ? <BottomNav /> : <SignUpInNavigator />}

      <Toast />
    </NavigationContainer>
  );
}

export default observer(App);
