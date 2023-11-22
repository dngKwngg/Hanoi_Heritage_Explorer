// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const App = () => {
//     // ref
//     const bottomSheetRef = useRef(null);

//     // variables
//     const snapPoints = useMemo(() => ['25%', '50%'], []);

//     // callbacks
//     const handleSheetChanges = useCallback((index) => {
//         console.log('handleSheetChanges', index);
//     }, []);

//     // renders
//     return (
//         <GestureHandlerRootView style={{flex: 1}}>

//             <View style={styles.container}>
//                 <BottomSheet
//                     ref={bottomSheetRef}
//                     index={1}
//                     snapPoints={snapPoints}
//                     onChange={handleSheetChanges}
//                     enablePanDownToClose
//                 >
//                     <View style={styles.contentContainer}>
//                         <Text>Awesome 🎉</Text>
//                     </View>
//                 </BottomSheet>
//             </View>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: 'grey',
//     },
//     contentContainer: {
//         flex: 1,
//         alignItems: 'center',
//     },
// });

// export default App;





import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapScreen from './screens/MapScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

    return (
        
        <View style={styles.container}>
            <MapScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    map: {
        width: '100%',
        height: '100%'
    }
});
