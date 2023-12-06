import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FooterMenu from "../components/Menus/FooterMenu";


import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import COLORS from "../constants/colors";



const SettingsScreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);

  const navigateToAccount = () => {
    navigation.navigate("Account");
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  const navigateToFeedback = () => {
    console.log("Feedback function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };



  const logout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    Alert.alert("Logout successfully!");
  };

  const items = [
    {
      icon: "user-alt",
      text: "My Account",
      action: navigateToAccount,
    },
    { icon: "cog", text: "Settings", action: navigateToSettings },
    {
      icon: "comment",
      text: "Feedback",
      action: navigateToFeedback,
    },
    { icon: "shield-alt", text: "Privacy & Security", action: navigateToPrivacy },
    { icon: "sign-out-alt", text: "Log out", action: logout },
  ];



  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 25,
        paddingLeft: 35,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginVertical: 15,
        borderRadius: 18,
        borderStyle: 'solid',
        borderColor: COLORS.border_gray,
        borderWidth: 1
      }}
    >
      <FontAwesome5
        name={icon} size={25}
      />

      <Text
        style={{
          marginLeft: 30,

          fontWeight: 500,
          fontSize: 18,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 0
        // backgroundColor: COLORS.white,
      }}
    >
      <ImageBackground source={require('../assets/pastel-background13.jpg')} style={{
        flex: 1,
        resizeMode: 'cover'
      }}>
        <View
          style={{
            marginHorizontal: 17,
            flexDirection: 'row',

          }}
        >
          <BackButton goBack={navigation.goBack} />
        </View>


        <View style={{ marginLeft: 25, marginTop: 110, marginBottom: 25 }}>

          <Header>My Profile</Header>
        </View>



        <ScrollView style={{ marginHorizontal: 13 }}>
          {/* Account Settings */}


          <View>

            <View
              style={{
                borderRadius: 12,

              }}
            >
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>


        </ScrollView>
      </ImageBackground>
      <View style={{ backgroundColor: 'white' }}>
        <FooterMenu />
      </View>

    </SafeAreaView>
  );
};
export default SettingsScreen;
