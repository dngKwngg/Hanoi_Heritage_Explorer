import React from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";

const Carousel = ({ carouselData }) => {
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = React.useState(0);
    // const carouselData = [
    //     {
    //         id: 1,
    //         image: require("../assets/images/slider_1.jpg"),
    //     },
    //     {
    //         id: 2,
    //         image: require("../assets/images/slider_2.jpg"),
    //     },
    //     {
    //         id: 3,
    //         image: require("../assets/images/slider_3.jpg"),
    //     },
    // ];

    // Display images / UI
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Image
                    source={item.image}
                    style={{ height: 200, width: screenWidth }}
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
                                ? "rgba(110, 109, 110, 0.8)"
                                : "rgba(227, 226, 228, 0.8)",
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
                renderItem={renderItem}
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
                    marginTop: -16,
                }}
            >
                {renderDotIndicators(carouselData)}
            </View>
        </View>
    );
};

export default Carousel;
