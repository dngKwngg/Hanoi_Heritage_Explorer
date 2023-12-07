import { View, Text, StatusBar } from "react-native";
import * as React from "react";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";

import ChangePassword from "../../screens/account/ChangePassword";
import Account from "../../screens/account/Account";
import Verification from "../../screens/account/Verification";
import ResetPassWithoutBacktoLogin from "../../screens/account/ResetPassWithoutBacktoLogin";
import Profile from "../../screens/Profile";
import Settings from "../../screens/settings/Settings";
import NotificationSettings from "../../screens/settings/NotificationSettings";
import DarkModeSettings from "../../screens/settings/DarkModeSettings";
import LanguageSettings from "../../screens/settings/LanguageSettings";
import Splash from "../../screens/Splash";
import OnboardingScreen from "../../screens/OnboardingScreen"
import ForgotPassword from "../../screens/auth/ForgotPassword";
import ResetPassword from "../../screens/auth/ResetPassword";
import FontSizeSettings from "../../screens/settings/FontSizeSettings";
import AppUpdatesSettings from "../../screens/settings/AppUpdatesSettings";
import MapScreen from "../../screens/MapScreen"
import { useFonts } from "expo-font";
import NotificationScreen from "../../screens/NotificationScreen";
import EventScreen from "../../screens/EventScreen";
import AttractionScreen from "../../screens/AttractionScreen";
const ScreenMenu = () => {

  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    "Gelix-Regular": require("../../assets/fonts/Gellix-Regular.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    // Add more fonts if needed
  });

  if (!fontsLoaded) {
    // You can return a loading screen or null while fonts are loading
    return null;
  }
  return (
    <Stack.Navigator>



      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={AttractionScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Event"
            component={EventScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassWithoutBacktoLogin"
            component={ResetPassWithoutBacktoLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notification Settings"
            component={NotificationSettings}
          />
          <Stack.Screen
            name="Appearance Settings"
            component={DarkModeSettings}
          />
          <Stack.Screen
            name="App Language Settings"
            component={LanguageSettings}
          />
          <Stack.Screen
            name="Font Size Settings"
            component={FontSizeSettings}
          />
          <Stack.Screen
            name="App Updates Settings"
            component={AppUpdatesSettings}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
