import React, { useState } from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Button,
    FlatList,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import { locations } from "../constants/locations";
import { ca } from "date-fns/locale";
import Carousel from "../components/Carousel";

const StoryScreen = () => {
    const index = 0;
    const [activeCategory, setActiveCategory] = useState(1);

    const renderLocationContentByCategory = (location) => {
        const selectedCategory = location.categories.find(
            (category) => category.id === activeCategory
        );

        if (!selectedCategory) {
            return null;
        }
        if (activeCategory === 1) {
            return (
                // <ScrollView style={{ flex: 1 }}>
                <View>
                    <Carousel />
                    <View className="pt-5 p-4">
                        <Text style={{ fontSize: 36 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </Text>
                    </View>
                </View>
                // </ScrollView>
            );
        } else {
            return (
                <ScrollView className="pt-5 p-4">
                    {/* <Text>{location.name}</Text> */}
                    <Text>{selectedCategory.content}</Text>
                </ScrollView>
            );
        }
    };

    const renderLocation = (location) => {
        if (!location || typeof location !== "object") {
            return null;
        }

        return (
            <View key={location.id}>
                {renderLocationContentByCategory(location)}
            </View>
        );
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
                    {locations[index].name}
                </Text>
            </View>

            {/* Body */}
            <View>
                {/* Body category */}
                <View className="px-5 mt-3" style={{ backgroundColor: "#fff" }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={locations[index].categories}
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
                {renderLocation(locations[index], activeCategory)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: "pink",
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});

export default StoryScreen;
