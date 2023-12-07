import React from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import COLORS from "../constants/colors";
const UrlCarousel = ({ carouselData }) => {
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = React.useState(0);

    // Display images / UI
    const renderItemByUrl = ({ item, index }) => {
        return (
            <View>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: 250, width: screenWidth }}
                />
            </View>
        );
    };

    // Handle Scroll
    const handleScroll = (event) => {
        // Get the scroll position
        const scrollPosition = event.nativeEvent.contentOffset.x;
        // console.log({ scrollPosition });
        // Get the index of current active item

        const index = Math.round(scrollPosition / screenWidth);

        // console.log({ index });
        // Update the index

        setActiveIndex(index);
    };

    // Render dot indicators
    const renderDotIndicators = (carouselData) => {
        return carouselData.map((dot, index) => {
            // if the active index === index

            return (
                <View
                    key={index}
                    style={{
                        backgroundColor:
                            activeIndex === index
                                ? COLORS.primary
                                : "rgba(227, 226, 228, 0.9)",
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}
                ></View>
            );
        });
    };

    return (
        <View>
            {/* <Image source={carouselData[0].image} /> */}
            <FlatList
                data={carouselData}
                renderItem={renderItemByUrl}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                style={{ marginTop: 4 }}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 16,
                }}
            >
                {renderDotIndicators(carouselData)}
            </View>
        </View>
    );
};

export default UrlCarousel;
