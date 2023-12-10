import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import COLORS from "../constants/colors";

const Splash = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace("Onboarding"); // replace the current screen with "Onboarding"
  }, 1500);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: StatusBar.height,
        backgroundColor: COLORS.primary
        
      }}
    >
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#329bcc" />
      <Image
        source={require("../assets/images/icon2.png")}
        style={{ height: 400, width: 200 }}
      />
    </View>
  );
};

export default Splash;
