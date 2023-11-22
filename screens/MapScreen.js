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

    const [typeOfPlace, setTypeOfPlace] = useState("")
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null)
    const [displayInfo, setDisplayInfo] = useState(false)
    const [query, setQuery] = useState('');
    const [data, setData] = useState(makeData())
    //const []

    const bottomSheetRef = useRef()
    const snapPoints = useMemo(() => ['50%', '100%'], [])
    const autoCompleteData = useMemo(() => {
        if (query) {
            if (search(query)[0]) {
                if (query == search(query)[0].title) {
                    return []
                }
                else {
                    return search(query)
                }
            }

            else {
                return search(query)
            }
        }
        return []
    }

    )

    useEffect(() => {
        bottomSheetRef.current?.close();
    }, []);

    useEffect(() => {
        if (!query) setSelectedItemId(null)
    }, [query])

    useEffect(() => {
        if (!selectedItemId) bottomSheetRef.current?.close()
    })

    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == selectedItemId) {
                setSelectedPlace(data[i])
                return
            }
        }
        setSelectedPlace(null)
        console.log(selectedPlace)
    }, [selectedItemId, selectedPlace])

    function handlePresentModal() {
        bottomSheetRef.current?.expand()
        setDisplayInfo(true)
    }

    const handleSelectMarker = id => {
        setSelectedItemId(id)
    }

    function makeData() {
        let data = []
        for (let i = 0; i < Locations.length; i++) {
            data = data.concat(Locations[i].places)
        }
        return data
    }

    function compare(a, b) {
        if (a.title.indexOf(query) < b.title.indexOf(query)) return -1
        else if (a.title.indexOf(query) > b.title.indexOf(query)) return 1
        else return 0
    }
    function search(query) {
        let result = []
        data.map((value, index) => {
            if (value.title.includes(query)) {
                result.push(value)
            }
        })
        result.sort(compare)
        return result
    }

    function showLocation(id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                return (
                    <View key={i}>
                        <MapboxGL.PointAnnotation
                            id={data[i].id}
                            title={data[i].id}
                            key={selectedItemId}
                            selected={true}
                            coordinate={data[i].coordinate}
                        >

                            <View>
                                <Icon
                                    name="map-marker-alt"
                                    size={30}
                                    style={{ color: selectedItemId == data[i].id ? "red" : "#888888" }}
                                />
                            </View>
                        </MapboxGL.PointAnnotation>

                    </View>
                )
            }
        }
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
                        if (!typeOfPlace) {
                            setTypeOfPlace(item.name)
                        } else if (typeOfPlace == item.name) {
                            setTypeOfPlace("")
                        } else {
                            setTypeOfPlace(item.name)
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
                        style={styles.searchInput}
                        autoCorrect={false}
                        data={autoCompleteData}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search your place"
                        inputContainerStyle={{ margin: 0, borderRadius: 7 }}
                        flatListProps={{
                            style: { margin: 0, borderRadius: 7, borderWidth: 1, maxHeight: 150 },
                            keyboardShouldPersistTaps: 'always',
                            renderItem: ({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setQuery(item.title)
                                        console.log(item.id)
                                        setSelectedItemId(item.id)
                                        handlePresentModal()
                                    }}
                                >
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
                {typeOfPlace && showLocations(typeOfPlace)}
                {query && showLocation(selectedItemId)}

            </MapboxGL.MapView>

            {displayInfo && selectedPlace && <GestureHandlerRootView style={styles.infoModal}>
                <View style={{ flex: 1 }}>
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onClose={() => {
                            console.log('info modal closed')
                            setDisplayInfo(false)
                        }}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,

                            elevation: 10,
                        }}
                    >
                        <View style={styles.bottomSheetContent}>
                            <Text style={styles.title}>{selectedPlace.title} </Text>

                            <ScrollView horizontal>
                                <Image source={require('../assets/images/place-images/van-mieu-quoc-tu-giam.png')} style={styles.image} />
                                <Image source={require('../assets/images/place-images/van-mieu-quoc-tu-giam.png')} style={styles.image} />
                                <Image source={require('../assets/images/place-images/van-mieu-quoc-tu-giam.png')} style={styles.image} />
                                <Image source={require('../assets/images/place-images/van-mieu-quoc-tu-giam.png')} style={styles.image} />
                                <Image source={require('../assets/images/place-images/van-mieu-quoc-tu-giam.png')} style={styles.image} />
                                <Image source={require('../assets/images/place-images/van-mieu-quoc-tu-giam.png')} style={styles.image} />
                            </ScrollView>

                            <Text style={styles.description}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae ex id turpis maximus dapibus.
                            </Text>

                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Get Directions</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>View Details</Text>
                                </TouchableOpacity>
                            </View>
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
        top: Constants.statusBarHeight,
        backgroundColor: "white",
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
    // auto complete search style
    searchContainer: {
        flex: 1,
        position: "absolute",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    autoCompleteContainer: {
        // Hack required to make the autocomplete
        // work on Andrdoid
        flex: 1,
        position: 'absolute',
        width: "100%",
        top: Constants.statusBarHeight,
        zIndex: 2,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: 3,


    },
    searchInput: {
        position: "relative",
        width: 350,
        height: 50,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 4,
        padding: 8,
        zIndex: 2,
        borderRadius: 7
    },
    itemText: {
        fontSize: 15,
        margin: 0,
        width: 350,
    },
    // suggestion nav style
    suggestionScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10,
        zIndex: 2,
        marginTop: 20,
    },
    suggestions: {
        flexDirection: "row",
        justifyContent: 'center',
        textAlign: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 7,
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
    // bottom sheet style
    infoModal: {
        flex: 1,
        height: "40%",
        width: "100%",
        position: "absolute",
        bottom: 0,
    
    },
    bottomSheetContent: {
        position: 'absolute',
        margin: 10,
        bottom: 30

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 8,
    },
    description: {
        marginBottom: 8,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginBottom: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default Map