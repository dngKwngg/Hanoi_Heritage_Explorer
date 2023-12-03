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
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input';

import MapboxGL from "@rnmapbox/maps";
import FontAwesome5Icon from '@expo/vector-icons/FontAwesome5'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';

import darkGreyPin from '../assets/icons/map-marker-alt-solid-yellow-yellow-background.png'
import redPin from '../assets/icons/map-marker-alt-solid-red.png'
import Constants from "expo-constants"
import Locations from '../dev-data/locations'
import utils from '../utils/utils'

MapboxGL.setAccessToken(process.env.MAPBOX_ACCESS_TOKEN);
MapboxGL.setTelemetryEnabled(false);

function Map() {

    const [typeOfPlace, setTypeOfPlace] = useState("")
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null)
    const [displayInfo, setDisplayInfo] = useState(false)
    const [query, setQuery] = useState('');
    const [data, setData] = useState(makeData())
    const [routeDirections, setRouteDirections] = useState(null);
    const [displayRoute, setDisplayRoute] = useState(false)
    const [duration, setDuration] = useState(0)
    const [distance, setDistance] = useState(0)
    const [suggestionScrollViewMarginTop, setSuggestionScrollViewMarginTop] = useState(10)

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
    })

    useEffect(() => {
        if (autoCompleteData.length == 0) {
            setSuggestionScrollViewMarginTop(10)
        } else if (autoCompleteData.length > 0 && autoCompleteData.length < 3) {
            setSuggestionScrollViewMarginTop(10 + 53.3)
        } else if (autoCompleteData.length < 5) {
            setSuggestionScrollViewMarginTop(10 + 103 - autoCompleteData.length * 20.6)
        } else {
            setSuggestionScrollViewMarginTop(10)
        }
    }, [autoCompleteData])

    useEffect(() => {
        if (selectedPlace) {
            console.log("fetch distance and duration")
            const fetchData = async () => {
                let res = await utils.fetchDirection(utils.generateDirectionQueryString(
                    {
                        longitude: 105.782096,
                        latitude: 21.040622
                    }, {
                    longitude: selectedPlace.coordinate[0],
                    latitude: selectedPlace.coordinate[1]
                }

                ))

                setDuration(parseFloat(res["routes"][0]["duration"] / 60).toFixed(2))
                setDistance(parseFloat(res["routes"][0]["distance"] / 1000).toFixed(2))
                setRouteDirections({
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: res['routes'][0]['geometry']['coordinates'],
                            }
                        }
                    ]
                })

            }
            fetchData()
        }
    }, [selectedPlace])

    useEffect(() => {
        setSelectedItemId(null)
        setSelectedPlace(null)
        setDisplayRoute(false)
    }, [typeOfPlace])

    useEffect(() => {
        if (!query) setSelectedItemId(null)
    }, [query])

    useEffect(() => {
        if (!selectedItemId) bottomSheetRef.current?.close()
        else bottomSheetRef.current?.expand()
        setRouteDirections(null)
        setDisplayRoute(false)
    }, [selectedItemId])

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
            if ((value.title).toLowerCase().includes(query.toLowerCase())) {
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
                            anchor={{ x: 0.5, y: 1 }}
                        >

                            <View>
                                <FontAwesome5Icon
                                    name="map-marker-alt"
                                    size={25}
                                    color={data[i].id == selectedItemId ? "red" : "#888888"}
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
                                    setRouteDirections(null)
                                    if (selectedItemId == item.id) handleSelectMarker(null)
                                    else handleSelectMarker(item.id)
                                    handlePresentModal()
                                    console.log(selectedItemId, item.id, selectedItemId == item.id)

                                }}
                                anchor={{ x: 0.5, y: 1 }}
                                coordinate={item.coordinate}
                            >
                                <View>
                                    <FontAwesome5Icon
                                        name="map-marker-alt"
                                        size={25}
                                        color={item.id == selectedItemId ? "red" : "#888888"}
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
                    <FontAwesome5Icon name={item.icon} size={20} />
                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={styles.container}>
            {/* Autocomplete search */}
            <View style={styles.searchContainer}>

                <View style={styles.autoCompleteContainer}>
                    <Autocomplete
                        style={styles.searchInput}
                        data={autoCompleteData}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search your place"
                        inputContainerStyle={{ margin: 0, borderRadius: 7 }}

                        flatListProps={{
                            style: styles.autoCompleteList,
                            keyboardShouldPersistTaps: 'always',
                            keyExtractor: (_, idx) => idx,
                            renderItem: ({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {

                                        setQuery(item.title)
                                        console.log(item)
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
                    style={[styles.suggestionScrollView, { marginTop: suggestionScrollViewMarginTop }]}
                >
                    {renderSuggestionTab()}
                </ScrollView>
            </View>

            {/* Map */}
            <MapboxGL.MapView
                style={styles.map}>
                <MapboxGL.Camera
                    zoomLevel={12}
                    centerCoordinate={selectedPlace ? selectedPlace.coordinate : [105.782155, 21.040578]}
                    animationMode="flyTo"
                    animationDuration={1000}
                />
                <MapboxGL.UserLocation
                    androidRenderMode='normal'
                />

                {/* display marker */}
                {typeOfPlace && showLocations(typeOfPlace)}
                {query && showLocation(selectedItemId)}

                {/* Showing direction */}
                {displayRoute && routeDirections && selectedItemId && (
                    <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
                        <MapboxGL.LineLayer
                            id="routerLine01"
                            style={{
                                lineColor: 'blue',
                                lineWidth: 8,
                                lineOpacity: 0.6,
                                lineJoin: 'round',
                                lineCap: 'round'
                            }}
                        />
                    </MapboxGL.ShapeSource>
                )}

            </MapboxGL.MapView>

            {/* Bottom Sheet */}
            {displayInfo && selectedPlace && <GestureHandlerRootView style={styles.infoModal}>

                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    enableContentPanningGesture={false}
                    enableHandlePanningGesture={true}
                    onClose={() => {
                        setDisplayInfo(false)
                        setSelectedItemId(null)
                    }}
                    style={styles.bottomSheet}

                >
                    <View style={styles.bottomSheetContent}>
                        <Text style={styles.title}>{selectedPlace.title} </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{ marginRight: 5 }}>3.3</Text>
                            <Stars
                                display={3.3}
                                spacing={2}
                                count={5}
                                fullStar={<MCIcons size={25} name={'star'} style={[styles.star]} />}
                                emptyStar={<MCIcons size={25} name={'star-outline'} style={[styles.star, styles.emptyStar]} />}
                                halfStar={<MCIcons size={25} name={'star-half'} style={[styles.star]} />}
                            />
                        </View>

                        <View style={styles.categoryDistanceDurationContainer}>
                            <Text style={styles.categoryDistanceDurationText}>{selectedPlace.category} · </Text>
                            <Text style={styles.categoryDistanceDurationText}><FontAwesome5Icon name="car" /> {duration}min · </Text>
                            <Text style={styles.categoryDistanceDurationText}><FontAwesome5Icon name="road" /> {distance}km</Text>
                        </View>

                        <BottomSheetScrollView horizontal style={styles.imageContainer}>
                            {[...Array(10)].map((_, i) => (
                                <Image
                                    key={i}
                                    source={require('../assets/images/place-images/van-mieu-quoc-tu-giam.png')}
                                    style={styles.image}
                                />
                            ))}

                        </BottomSheetScrollView>

                        <View style={styles.modalButtonContainer}>

                            <TouchableOpacity
                                style={[styles.button, styles.viewDirectionButton]}
                                onPress={async () => {
                                    setDisplayRoute(true)
                                }}
                            >
                                <Text style={[styles.buttonText, styles.viewDirectionText]}>View Directions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.getDetailsButton]}
                                onPress={() => { console.log("Get direction button clicked") }}
                            >
                                <Text style={[styles.buttonText, styles.getDetailsText]}>Get Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </BottomSheet>

            </GestureHandlerRootView>}


        </View>

    )
}

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
        backgroundColor: "blue"
    },
    // auto complete search style
    searchContainer: {
        flex: 1,
        position: "absolute",
        top: Constants.statusBarHeight,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
    },
    autoCompleteContainer: {
        flex: 1,
        width: "100%",
        zIndex: 3,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

    },
    searchInput: {
        position: "relative",
        width: 350,
        height: 50,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        padding: 8,
        zIndex: 2,
        borderRadius: 7
    },
    autoCompleteList: {
        maxHeight: 103,
        margin: 0, borderRadius: 7, borderWidth: 1, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    itemText: {
        fontSize: 15,
        margin: 0,
        width: 350,
    },
    // suggestion nav style
    suggestionScrollView: {
        position: 'relative',
        paddingHorizontal: 10,
        width: 350,
        zIndex: 2,
    },
    suggestions: {
        flexDirection: "row",
        justifyContent: 'center',
        textAlign: "center",
        alignItems: 'center',
        height: 35,
        padding: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 20,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 3, height: 3 },
        elevation: 10,
    },
    // bottom sheet style
    infoModal: {
        flex: 1,
        height: "40%",
        width: "100%",
        padding: 4,
        position: "absolute",
        bottom: 0,

        shadowOffset: { width: -12, height: -12 },
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

    },
    bottomSheet: {
        flex: 1,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: -12, height: -12 },
        elevation: 20,

    },
    bottomSheetContent: {
        position: 'absolute',
        margin: 10,
        width: "95%"
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginBottom: 8,
    },
    modalButtonContainer: {
        flexDirection: "row",
        width: "100%"
    },
    button: {
        height: 30,
        flexGrow: 1,
        flexBasis: 0,
        borderRadius: 4,
        marginVertical: 8,
        marginHorizontal: 4,
        padding: 5,
        borderRadius: 20,
        backgroundColor: "transparent",
        justifyContent: "center"
    },
    viewDirectionButton: {
        backgroundColor: "#4285F4",
    },
    getDetailsButton: {
        borderWidth: 1,
        borderColor: "#4285F4"
    },
    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        fontWeight: "400"
    },
    viewDirectionText: {
        color: "white"
    },
    getDetailsText: {
        color: "#4285F4"
    },
    star: {
        color: "#FBBC04",
        backgroundColor: 'transparent',
    },
    categoryDistanceDurationContainer: {
        flexDirection: "row",
        alignItems: "flex-end",

    },
    categoryDistanceDurationText: {
        color: "#70757a"
    },
    imageContainer: {
        margin: 4
    },
    image: {
        width: 130,
        height: 130,
        marginRight: 8,
        borderRadius: 10
    },
})

export default Map