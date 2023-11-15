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
    Image,
    Dimensions,
    Linking,
    Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import { locations } from "../constants/locations";
import { ca } from "date-fns/locale";
import Carousel from "../components/Carousel";
import Hyperlink from "react-native-hyperlink";

const StoryScreen = () => {
    const index = 0;
    const [activeCategory, setActiveCategory] = useState(1);

    // Handle press hyperlink
    const handlePress = () => {
        const url = "https://hoangthanhthanglong.com";
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    // Render overview

    const renderOverview = (location) => {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Carousel carouselData={location.carouselData} />
                <Text
                    style={{
                        fontSize: 18,
                        lineHeight: 30,
                        marginTop: 12,
                        paddingLeft: 16,
                        paddingRight: 12,
                        paddingBottom: 12,
                    }}
                >
                    {location.categories[0].content}
                </Text>
                <View className="flex flex-row items-center pb-3">
                    <Icon
                        name="globe"
                        size={20}
                        style={{ paddingLeft: 16 }}
                    ></Icon>

                    <TouchableOpacity
                        style={{ paddingLeft: 12 }}
                        onPress={handlePress}
                    >
                        <Text style={{ fontSize: 16, color: "blue" }}>
                            {location.url}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center pb-3">
                    <Icon
                        name="map-marker"
                        size={24}
                        style={{ paddingLeft: 16 }}
                    ></Icon>

                    <Text style={{ paddingLeft: 15, fontSize: 16 }}>
                        {location.locateAt}
                    </Text>
                </View>
            </ScrollView>
        );
    };
    // Render by category
    const renderLocationContentByCategory = (location, activeCategory) => {
        const selectedCategory = location.categories.find(
            (category) => category.id === activeCategory
        );

        if (!selectedCategory) {
            return null;
        }
        if (activeCategory === 1) {
            return renderOverview(location);
        } else {
            return (
                <ScrollView style={{ flex: 1 }}>
                    {/* <Text>{location.name}</Text> */}
                    <Text>{selectedCategory.content}</Text>
                </ScrollView>
            );
        }
    };

    const renderLocation = (location, activeCategory) => {
        if (!location || typeof location !== "object") {
            return null;
        }

        return renderLocationContentByCategory(location, activeCategory);
    };

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
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
            <View style={{ flex: 1 }}>
                {/* Body category */}
                <View
                    className="px-5 mt-3 pb-2"
                    style={{ backgroundColor: "#fff" }}
                >
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

                {/* <ScrollView style={{ flex: 1 }}>
                    <Carousel />
                    <Text style={{ fontSize: 20 }}>
                        {locations[index].categories[0].source}
                    </Text>
                </ScrollView> */}
                {/* {this.renderScrollViewContent()} */}
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
