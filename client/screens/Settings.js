import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import COLORS from "../constants/colors";
import { MaterialIcons } from 'react-native-vector-icons';


const Settings = ({ navigation }) => {


  const toNotificationSettings = () => {
    navigation.navigate("NotificationSettings");
  };

  const toDarkModeSettings = () => {
    navigation.navigate("DarkModeSettings");
  };

  const toLanguageSettings = () => {
    navigation.navigate("LanguageSettings");
  };

  const toFontSizeSettings = () => {
    navigation.navigate("FontSizeSettings");
  };

  const toUpdateAppSettings = () => {
    navigation.navigate("UpdateAppSettings");
  };


  const items = [
    {
      icon: "bell",
      text: "Notification",
      action: toNotificationSettings,
    },
    {
      icon: "moon",
      text: "Dark Mode",
      action: toDarkModeSettings
    },
    {
      icon: "language",
      text: "Language",
      action: toLanguageSettings,
    },
    {
      icon: "font",
      text: "Font Size",
      action: toFontSizeSettings
    },
    {
      icon: "download",
      text: "Application Updates",
      action: toUpdateAppSettings
    },
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
      <MaterialIcons name="chevron-right" size={30} style={{
        position: 'absolute',
        right: 18,
        alignSelf: 'center'
      }} />


    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
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

          <Header>Settings</Header>
        </View>
        <ScrollView style={{ marginHorizontal: 13 }}>
          <View style={{ marginBottom: 12 }}>
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
    </SafeAreaView>
  );
};
export default Settings;
