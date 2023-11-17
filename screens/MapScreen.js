import { useState, useEffect, useRef, useMemo } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Image,
    Input,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native"
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input';

import MapboxGL from "@rnmapbox/maps";
import Icon from '@expo/vector-icons/FontAwesome5'

import Constants from "expo-constants"
import { env } from '@env'
import Locations from '../dev-data/locations.json'

MapboxGL.setAccessToken(process.env.MAPBOX_ACCESS_TOKEN);
MapboxGL.setTelemetryEnabled(false);


function Map() {

    const [place, setPlace] = useState("")
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [displayInfo, setDisplayInfo] = useState(false)
    const [query, setQuery] = useState('');
    const [autoCompleteData, setAutoCompleteData] = useState([])

    const bottomSheetRef = useRef()
    const snapPoints = useMemo(() => ['25%', '100%'], [])

    useEffect(() => {
        bottomSheetRef.current?.close();
        setAutoCompleteData(getAutocompleteData())
    }, []);

    function handlePresentModal() {
        console.log('handle modal')
        bottomSheetRef.current?.expand()
        setDisplayInfo(true)
    }

    const handleSelectMarker = id => {
        setSelectedItemId(id)
    }

    function getAutocompleteData() {
        let data = []
        for (let i = 0; i < Locations.length; i++) {
            data = data.concat(Locations[i].places)
        }
        return data
    }

    function showLocations(type) {
        for (let i = 0; i < Locations.length; i++) {
            if (Locations[i].name == type) {
                return Locations[i].places.map((item, index) => {
                    return (
                        <View key={index}>
                            <MapboxGL.PointAnnotation
                                id={item.id}
                                title={item.id}
                                key={selectedItemId}
                                selected={true}
                                onSelected={(details) => {
                                    if (selectedItemId == item.id) handleSelectMarker(null)
                                    else handleSelectMarker(item.id)
                                    handlePresentModal()
                                }}

                                coordinate={item.coordinate}
                            >

                                <View>
                                    <Icon
                                        name="map-marker-alt"
                                        size={30}
                                        style={{ color: selectedItemId == item.id ? "red" : "#888888" }}
                                    //style={{color: "red"}}
                                    />
                                </View>
                            </MapboxGL.PointAnnotation>

                        </View>
                    )
                })
            }
        }
    }

    function renderSuggestionTab() {
        return Locations.map((item, index) => {
            return (
                <TouchableOpacity key={index} style={styles.suggestions}
                    onPress={() => {
                        console.log(item.name)
                        if (!place) {
                            setPlace(item.name)
                        } else if (place == item.name) {
                            setPlace("")
                        } else {
                            setPlace(item.name)
                        }
                    }}

                >
                    <Icon name={item.icon} size={20} />
                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.autoCompleteContainer}>
                    <Autocomplete
                        autoCorrect={false}
                        data={autoCompleteData}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search your place"
                        flatListProps={{
                            keyboardShouldPersistTaps: 'always',
                            renderItem: ({ item }) => (
                                <TouchableOpacity onPress={() => setQuery(item.title)}>
                                    <Text style={styles.itemText}>{item.title}</Text>
                                </TouchableOpacity>
                            ),
                        }}
                    />
                </View>

                <ScrollView
                    horizontal
                    style={styles.suggestionScrollView}
                >
                    {renderSuggestionTab()}
                </ScrollView>
            </View>


            <MapboxGL.MapView
                style={styles.map}>
                <MapboxGL.Camera
                    zoomLevel={12}
                    centerCoordinate={[105.782155, 21.040578]}
                    animationMode="flyTo"
                    animationDuration={3000}
                />
                <MapboxGL.UserLocation
                    androidRenderMode='normal'
                />
                {place && showLocations(place)}

            </MapboxGL.MapView>

            {displayInfo && <GestureHandlerRootView style={styles.infoModal}>
                <View style={{ flex: 1 }}>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onClose={() => {
                            console.log('info modal closed')
                            setDisplayInfo(false)
                        }}
                    >
                        <View>
                            <Text>Info.....</Text>
                        </View>
                    </BottomSheet>
                </View>
            </GestureHandlerRootView>}
        </View>

    )
}

const markerShape = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [105.85227845338571, 21.02784599224821],
            },
        },
    ],
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#a19797",
    },
    map: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent"
    },
    searchContainer: {
        position: "absolute",
        width: "100%",
        alignItems: "center"
    },
    searchBox: {
        position: "absolute",
        width: "90%",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: Constants.statusBarHeight,
        zIndex: 2
    },
    suggestionScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10,
        zIndex: 2
    },
    suggestions: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    infoModal: {
        flex: 1,
        height: "40%",
        width: "100%",
        position: "absolute",
        bottom: 0
    }
})

export default Map