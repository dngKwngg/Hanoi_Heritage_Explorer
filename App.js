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
import TestScreen from "./screens/TestScreen";

const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
	default: "native",
});
function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				// initialRouteName="Splash
				initialRouteName="Notification"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Ticket" component={TicketScreen} />
				<Stack.Screen name="Image" component={ImageScreen} />
				<Stack.Screen
					name="Notification"
					component={NotificationScreen}
				/>
				<Stack.Screen name="Feedback" component={FeedbackScreen} />
				<Stack.Screen name="Video" component={VideoScreen} />
				<Stack.Screen name="Event" component={EventScreen} />
				<Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignupScreen} />
				<Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Story" component={StoryScreen} />
                <Stack.Screen name="Carousel" component={Carousel} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
