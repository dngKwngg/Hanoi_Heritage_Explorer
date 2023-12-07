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
            <Text style={styles.sectionTitle}>Events notification</Text>
            <Text style={styles.content}>Receive notifications about new events</Text>
          </View>

          <Switch
            value={isOnEvent}
            onValueChange={eventToggleSwitch}
            style={styles.switch}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={newDesToggleSwitch} style={styles.section}>
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>New destinations notification</Text>
            <Text style={styles.content}>Get notified about new destinations on our app</Text>
          </View>

          <Switch
            value={isOnNewDes}
            onValueChange={newDesToggleSwitch}
            style={styles.switch}
          />
        </TouchableOpacity>



        <View style={styles.section}>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Notification sound</Text>
            <Text style={styles.content}>Choose the notification sound that you like!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.sectionTitle}>Customize system notification</Text>

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


