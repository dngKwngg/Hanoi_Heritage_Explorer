import { View, Text } from "react-native";
import * as React from "react";
import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";

import ChangePassword from "../../screens/account/ChangePassword";
import Account from "../../screens/account/Account";
import Verification from "../../screens/account/Verification";
import ResetPassWithoutBacktoLogin from "../../screens/account/ResetPassWithoutBacktoLogin";
import Profile from "../../screens/Profile";
import Settings from "../../screens/Settings";
import Myposts from "../../screens/Myposts";
import Splash from "../../screens/Splash";
import OnboardingScreen from "../../screens/OnboardingScreen"
import ForgotPassword from "../../screens/auth/ForgotPassword";
import ResetPassword from "../../screens/auth/ResetPassword";
const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>



      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
   
          />
          
          <Stack.Screen
            name="Myposts"
            component={Myposts}
    
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
