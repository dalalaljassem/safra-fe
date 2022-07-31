import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./navigators/BottomNav";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@rneui/themed";
import userStore from "./components/stores/userStore";
import { observer } from "mobx-react";
import Toast from "react-native-toast-message";
import SignUpInNavigator from "./navigators/SignUpInNavigator";

function App() {
  const checkUser = userStore.user;

  return (
    <NativeBaseProvider>
      <ThemeProvider>
        <PaperProvider>
          <NavigationContainer>
            {checkUser ? <BottomNav /> : <SignUpInNavigator />}
            <Toast />
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
export default observer(App);
