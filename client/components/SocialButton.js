import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const SocialButton = ({ onPress, source, buttonText }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.social_btn}>
            <Image source={source} style={styles.social_img} />
            <Text style={styles.social_text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

export default SocialButton;

const styles = StyleSheet.create({
    social_btn: {
        height: 55,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ddd",
        marginTop: 30,
    },
    social_img: {
        height: 25,
        width: 25,
        marginLeft: 15,
    },
    social_text: {
        fontSize: 16,
        textAlign: "center",
        width: "80%",
    },
});
