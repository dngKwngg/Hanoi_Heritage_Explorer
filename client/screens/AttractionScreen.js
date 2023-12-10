import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import Header from "../components/ContentHeader";
import CategorySlider from "../components/CategorySlider";
import AttractionOverview from "../components/AttractionOverview";
import AttractionHistory from "../components/AttractionHistory";
import AttractionArchitecture from "../components/AttractionArchitecture";
import AttractionTicket from "../components/AttractionTicket";
import AttractionImage from "../components/AttractionImage";
import AttractionVideo from "../components/AttractionVideo";
import AttractionFeedback from "../components/AttractionFeedback";
import FooterMenu from "../components/Menus/FooterMenu";

import { locations } from "../constants/locations";

const AttractionScreen = ({ route, navigation }) => {

    const index = route.params.placeId;
    const screenWidth = Dimensions.get("window").width;
    const [activeCategory, setActiveCategory] = useState(1);

    // Render by category
    const renderLocationContentByCategory = (location, activeCategory) => {
        const selectedCategory = location.categories.find(
            (category) => category.id === activeCategory
        );

        if (!selectedCategory) {
            return null;
        }

        switch (activeCategory) {
            case 1:
                return <AttractionOverview location={location} />;
            case 2:
                return (
                    <AttractionHistory
                        location={location}
                        screenWidth={screenWidth}
                    />
                );
            case 3:
                return (
                    <AttractionArchitecture
                        location={location}
                        screenWidth={screenWidth}
                    />
                );
            case 4:
                return <AttractionImage location={location} />;
            case 5:
                return <AttractionVideo location={location} />;
            case 6:
                return <AttractionTicket location={location} />;
            case 7:
                return <AttractionFeedback location={location} />;
            default:
                return (
                    <ScrollView style={{ flex: 1, paddingLeft: 16 }}>
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
                onPress={() => navigation.goBack()}
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
            <View style={{ backgroundColor: "#ffffff" }}>
                <FooterMenu />
            </View>
        </View>
    );
};

export default AttractionScreen;

const styles = StyleSheet.create({
    // Your styles here
});
