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
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import UrlCarousel from "../components/UrlCarousel";
import HTML from "react-native-render-html";
import { eventOfDestinations } from "../constants/eventOfDestinations";
import Header from "../components/Header";
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
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#fff"
                hidden={false}
            />
            {/* Header */}
            <Header
                onPress={() => navigation.navigate("Notification")}
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
