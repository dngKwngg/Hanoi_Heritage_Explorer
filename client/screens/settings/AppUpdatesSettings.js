import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";



const AppUpdatesSettings = () => {

    const [isAutoUpdate, setAutoUpdate] = useState(true);
    const autoUpdateToggle = () => {
        setAutoUpdate(previousState => !previousState);
    }

    const [isGetNotified, setGetNotified] = useState(true);
    const getNotifiedToggle = () => {
        setGetNotified(previousState => !previousState);
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <View style={styles.sectionContainer}>

                <TouchableOpacity onPress={autoUpdateToggle} style={styles.section}>
                    <View>
                        <Text style={styles.sectionTitle}>Automatic update</Text>
                        <Text style={styles.content}>Automatically update app via Wi-Fi</Text>
                    </View>

                    <Switch
                        value={isAutoUpdate}
                        onValueChange={autoUpdateToggle}
                        style={styles.switch}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={getNotifiedToggle} style={styles.section}>
                    <View style={styles.textContainer}>
                        <Text style={styles.sectionTitle}>Notification about updates</Text>
                        <Text style={styles.content}>Get notified about app updates</Text>
                    </View>

                    <Switch
                        value={isGetNotified}
                        onValueChange={getNotifiedToggle}
                        style={styles.switch}
                    />
                </TouchableOpacity>

            </View>
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

export default AppUpdatesSettings;


