import * as React from "react";
import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "./screens/NotificationScreen";
import EventScreen from "./screens/EventScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Splash from "./screens/Splash";
import AttractionScreen from "./screens/AttractionScreen";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);
const Stack = createNativeStackNavigator();

function App() {
    const [fontsLoaded] = useFonts({
        "Gelix-Regular": require("./assets/fonts/Gellix-Regular.ttf"),
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
        // Add more fonts if needed
    });

    if (!fontsLoaded) {
        // You can return a loading screen or null while fonts are loading
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Attraction" component={AttractionScreen} />
                <Stack.Screen name="Event" component={EventScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen
                    name="Notification"
                    component={NotificationScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
