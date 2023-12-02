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
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import CategorySlider from "../components/CategorySlider";
import Hyperlink from "react-native-hyperlink";

const StoryScreen = () => {
    const screenWidth = Dimensions.get("window").width;
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
                {/* Carousel */}
                <Carousel carouselData={location.carouselData} />
                {/* Time reading */}
                <View className="flex flex-row-reverse items-center pt-2">
                    <Text
                        style={{
                            paddingLeft: 15,
                            paddingRight: 12,
                            fontSize: 16,
                        }}
                    >
                        {location.categories[0].timeReading}
                    </Text>
                    <Icon
                        name="clock-o"
                        size={20}
                        style={{ color: "grey" }}
                    ></Icon>
                </View>
                {/* Content */}
                <Text style={styles.textContent}>
                    {location.categories[0].content}
                </Text>
                {/* Hyperlink */}
                <View className="flex flex-row items-center pb-3 pt-3">
                    <Icon
                        name="globe"
                        size={20}
                        style={{ paddingLeft: 16, color: COLORS.primary }}
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
                {/* Location */}
                <View className="flex flex-row items-center pb-3">
                    <Icon
                        name="map-marker"
                        size={24}
                        style={{ paddingLeft: 16, color: COLORS.primary }}
                    ></Icon>

                    <Text style={{ paddingLeft: 15, fontSize: 16 }}>
                        {location.locateAt}
                    </Text>
                </View>
                {/* Phone */}
                <View className="flex flex-row items-center pb-3">
                    <Icon
                        name="phone-square"
                        size={18}
                        style={{ paddingLeft: 16, color: COLORS.primary }}
                    ></Icon>

                    <Text style={{ paddingLeft: 15, fontSize: 16 }}>
                        {location.phone}
                    </Text>
                </View>
                {/* Time */}
                <View className="flex flex-row items-center pb-3">
                    <Icon
                        name="clock-o"
                        size={18}
                        style={{ paddingLeft: 16, color: COLORS.primary }}
                    ></Icon>

                    <Text style={{ paddingLeft: 15, fontSize: 16 }}>
                        {location.time}
                    </Text>
                </View>
            </ScrollView>
        );
    };

    // Render history
    const renderHistory = (location) => {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Image
                    source={location.categories[1].image}
                    style={{ height: 300, width: screenWidth }}
                ></Image>
                <View className="flex flex-row-reverse items-center pt-2">
                    <Text
                        style={{
                            paddingLeft: 15,
                            paddingRight: 12,
                            fontSize: 16,
                        }}
                    >
                        {location.categories[1].timeReading}
                    </Text>
                    <Icon
                        name="clock-o"
                        size={20}
                        style={{ color: "grey" }}
                    ></Icon>
                </View>
                <View>
                    <Text
                        style={{
                            ...styles.textContent,
                        }}
                    >
                        {location.categories[1].content}
                    </Text>
                </View>
            </ScrollView>
        );
    };

    // Render architecture
    const renderArchitecture = (location) => {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Image
                    source={location.categories[2].image}
                    style={{ height: 300, width: screenWidth }}
                ></Image>
                <View className="flex flex-row-reverse items-center pt-2">
                    <Text
                        style={{
                            paddingLeft: 15,
                            paddingRight: 12,
                            fontSize: 16,
                        }}
                    >
                        {location.categories[2].timeReading}
                    </Text>
                    <Icon
                        name="clock-o"
                        size={20}
                        style={{ color: "grey" }}
                    ></Icon>
                </View>
                <View>
                    <Text
                        style={{
                            ...styles.textContent,
                        }}
                    >
                        {location.categories[2].content}
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
        } else if (activeCategory === 2) {
            return renderHistory(location);
        } else if (activeCategory === 3) {
            return renderArchitecture(location);
        } else {
            return (
                <ScrollView style={{ flex: 1, paddingLeft: 16 }}>
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
            <Header
                onPress={() => console.log("Back")}
                headerContent={locations[index].name}
            />
            {/* Body */}
            <View style={{ flex: 1 }}>
                {/* Body category */}

                <CategorySlider
                    categoriesData={locations[index].categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                {/* Body content */}
                {renderLocation(locations[index], activeCategory)}
            </View>
        </View>
    );
};

export default StoryScreen;

const styles = StyleSheet.create({
    textContent: {
        fontSize: 18,
        lineHeight: 30,
        marginTop: 12,
        marginLeft: 16,
        marginRight: 12,
        textAlign: "justify",
    },
});
