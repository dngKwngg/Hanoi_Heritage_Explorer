// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Splash from "./screens/Splash";
import StoryScreen from "./screens/StoryScreen";
import TestScreen from "./screens/TestScreen";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignupScreen} />
                <Stack.Screen name="Story" component={StoryScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

    // return (
    //     <View
    //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    //     >
    //         <Text>Hello World!</Text>
    //     </View>
    // );
}

export default App;
