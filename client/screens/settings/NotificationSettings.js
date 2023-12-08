import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";



const NotificationSettings = () => {

  const [isOnEvent, setOnEvent] = useState(true);
  const eventToggleSwitch = () => {
    setOnEvent(previousState => !previousState);
  }

  const [isOnNewDes, setOnNewDes] = useState(true);
  const newDesToggleSwitch = () => {
    setOnNewDes(previousState => !previousState);
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView style={styles.sectionContainer}>

        <TouchableOpacity onPress={eventToggleSwitch} style={styles.section}>
          <View>
            <Text style={styles.sectionTitle}>Thông báo về sự kiện</Text>
            <Text style={styles.content}>Nhận thông báo về các sự kiện mới</Text>
          </View>

          <Switch
            value={isOnEvent}
            onValueChange={eventToggleSwitch}
            style={styles.switch}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={newDesToggleSwitch} style={styles.section}>
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Thông báo về điểm đến mới</Text>
            <Text style={styles.content}>Nhận thông báo về những điểm đến mới được thêm vào ứng dụng</Text>
          </View>

          <Switch
            value={isOnNewDes}
            onValueChange={newDesToggleSwitch}
            style={styles.switch}
          />
        </TouchableOpacity>



        <View style={styles.section}>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Âm thanh thông báo</Text>
            <Text style={styles.content}>Tuỳ chọn âm thanh thông báo mà bạn thích!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Tuỳ chỉnh thông báo hệ thống</Text>

          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  section: {
    flexDirection: 'row',
    marginLeft: 5,
    marginVertical: 15
  },
  textContainer: {
    marginRight: 40
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",

  },
  content: {
    fontSize: 15,
    fontWeight: "300",
    marginTop: 3
  },
  switch: {
    position: 'absolute',
    alignSelf: 'center',
    right: 0
  },
});

export default NotificationSettings;


