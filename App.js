import * as React from "react";
import { useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Splash from "./screens/Splash";
import StoryScreen from "./screens/StoryScreen";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen"
import TestScreen from "./screens/TestScreen";

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
                <Stack.Screen name="Story" component={StoryScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
                
                <Stack.Screen name="Test" component={TestScreen} />
                

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

export default App