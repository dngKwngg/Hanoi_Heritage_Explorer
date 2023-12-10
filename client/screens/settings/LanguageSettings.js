import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from 'react-native-paper';
import { theme } from "../../core/theme";



const LanguageSettings = () => {
    const [checked, setChecked] = useState('first');
    return (
        <SafeAreaView
            style={styles.container}
        >
            <View style={styles.sectionContainer}>

                <TouchableOpacity onPress={() => setChecked('first')} style={styles.section}>
                    <RadioButton
                        color={theme.colors.third}
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                    />
                    <Text style={styles.sectionTitle}>Tiếng Việt</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setChecked('second')} style={styles.section}>
                    <RadioButton
                        color={theme.colors.third}
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                    <Text style={styles.sectionTitle}>Tiếng Anh</Text>
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
        marginHorizontal: 20,
        marginTop: 20,
    },
    section: {
        flexDirection: 'row',
        marginLeft: 15,
        marginVertical: 17,
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 15,
    }
});

export default LanguageSettings;


