import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import Buttons from "../components/Buttons";

const OnboardingScreen = ({ navigation }) => {
    return (
        <View className="flex-1" style={{ backgroundColor: COLORS.white }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* Image */}
            <View
                style={{
                    flex: 3,
                    flexDirection: "column",
                    backgroundColor: "#ddd",
                }}
            >
                <Image
                    source={require("../assets/images/hanoi.png")}
                    className="flex-1 w-full h-full"
                    style={{ backgroundColor: "#fff" }}
                />
            </View>
            {/* btn and text */}
            <View style={{ flex: 2, backgroundColor: "#fff" }}>
                {/* text */}
                <View
                    className="flex-1 flex-col justify-start items-center"
                    style={{ backgroundColor: "#fff" }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: COLORS.black,
                            fontSize: 20,
                            alignContent: "center",
                        }}
                    >
                        Hanoi Heritage Explorer
                    </Text>

                    <Text
                        style={{
                            maxWidth: "50%",
                            color: "#999",
                            textAlign: "center",
                            marginTop: 20,
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        Unearth Hanoi's Past, Explore Its Present
                    </Text>
                </View>

                {/* button */}
                <View className="flex-1 flex-col justify-center items-center">
                    <TouchableOpacity
                        className="justify-center h-[50]"
                        style={{
                            width: "90%",
                            backgroundColor: COLORS.primary,
                            marginBottom: 30,
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text
                            className="text-center relative"
                            style={{
                                fontSize: 15,
                                letterSpacing: 1.5,
                                color: COLORS.white,
                                fontWeight: "bold",
                            }}
                        >
                            Get Started
                        </Text>
                    </TouchableOpacity>
                    {/* <Buttons
                        buttonText={"Get Started"}
                        onPress={() => navigation.navigate("Login")}
                    /> */}
                </View>
            </View>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
