import { useState, useEffect, useRef, useMemo} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Image,
    Input,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    findNodeHandle,
    UIManager
} from "react-native"

import Animated from 'react-native-reanimated'
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
import Locations from '../dev-data/attractions'
import utils from '../utils/utils'
import { useSharedValue } from 'react-native-reanimated';
import * as expoLocation from 'expo-location'
import FooterMenu from "../components/Menus/FooterMenu";

MapboxGL.setWellKnownTileServer('Mapbox')
MapboxGL.setAccessToken('pk.eyJ1IjoibWl0bmF4ZmV0IiwiYSI6ImNscGEydHRqMDAyenIyanJsZDIzZ2ptYnkifQ.lgAafxD6INU3ufH3N09Xcw');


MapboxGL.setTelemetryEnabled(false);

const Map = ({navigation}) => {
    const [typeOfPlace, setTypeOfPlace] = useState("")
    const [selectedItemId, setSelectedItemId] = useState(-1);
    const [selectedPlace, setSelectedPlace] = useState(null)
    const [displayInfo, setDisplayInfo] = useState(false)
    const [query, setQuery] = useState('');
    const [data, setData] = useState(makeData())
    const [routeDirections, setRouteDirections] = useState(null);
    const [displayRoute, setDisplayRoute] = useState(false)
    const [duration, setDuration] = useState(0)
    const [distance, setDistance] = useState(0)
    const [waypoints, setWaypoints] = useState([])
    const [displayRouteToWaypoints, setDisplayRouteToWaypoints] = useState(false)
    const [userLocation, setUserLocation] = useState([105.78204560680769, 21.04060281592781])
    const [displayLocation, setDisplayLocation] = useState(false)
    const [footerHeight, setFooterHeight] = useState(76)

    // constants
    const windowHeight = Dimensions.get("window").height

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

    // dynamic style
    const snapPoints = useMemo(() => ['50%', '100%'], [])
    const [suggestionScrollViewMarginTop, setSuggestionScrollViewMarginTop] = useState(10)
    const [addToWayPointButtonColor, setAddToWayPointButtonColor] = useState("green")
    const [addToWayPointButtonText, setAddToWayPointButtonText] = useState("Thêm vào chặng")
    const bottomSheetPosition = useSharedValue(0)
    const addToWayPointButtonContainerHeight = 75

    // component reference
    const bottomSheetRef = useRef()
    const waypointRef = useRef()
    const footerRef = useRef()

    // get user's current coordinates
    useEffect(() => {
        (async () => {
            let coordinate = await expoLocation.getCurrentPositionAsync({});
            setUserLocation([coordinate.coords.longitude, coordinate.coords.latitude]);
        })();
    }, []);

    useEffect(() => {
        waypoints.push(userLocation)
    }, [userLocation])

    // handle add to waypoint button color after being pressed
    useEffect(() => {
        console.log("test waypoint", waypoints)
        if (selectedPlace) {
            if (waypoints.includes(selectedPlace.coordinate)) {
                setAddToWayPointButtonColor("red")
                setAddToWayPointButtonText("Xoá khỏi chặng ")
            }
            else {
                setAddToWayPointButtonColor("green")
                setAddToWayPointButtonText("Thêm vào chặng")
            }
        }

    }, [waypoints, selectedPlace])

    // handle suggestion scroll view position change by height of auto complete list
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

    // fetch distance, duration and direction
    useEffect(() => {
        if (selectedPlace) {
            console.log("fetch distance and duration")
            fetchDirection()
            console.log(routeDirections)
        }
    }, [selectedPlace])

    // disable selected place when change type of place
    useEffect(() => {
        setSelectedItemId(null)
        setSelectedPlace(null)
        setDisplayRoute(false)
    }, [typeOfPlace])

    // disable selected place when search query is empty
    useEffect(() => {
        if (!query) setSelectedItemId(null)
    }, [query])

    // handle close and open bottom sheet modal when select and deselect place
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

    useEffect(() => {
        measureFooter()
    }, [])

    const measureFooter = () => {
        const handle = findNodeHandle(footerRef.current);
        UIManager.measure(handle, (x, y, width, height) => {
          setFooterHeight(height);
        });
    };

    const onMapLoaded = () => {
        console.log("map rendered")
        setDisplayLocation(true);
    };

    const fetchDirection = async () => {
        let res = await utils.fetchDirection(utils.generateDirectionQueryString(
            {
                longitude: userLocation[0],
                latitude: userLocation[1]
            },
            {
                longitude: selectedPlace.coordinate[0],
                latitude: selectedPlace.coordinate[1]
            }))



        setDuration(parseFloat(res["routes"][0]["duration"] / 60).toFixed(2))
        setDistance(parseFloat(res["routes"][0]["distance"] / 1000).toFixed(2))
        console.log(routeDirections)
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

    const fetchDirectionThroughWaypoints = async () => {
        console.log("fetch direction through waypoints")
        let res = await utils.fetchDirection(utils.generateWaypointsDirectionQueryString(waypoints))
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
        if ((a.title).toLowerCase().indexOf(query.toLowerCase()) < (b.title).toLowerCase().indexOf(query.toLowerCase())) return -1
        else if ((a.title).toLowerCase().indexOf(query.toLowerCase()) > (b.title).toLowerCase().indexOf(query.toLowerCase())) return 1
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
                            id={data[i].slug}
                            title={data[i].title}
                            key={selectedItemId}
                            selected={true}
                            coordinate={data[i].coordinate}
                            anchor={{ x: 0.5, y: 1 }}
                        >

                            <View>
                                <FontAwesome5Icon
                                    name="map-marker-alt"
                                    size={30}
                                    color={data[i].id == selectedItemId ? "red" : "#888888"}
                                />
                            </View>
                        </MapboxGL.PointAnnotation>

                    </View>
                )
            }
        }
    }

    function showLocations() {
        return Locations[0].places.map((item, index) => {
            return (

                <MapboxGL.PointAnnotation
                    id={item.slug}
                    title={item.title}
                    key={[selectedItemId, index]}
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
                            size={30}
                            color={item.id == selectedItemId ? "red" : "#888888"}
                        />
                    </View>
                </MapboxGL.PointAnnotation>





            )
        })


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
            <StatusBar barStyle="light-content" hidden={false} backgroundColor='#b1b3b5' />
            {/* Autocomplete search */}
            <View style={styles.searchContainer}>

                <View style={styles.autoCompleteContainer}>
                    <Autocomplete
                        style={styles.searchInput}
                        data={autoCompleteData}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Tìm điểm đến..."
                        inputContainerStyle={styles.inputContainerStyle}

                        flatListProps={{
                            style: styles.autoCompleteList,
                            keyboardShouldPersistTaps: 'always',
                            renderItem: ({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {

                                        setQuery(item.title)
                                        console.log(item)
                                        setSelectedItemId(item.id)
                                        handlePresentModal()
                                    }}
                                    style={{
                                        marginVertical: 2.5,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#dbd6d6"
                                    }}
                                >
                                    <Text style={styles.itemText}>{item.title}</Text>
                                </TouchableOpacity>
                            ),
                        }}
                    />
                </View>

                {/* <ScrollView
                    horizontal
                    style={[styles.suggestionScrollView, { marginTop: suggestionScrollViewMarginTop }]}
                >
                    {renderSuggestionTab()}
                </ScrollView> */}
            </View>

            {/* Map */}
            <MapboxGL.MapView
                style={styles.map}
                onDidFinishLoadingMap={onMapLoaded}
            >
                <MapboxGL.Camera
                    zoomLevel={12}
                    centerCoordinate={selectedPlace ? selectedPlace.coordinate : userLocation}
                    animationMode="flyTo"
                    animationDuration={1000}

                />
                <MapboxGL.UserLocation
                    androidRenderMode='normal'
                    minDisplacement={1.0}
                />

                {/* display marker */}

                {displayLocation && showLocations()}
                {/* {displayLocation && showLocation()} */}
                {query && showLocation(selectedItemId)}

         

                {/* Showing direction */}
                {(displayRoute || displayRouteToWaypoints) && routeDirections && selectedItemId && (
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
 
            {/* waypoint */}
            <View
                style={{
                    position: "absolute",
                    bottom: selectedItemId ? windowHeight * 0.4 + footerHeight : footerHeight,
                    right: 0,
                    width: 0,
                    height: addToWayPointButtonContainerHeight,
                   // top: selectedItemId ? bottomSheetPosition : 0,
                    backgroundColor: "grey"
                }}
            >
                <Animated.View
                    style={[styles.waypointButton, { top: selectedItemId ? bottomSheetPosition : 0}]}
                    //style={[styles.waypointButton, { top: }]}
                    ref={waypointRef}
                >
                    <TouchableOpacity
                        onPress={async () => {
                            if (!displayRouteToWaypoints) {
                                await fetchDirectionThroughWaypoints()
                                setDisplayRouteToWaypoints(true)
                            } else {
                                setDisplayRouteToWaypoints(false)
                            }

                        }}
                    >
                        <View>
                            <FontAwesome5Icon
                                name="route"
                                size={30}
                            />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>




            {/* Bottom Sheet */}
            {displayInfo && selectedPlace &&
                <GestureHandlerRootView
                    style={[styles.infoModal, {bottom: footerHeight - 20}]}
                    pointerEvents="none"
                >

                    <BottomSheet
                        ref={bottomSheetRef}
                        animatedPosition={bottomSheetPosition}
                        index={1}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        enableContentPanningGesture={false}
                        enableHandlePanningGesture={true}

                        onClose={() => {
                            setDisplayInfo(false)
                            setSelectedItemId(null)
                        }}
                        onChange={() => {
                            console.log("bottom sheet pos:", bottomSheetPosition.value)
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
                                <Text style={styles.categoryDistanceDurationText}>{selectedPlace.type} · </Text>
                                <Text style={styles.categoryDistanceDurationText}><FontAwesome5Icon name="car" /> {duration}min · </Text>
                                <Text style={styles.categoryDistanceDurationText}><FontAwesome5Icon name="road" /> {distance}km</Text>
                            </View>

                            <BottomSheetScrollView horizontal style={styles.imageContainer}>
                                {[...Array(10)].map((_, i) => (
                                    <Image
                                        keny={i}
                                        source={{uri: selectedPlace.images[i]}}
                                        style={styles.image}
                                    />
                                ))}

                            </BottomSheetScrollView>

                            <View style={styles.modalButtonContainer}>

                                <TouchableOpacity
                                    style={[styles.button, styles.viewDirectionButton]}
                                    onPress={async () => {
                                        setDisplayRoute(true)
                                        console.log('display route')
                                        console.log(routeDirections)
                                        console.log(selectedItemId)
                                    }}
                                >
                                    <Text style={[styles.buttonText, styles.viewDirectionText]}>Chỉ đường</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.getDetailsButton]}
                                    onPress={async () => { 
                                        try {

                                            // await AsyncStorage.removeItem('@placeId');
                                            // await AsyncStorage.setItem('@placeId', selectedPlace.id.toString());
                                            // console.log(selectedPlace.id.toString())
                                            navigation.navigate("Attractions", {
                                                placeId: selectedPlace.id
                                            })
                                            console.log(selectedPlace.id)
                                        } catch (e) {
                                            console.log(e)
                                        }
                                        
                                     }}
                                >
                                    <Text style={[styles.buttonText, styles.getDetailsText]}>Xem chi tiết</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.getDetailsButton, { borderColor: addToWayPointButtonColor }]}
                                    onPress={() => {
                                        if (!waypoints.includes(selectedPlace.coordinate)) {
                                            setWaypoints([...waypoints, selectedPlace.coordinate])
                        
                                        } else {
                                            setWaypoints(waypoints.filter((waypoint) => waypoint !== selectedPlace.coordinate))
                                        }

                                    }}
                                >
                                    <Text style={[styles.buttonText, { color: addToWayPointButtonColor }]}>{addToWayPointButtonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>



                    </BottomSheet>

                </GestureHandlerRootView>}
            <View style={{ backgroundColor: "#ffffff" }} ref={footerRef}>
                <FooterMenu />
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: '100%',
        // backgroundColor: "white"
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
        paddingLeft: 10,
        backgroundColor: "white",
        padding: 8,
        zIndex: 2,
        borderRadius: 7
    },
    inputContainerStyle: {
        margin: 0, borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
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
        paddingLeft: 10,
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
        width: "95%",

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
        width: "100%",
    },
    button: {
        height: 40,
        flexGrow: 1,
        flexBasis: 0,
        borderRadius: 4,
        marginVertical: 8,
        marginHorizontal: 4,
        paddingHorizontal: 5,
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
        fontSize: 10,
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
    // way point button
    waypointButton: {
        width: 70,
        height: 70,
        right: 0,
        borderRadius: 35,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        zIndex: 4,
    }
})


export default Map;

