import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";

const CategorySlider = ({
    categoriesData,
    activeCategory,
    setActiveCategory,
}) => {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoriesData}
                keyExtractor={(item) => item.id}
                style={styles.slider}
                renderItem={({ item }) => {
                    let isActive = item.id === activeCategory;
                    let activeTextClass = isActive ? "white" : "black";
                    return (
                        <TouchableOpacity
                            onPress={() => setActiveCategory(item.id)}
                            style={{
                                ...styles.button,
                                backgroundColor: isActive
                                    ? COLORS.primary
                                    : "rgba(0, 0, 0, 0.15)",
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.buttonText,
                                    color: activeTextClass,
                                }}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            ></FlatList>
        </View>
    );
};

export default CategorySlider;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 8,
        marginTop: 12,
    },
    slider: {
        overflow: "visible",
    },
    button: {
        padding: 8,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 12,
        borderRadius: 9999,
    },
    buttonText: {
        fontWeight: "600",
    },
});
