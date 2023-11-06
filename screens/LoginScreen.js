import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import Animated, {
    FadeIn,
    FadeInUp,
    FadeInDown,
    FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Buttons from "../components/Buttons";
const LoginScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    return (
        <ScrollView
            className="flex-1 flex-col"
            style={{ backgroundColor: "#fff" }}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* login form */}
            <View
                className="flex-col"
                style={{
                    flex: 2,
                    backgroundColor: "#fff",
                    paddingTop: 10,
                    paddingHorizontal: "3%",
                }}
            >
                {/* text */}
                <View
                    className="flex-row, justify-start"
                    style={{ backgroundColor: "#fff", marginTop: 10 }}
                >
                    <Text
                        className="font-bold"
                        style={{ fontSize: 30, color: COLORS.black }}
                    >
                        Welcome back!
                    </Text>
                </View>
                <Text style={{ fontSize: 14, paddingTop: 10, color: "#777" }}>
                    I am happy to see you again. You can continue your trip by
                    logging in
                </Text>

                {/* forms */}
                <View className="flex-col" style={{ paddingTop: 20 }}>
                    <View
                        className="flex-row items-center justify-center"
                        style={{
                            backgroundColor: "#ededed",
                            width: "95%",
                            borderRadius: 10,
                            paddingLeft: 20,
                            height: 80,
                        }}
                    >
                        <Icon name="envelope-o" size={24} color="#818181" />
                        <TextInput
                            onChangeText={(text) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    email: text,
                                }))
                            }
                            style={styles.input}
                            placeholder="Enter Email"
                            placeholderTextColor="#818181"
                        />
                    </View>

                    <View
                        className="flex-row items-center justify-center"
                        style={{
                            backgroundColor: "#ededed",
                            width: "95%",
                            borderRadius: 10,
                            paddingLeft: 20,
                            height: 80,
                            marginTop: 20,
                            marginBottom: 50,
                        }}
                    >
                        <Icon name="lock" size={22} color="#818181" />
                        <TextInput
                            onChangeText={(text) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    password: text,
                                }))
                            }
                            style={styles.input}
                            placeholder="Enter Password"
                            placeholderTextColor="#818181"
                            secureTextEntry={true}
                        />
                    </View>

                    {/* btn */}
                    <Buttons
                        buttonText={"Log in"}
                        onPress={() => {
                            console.log(formData);
                            navigation.navigate("Story");
                        }}
                    />
                </View>
            </View>

            {/* social login form*/}
            <View
                className="flex-col"
                style={{
                    flex: 2,
                    backgroundColor: "#fff",
                    paddingHorizontal: "3%",
                }}
            >
                <Text
                    className="text-center"
                    style={{
                        marginVertical: "35",
                        color: "#818181",
                        fontSize: 20,
                        fontWeight: 500,
                        paddingTop: 10,
                        marginBottom: 10,
                    }}
                >
                    Or
                </Text>
                <View
                    className="flex-col items-center"
                    style={{ width: "95%" }}
                >
                    {/* Google btn */}
                    <TouchableOpacity
                        onPress={() => console.log("Login Google")}
                        style={styles.social_btn}
                    >
                        <Image
                            source={require("../assets/images/google_icon.png")}
                            style={styles.social_img}
                        />
                        <Text
                            className="w-4/5 text-center"
                            style={{ fontSize: 16 }}
                        >
                            Sign in with Google
                        </Text>
                    </TouchableOpacity>
                    {/* Facebook btn */}
                    <TouchableOpacity
                        onPress={() => console.log("Facebook login")}
                        style={styles.social_btn}
                    >
                        <Image
                            source={require("../assets/images/facebook_icon.png")}
                            style={styles.social_img}
                        />
                        <Text
                            className="w-4/5 text-center"
                            style={{ fontSize: 16 }}
                        >
                            Sign in with Facebook
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    className="flex-1 flex-row justify-center items-end"
                    style={{ backgroundColor: "#fff", marginTop: 50 }}
                >
                    <Text style={{ fontSize: 16, color: "#818181" }}>
                        Don't have an account ?{" "}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "black",
                                fontWeight: 500,
                            }}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    input: {
        position: "relative",
        height: "100%",
        width: "90%",
        paddingLeft: 20,
    },
    social_btn: {
        height: 55,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ddd",
        marginTop: 30,
    },
    social_img: {
        height: 25,
        width: 25,
        marginLeft: 15,
    },
});
