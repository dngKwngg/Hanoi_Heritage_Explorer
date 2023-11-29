import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";
const Buttons = ({ buttonText, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 50,
                justifyContent: "center",
                width: "95%",
                backgroundColor: COLORS.primary,
                marginTop: 20,
                marginBottom: 30,
                borderRadius: 10,
            }}
            onPress={onPress}
        >
            <Text
                // className="text-center relative"
                style={{
                    textAlign: "center",
                    position: "relative",
                    fontSize: 15,
                    letterSpacing: 1.5,
                    color: COLORS.white,
                    fontWeight: "bold",
                }}
            >
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default Buttons;

const styles = StyleSheet.create({});
