import React from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";
import COLORS from "../constants/colors";

const Splash = ({ navigation }) => {
    setTimeout(() => {
        navigation.replace("Onboarding"); // replace the current screen with "Onboarding"
    }, 3000);
    return (
        <View
            className="flex-1 flex-col justify-center items-center"
            style={{ backgroundColor: COLORS.primary }}
        >
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#329bcc"
            />
            <Image
                source={require("../assets/images/icon2.png")}
                className="h-[400] w-[200]"
            />
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({});
