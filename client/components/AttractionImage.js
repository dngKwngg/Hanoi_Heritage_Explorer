import React from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";

const AttractionImage = ({ location }) => {
    const renderItems = (item, idx) => {
        if (idx % 2 === 0) {
            return (
                <View style={styles.row} key={idx}>
                    <Image source={{ uri: item }} style={styles.image} />
                    {location.categories[3].imageList[idx + 1] && (
                        <Image
                            source={{
                                uri: location.categories[3].imageList[idx + 1],
                            }}
                            style={styles.image}
                            key={idx + 1}
                        />
                    )}
                </View>
            );
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            {location.categories[3].imageList.map(renderItems)}
        </ScrollView>
    );
};

const { width } = Dimensions.get("window");
const imageWidth = (width - 16) / 2 - 8; // Assuming 8 as the margin

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 200,
        resizeMode: "cover",
        borderRadius: 15,
        margin: 4,
        width: imageWidth,
    },
    row: {
        flexDirection: "row",
        marginBottom: 8,
    },
});

export default AttractionImage;
