import React, { useState } from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Card } from "react-native-elements";

const AttractionVideo = ({ location }) => {
    const [playing, setPlaying] = useState(false);

    const renderItemVideo = (item, idx) => {
        return (
            <View style={styles.container} key={idx}>
                <Card
                    containerStyle={{
                        borderRadius: 30,
                        height: 280,
                        backgroundColor: "#f8f9fb",
                    }}
                >
                    <YoutubePlayer
                        height={200}
                        play={playing}
                        videoId={item.url}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                </Card>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View>{location.categories[4].videoList.map(renderItemVideo)}</View>
            {/* <Text>Video</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 16,
        fontWeight: "400",
        marginBottom: 30,
        textAlign: "center",
        fontFamily: "Montserrat-Regular",
    },
});

export default AttractionVideo;
