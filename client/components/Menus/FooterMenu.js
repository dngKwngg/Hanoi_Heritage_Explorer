import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import COLORS from "../../constants/colors";
import { theme } from "../../core/theme";


const FooterMenu = () => {
  // hooks
  const navigation = useNavigation();
  const route = useRoute();
  


  return (
    <View style={styles.outContainer}>

      <View style={styles.container}>
        <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate("Home")}>
          <View style={[styles.iconContainer, route.name !== "Home" ? { backgroundColor: 'transparent' } : { backgroundColor: COLORS.light_gray, width: 55 }]}>
            <FontAwesome5
              name="location-arrow"
              style={styles.iconStyle}
              color={route.name !== "Home" ? COLORS.grey : theme.colors.third}
            />
          </View>
          <Text style={route.name !== "Home" ? { color: COLORS.grey } : { color: theme.colors.third }}>Khám phá</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <View style={[styles.iconContainer, route.name !== "Notifications" ? { backgroundColor: 'transparent' } : { backgroundColor: COLORS.light_gray }]}>
            <FontAwesome5
              name="bell"
              style={styles.iconStyle}
              color={route.name !== "Notifications" ? COLORS.grey : theme.colors.third}
            />
          </View>
          <Text style={route.name !== "Notifications" ? { color: COLORS.grey } : { color: theme.colors.third }}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate("Profile")}>
          <View style={[styles.iconContainer, route.name !== "Profile" ? { backgroundColor: 'transparent' } : { backgroundColor: COLORS.light_gray }]}>
            <FontAwesome5
              name="user-alt"
              style={styles.iconStyle}
              color={route.name !== "Profile" ? COLORS.grey : theme.colors.third}
            />
          </View>
          <Text style={route.name !== "Profile" ? { color: COLORS.grey } : { color: theme.colors.third }}>Hồ sơ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outContainer: {
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border_gray
  },
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 47,
    justifyContent: "space-between",
    
  },
  tabContainer: {
    alignItems: 'center'
  },
  iconStyle: {
    marginBottom: 0,
    alignSelf: "center",
    fontSize: 22,
  },
  iconContainer: {
    borderRadius: 11,
    paddingVertical: 4,
    paddingHorizontal: 13
  }
});

export default FooterMenu;
