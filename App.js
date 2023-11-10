import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TicketScreen from "./screens/TicketScreen";
import { NativeWindStyleSheet } from "nativewind";
const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
	default: "native",
});
function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				// initialRouteName="Splash
				initialRouteName="Ticket"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Ticket" component={TicketScreen} />
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

// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { Text, View } from "react-native";

// export default function App() {
// 	return (
// 		<View className="flex-1 items-center justify-center bg-red-300">
// 			<Text>Open up App.js to start working on your app!</Text>
// 			<StatusBar style="auto" />
// 		</View>
// 	);
// }
