import { SafeAreaView } from "react-native";
// import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./navigators/BottomNav";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
