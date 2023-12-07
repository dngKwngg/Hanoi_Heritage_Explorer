import * as React from "react";
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
import { LogBox } from "react-native";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
