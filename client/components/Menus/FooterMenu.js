import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import COLORS from "../../constants/colors";


const FooterMenu = () => {
  // hooks
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={styles.iconStyle}
          color={route.name !== "Home" && COLORS.grey}
        />
        <Text style={route.name !== "Home" && {color: COLORS.grey}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Myposts")}>
        <FontAwesome5
          name="bell"
          style={styles.iconStyle}
          color={route.name !== "Myposts" && COLORS.grey}
        />
        <Text style={route.name !== "Myposts" && {color: COLORS.grey}}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <FontAwesome5
          name="user-alt"
          style={styles.iconStyle}
          color={route.name !== "Profile" && COLORS.grey}
        />
        <Text style={route.name !== "Profile" && {color: COLORS.grey}}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 12,
    marginRight: 43,
    marginLeft: 43,
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 22
  },
});

export default FooterMenu;
