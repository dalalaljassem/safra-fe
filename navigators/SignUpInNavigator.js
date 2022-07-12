import { createStackNavigator } from "@react-navigation/stack";
import FirstPage from "../screens/signUpInScreens/FirstPage";
import Login from "../screens/signUpInScreens/Login";
import SignUp from "../screens/signUpInScreens/SignUp";
import ProfileScreen from "../screens/profileScreens/ProfileScreen";

const SignUpInNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Screen name="FrontPage" component={FirstPage} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="Login" component={Login} />
      <Screen name="pro" component={ProfileScreen} />
    </Navigator>
  );
};

export default SignUpInNavigator;
