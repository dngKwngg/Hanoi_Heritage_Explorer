// AttractionHistory.js
import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";

const AttractionArchitecture = ({ location, screenWidth }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <Image
                source={location.categories[2].image}
                style={{ height: 300, width: screenWidth }}
            ></Image>

            {/* TitleContent */}
            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                }}
            >
                <Text style={styles.title}>
                    {location.categories[2].titleContent}
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
                    {location.categories[2].timeReading}
                </Text>
                <Icon
                    name="clock-o"
                    size={20}
                    style={{ color: COLORS.primary }}
                />
            </View>

            {/* Content */}
            <View>
                <Text style={styles.textContent}>
                    {location.categories[2].content}
                </Text>
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
};

export default AttractionArchitecture;
