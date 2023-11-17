import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TicketScreen from "./screens/TicketScreen";
import ImageScreen from "./screens/ImageScreen";
import { NativeWindStyleSheet } from "nativewind";
import EventScreen from "./screens/EventScreen";
import ReviewScreen from "./screens/ReviewScreen";
import VideoScreen from "./screens/VideoScreen";
const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
	default: "native",
});
function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				// initialRouteName="Splash
				initialRouteName="Image"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Ticket" component={TicketScreen} />
				<Stack.Screen name="Image" component={ImageScreen} />
				<Stack.Screen name="Event" component={EventScreen} />
				<Stack.Screen name="Review" component={ReviewScreen} />
				<Stack.Screen name="Video" component={VideoScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
