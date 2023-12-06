import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Button
                title="Go to StoryScreen (Index 0)"
                onPress={() => navigation.navigate("Story", { index: 0 })}
            />
            <Button
                title="Go to StoryScreen (Index 1)"
                onPress={() => navigation.navigate("Story", { index: 1 })}
            />
            <Button
                title="Go to MapScreen (Index 2)"
                onPress={() => navigation.navigate("Map", { index: 2 })}
            />

            <Button
                title="Go to Menu Screen (Index 3)"
                onPress={() => navigation.navigate("ScreenMenu", { index: 3 })}
            />
            {/* Add more buttons for different indices as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default HomeScreen;
