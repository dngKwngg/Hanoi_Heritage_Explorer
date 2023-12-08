import React from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Image */}
      <View style={{ flex: 3, flexDirection: "column", backgroundColor: "#ddd" }}>
        <Image
          source={require("../assets/images/hanoi3.png")}
          style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "white" }}
        />
      </View>

      {/* btn and text */}
      <View style={{ flex: 2, backgroundColor: "#fff" }}>
        {/* text */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.black,
              fontSize: 20,
              textAlign: "center",
              marginTop: 30
            }}
          >
            Hanoi Heritage Explorer
          </Text>

          <Text
            style={{
              maxWidth: "50%",
              color: "#999",
              textAlign: "center",
              marginTop: 6,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Unearth Hanoi's Past, Explore Its Present
          </Text>
        </View>

        {/* button */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              width: "90%",
              height: 50,
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                letterSpacing: 1.5,
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              Bắt đầu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
