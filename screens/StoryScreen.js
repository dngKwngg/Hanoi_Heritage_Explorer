import React, { useState } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Button,
    FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import { categories } from "../constants/categories";

const StoryScreen = () => {
    const [activeCategory, setActiveCategory] = useState(1);

    const renderOverview = (category) => {
        return (
            <View className="pt-5 p-4">
                <Text>{category.content}</Text>
            </View>
        );
    };

    const renderHistory = (category) => {
        return (
            <View className="pt-5 p-4">
                <Text>{category.content}</Text>
            </View>
        );
    };
    const renderCategoryContent = () => {
        const selectedCategory = categories.find(
            (category) => category.id === activeCategory
        );

        if (!selectedCategory) {
            return null;
        }
        if (selectedCategory.id === 1) {
            return renderOverview(selectedCategory);
        } else if (selectedCategory.id === 2) {
            return renderHistory(selectedCategory);
        }
    };
    return (
        <View className="flex-1" style={{ backgroundColor: "white" }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={"rgba(255, 255, 255, 0)"}
                hidden={false}
            />

            {/* Header */}
            <View
                className="w-full flex flex-row items-center justify-center pt-2"
                style={{ backgroundColor: "rgba(255, 255, 255, 1)" }} // Add a semi-transparent background to make text readable
            >
                <TouchableOpacity
                    style={{ position: "absolute", left: 16 }}
                    onPress={() => console.log("Back")}
                >
                    <Icon
                        name="angle-left"
                        size={24}
                        style={{ paddingLeft: 16 }}
                    ></Icon>
                </TouchableOpacity>
                {/* Test text */}
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        marginBottom: 8,
                        color: "black", // Change text color to make it visible on the background
                    }}
                >
                    Hoang Thanh Thang Long
                </Text>
            </View>

            {/* Body */}
            <View>
                {/* Body category */}
                <View className="px-5 mt-6">
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        keyExtractor={(item) => item.id}
                        className="overflow-visible"
                        renderItem={({ item }) => {
                            let isActive = item.id === activeCategory;
                            let activeTextClass = isActive ? "white" : "black";
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setActiveCategory(item.id);
                                    }}
                                    style={{
                                        backgroundColor: isActive
                                            ? COLORS.primary
                                            : "rgba(0, 0, 0, 0.07)",
                                    }}
                                    className="p-2 px-5 rounded-full mr-3"
                                >
                                    <Text
                                        className={"font-semibold"}
                                        style={{ color: activeTextClass }}
                                    >
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    ></FlatList>
                </View>

                {/* Body content */}
                {renderCategoryContent()}
            </View>
        </View>
    );
};

export default StoryScreen;
