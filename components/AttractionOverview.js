// LocationOverview.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import PathCarousel from "./PathCarousel";

const AttractionOverview = ({ location }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            {/* Carousel */}
            <PathCarousel carouselData={location.carouselData} />

            {/* TitleContent */}
            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                }}
            >
                <Text style={styles.title}>
                    {location.categories[0].titleContent}
                </Text>
            </View>

            {/* Time reading */}
            <View
                style={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    paddingTop: 8,
                }}
            >
                <Text style={styles.timeReading}>
                    {location.categories[0].timeReading}
                </Text>
                <Icon
                    name="clock-o"
                    size={20}
                    style={{ color: COLORS.primary }}
                />
            </View>

            {/* Content */}
            <Text style={styles.textContent}>
                {location.categories[0].content}
            </Text>

            {/* Location */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 12,
                    paddingTop: 4,
                }}
            >
                <Icon
                    name="map-marker"
                    size={24}
                    style={styles.iconAdditionInfo}
                />
                <Text style={styles.textAdditionalInfo}>
                    {location.locateAt}
                </Text>
            </View>

            {/* Phone */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 12,
                }}
            >
                <Icon
                    name="phone-square"
                    size={20}
                    style={styles.iconAdditionInfo}
                />
                <Text style={styles.textAdditionalInfo}>{location.phone}</Text>
            </View>

            {/* Time */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingBottom: 12,
                }}
            >
                <Icon
                    name="clock-o"
                    size={20}
                    style={styles.iconAdditionInfo}
                />
                <Text style={styles.textAdditionalInfo}>{location.time}</Text>
            </View>
        </ScrollView>
    );
};

const styles = {
    title: {
        fontFamily: "Montserrat-Bold",
        fontSize: 22,
    },
    timeReading: {
        paddingLeft: 15,
        paddingRight: 12,
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
        color: COLORS.primary,
    },
    textContent: {
        fontSize: 18,
        lineHeight: 30,
        marginTop: 12,
        marginLeft: 16,
        marginRight: 12,
        textAlign: "justify",
        fontFamily: "Montserrat-Regular",
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
};

export default AttractionOverview;
