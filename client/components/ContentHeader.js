import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = ({ onPress, headerContent }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Icon
                    name="angle-left"
                    size={24}
                    style={{ paddingLeft: 20, paddingRight: 20 }}
                ></Icon>
            </TouchableOpacity>
            <Text style={styles.headerText}>{headerContent}</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 8,
        backgroundColor: "rgba(255, 255, 255, 1)",
    },
    button: {
        position: "absolute",
        left: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
        color: "black",
    },
});
