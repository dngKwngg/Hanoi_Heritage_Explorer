import React from "react";
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import COLORS from "../constants/colors";

const StoryScreen = () => {
    return (
        <View className="flex-1" style={{ backgroundColor: "white" }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={"white"}
                hidden={false}
            />
            {/* Header */}
            <View
                className="w-full flex flex-row items-center justify-center pt-2"
                style={{ backgroundColor: "white" }}
            >
                <TouchableOpacity style={{ position: "absolute", left: 16 }}>
                    <Icon
                        name="angle-left"
                        size={24}
                        style={{ paddingLeft: 16 }}
                    ></Icon>
                </TouchableOpacity>
                {/* Test text */}
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 8,
                    }}
                >
                    Hoang Thanh Thang Long
                </Text>
            </View>

            {/* Body */}
        </View>
    );
};

export default StoryScreen;
