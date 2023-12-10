import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Text,
    StatusBar,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import UrlCarousel from "../components/UrlCarousel";
import HTML from "react-native-render-html";
import Header from "../components/ContentHeader";
const EventScreen = ({ route, navigation }) => {
    // const currentIndex = 4; // You can set the initial index here
    const { currentIndex, sortedAndFilteredEventOfDestinations } = route.params;
    const { width: windowWidth } = useWindowDimensions();

    const tagsStyles = {
        h1: {
            marginLeft: 3,
            color: "black",
            fontSize: 20,
        },
        div: {
            marginLeft: 5,
            marginTop: 10,
            borderLeftWidth: 5,
            borderColor: "#ff5b00",
        },
        p: {
            fontSize: 16,
            lineHeight: 30,
            marginTop: 12,
            marginLeft: 16,
            marginRight: 12,
            textAlign: "justify",
        },
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor='#b1b3b5' />
            {/* Header */}
            <Header
                onPress={() => navigation.navigate("Notifications")}
                headerContent={""}
            />

            {/* Body */}
            <ScrollView>
                <UrlCarousel
                    carouselData={
                        sortedAndFilteredEventOfDestinations[currentIndex]
                            .carouselData
                    }
                    // onIndexChanged={handleIndexChanged}
                />

                <HTML
                    source={{
                        html: sortedAndFilteredEventOfDestinations[currentIndex]
                            .content,
                    }}
                    contentWidth={windowWidth}
                    tagsStyles={tagsStyles}
                />
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({});
export default EventScreen;
