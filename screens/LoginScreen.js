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
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Buttons from "../components/Buttons";
import SocialButton from "../components/SocialButton";
import InputLoginSignup from "../components/InputLoginSignup";
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
                style={{
                    flex: 2,
                    flexDirection: "column",
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
                    {/* email */}
                    <InputLoginSignup
                        iconName={"envelope-o"}
                        placeholder={"Enter Email"}
                        onChangeText={(text) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                email: text,
                            }))
                        }
                        secureTextEntry={false}
                    />

                    {/* password */}
                    <InputLoginSignup
                        iconName={"lock"}
                        placeholder={"Enter Password"}
                        onChangeText={(text) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                password: text,
                            }))
                        }
                        secureTextEntry={true}
                    />

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

                {/* social btns */}
                <View
                    className="flex-col items-center"
                    style={{ width: "95%" }}
                >
                    {/* Google btn */}
                    <SocialButton
                        onPress={() => console.log("Login Google")}
                        source={require("../assets/images/google_icon.png")}
                        buttonText={"Sign in with Google"}
                    />

                    {/* Facebook btn */}
                    <SocialButton
                        onPress={() => console.log("Login Facebook")}
                        source={require("../assets/images/facebook_icon.png")}
                        buttonText={"Sign in with Facebook"}
                    />
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

const styles = StyleSheet.create({});