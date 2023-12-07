import RootNavigation from "./navigation";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  LogBox.ignoreAllLogs();
  return (

    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}