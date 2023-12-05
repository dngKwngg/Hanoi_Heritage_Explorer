import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TicketScreen from "./screens/TicketScreen";
import ImageScreen from "./screens/ImageScreen";
import { NativeWindStyleSheet } from "nativewind";
import NotificationScreen from "./screens/NotificationScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import VideoScreen from "./screens/VideoScreen";
import EventScreen from "./screens/EventScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Splash from "./screens/Splash";
import StoryScreen from "./screens/StoryScreen";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";

const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
	default: "native",
});
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
                <Stack.Screen name="Story" component={StoryScreen} />
                <Stack.Screen name="Carousel" component={Carousel} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
