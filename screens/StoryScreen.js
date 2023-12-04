import React, { useState } from "react";
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import { locations } from "../constants/locations";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import CategorySlider from "../components/CategorySlider";
import AttractionOverview from "../components/AttractionOverview";
import AttractionHistory from "../components/AttractionHistory";
import AttractionArchitecture from "../components/AttractionArchitecture";

const StoryScreen = () => {
    const screenWidth = Dimensions.get("window").width;
    const index = 0;
    const [activeCategory, setActiveCategory] = useState(1);

    // Render overview

    const renderOverview = (location) => {
        return <AttractionOverview location={location} />;
    };

    // Render history
    const renderHistory = (location) => {
        return (
            <AttractionHistory location={location} screenWidth={screenWidth} />
        );
    };

    // Render architecture
    const renderArchitecture = (location) => {
        return (
            <AttractionArchitecture
                location={location}
                screenWidth={screenWidth}
            />
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
        fontFamily: "Montserrat-Regular",
    },
    title: {
        fontFamily: "Montserrat-Bold",
        fontSize: 22,
    },
    textAdditionalInfo: {
        fontFamily: "Montserrat-Regular",
        fontSize: 16,
        paddingLeft: 15,
    },
    iconAdditionInfo: {
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 8,
        marginLeft: 16,
        color: COLORS.primary,
        backgroundColor: "#ddd",
    },
});
