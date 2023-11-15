import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";

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
				initialRouteName="Video"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Video" component={VideoScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
