import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputLoginSignup = ({
    iconName,
    placeholder,
    onChangeText,
    secureTextEntry,
}) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={24} color="#818181" />
            <TextInput
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="#818181"
                style={styles.input}
            />
        </View>
    );
};

export default InputLoginSignup;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ededed",
        width: "95%",
        borderRadius: 10,
        paddingLeft: 20,
        height: 80,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        position: "relative",
        height: "100%",
        width: "90%",
        paddingLeft: 20,
    },
});
