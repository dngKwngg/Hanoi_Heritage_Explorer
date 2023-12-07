import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "../constants/colors";

const AttractionTicket = ({ location }) => {
    const adultPrice = location.categories[5].adultPrice;
    const teenPrice = location.categories[5].teenPrice;
    const childrenPrice = location.categories[5].childPrice;

    // Use state to store quantity of tickets
    const [quantity_adult, setQuantity_adult] = useState(0);
    const [quantity_teen, setQuantity_teen] = useState(0);
    const [quantity_child, setQuantity_child] = useState(0);

    // // Use state to store booked ticket
    // const [bookedTickets, setBookedTickets] = useState([]);
    // Increase and decrease quantity
    // Adult
    const increaseQuantity_adult = () => {
        setQuantity_adult(quantity_adult + 1);
    };

    const decreaseQuantity_adult = () => {
        if (quantity_adult > 0) {
            setQuantity_adult(quantity_adult - 1);
        }
    };
    // Teen
    const increaseQuantity_teen = () => {
        setQuantity_teen(quantity_teen + 1);
    };
    const decreaseQuantity_teen = () => {
        if (quantity_teen > 0) {
            setQuantity_teen(quantity_teen - 1);
        }
    };
    // Child
    const increaseQuantity_child = () => {
        setQuantity_child(quantity_child + 1);
    };

    const decreaseQuantity_child = () => {
        if (quantity_child > 0) {
            setQuantity_child(quantity_child - 1);
        }
    };

    // Handle book ticket
    const handleBookTicket = () => {
        // Xử lý việc đặt vé ở đây
        const selectedDate = new Date(dateOfVisit);
        const currentDate = new Date(); // Lấy thời gian hiện tại
        const timeDifference = selectedDate.getTime() - currentDate.getTime();
        if (quantity_adult == 0 && quantity_child == 0 && quantity_teen == 0) {
            if (dateOfVisit == "") {
                Alert.alert("Vui lòng chọn số lượng vé và ngày tham quan.");
            } else {
                if (selectedDate.getTime() >= currentDate.getTime()) {
                    Alert.alert("Vui lòng chọn số lượng vé.");
                } else {
                    Alert.alert("Vui lòng chọn ngày khác và chọn số lượng vé.");
                }
            }
        } else {
            if (dateOfVisit == "") {
                Alert.alert("Vui lòng chọn ngày tham quan.");
            } else {
                if (selectedDate.getTime() >= currentDate.getTime()) {
                    if (
                        timeDifference >= 0 &&
                        timeDifference <= 6 * 30 * 24 * 60 * 60 * 1000
                    ) {
                        // Store the booked ticket information
                        const bookedTicket = {
                            quantity_adult,
                            quantity_teen,
                            quantity_child,
                            dateOfVisit,
                        };

                        setQuantity_adult(0);
                        setQuantity_child(0);
                        setQuantity_teen(0);
                        setdateOfVisit("");
                        setDate(new Date());

                        Alert.alert(
                            "Đặt vé thành công!",
                            "SDT liên hệ: 0359441125\nSTK: 162511202283\nNgân hàng MB Bank\nChủ tài khoản: Nguyễn Diệu Thanh"
                        );
                    } else {
                        Alert.alert("Không thể đặt vé cho thời điểm này.");
                    }
                } else {
                    Alert.alert("Vui lòng chọn ngày khác.");
                }
            }
        }
    };

    const [dateOfVisit, setdateOfVisit] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };
    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                setdateOfVisit(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ paddingLeft: 16 }}>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 10,
                        alignItems: "center",
                    }}
                >
                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                        />
                    )}
                    {!showPicker && (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder="Select date"
                                value={dateOfVisit}
                                onChangeText={setdateOfVisit}
                                placeholderTextColor="black"
                                editable={false}
                            />
                            <TouchableOpacity
                                onPress={toggleDatePicker}
                                style={{
                                    padding: 8,
                                    paddingRight: 0,
                                    marginLeft: -30,
                                }}
                            >
                                <Icon
                                    name="calendar-o"
                                    size={20}
                                    style={{
                                        marginLeft: -5,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Adult ticket */}
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: "#ddd",
                            borderRadius: 20,
                        }}
                    >
                        <Image
                            source={require("../assets/images/adult.png")}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            marginLeft: 20,
                            position: "relative",
                            backgroundColor: "#ddd",
                        }}
                    >
                        <View style={{ position: "absolute", top: 10 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "700",
                                }}
                            >
                                NGƯỜI LỚN
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                position: "absolute",
                                bottom: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {adultPrice} VND
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    position: "absolute",
                                    left: 120,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.decreaseButton}
                                    onPress={decreaseQuantity_adult}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>
                                    {quantity_adult}
                                </Text>
                                <TouchableOpacity
                                    style={styles.increaseButton}
                                    onPress={increaseQuantity_adult}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Teen ticket */}
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: "#ddd",
                            borderRadius: 20,
                        }}
                    >
                        <Image
                            source={require("../assets/images/student.png")}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            marginLeft: 20,
                            position: "relative",
                            backgroundColor: "#ddd",
                        }}
                    >
                        <View style={{ position: "absolute", top: 10 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "700",
                                }}
                            >
                                HỌC SINH, SINH VIÊN
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                position: "absolute",
                                bottom: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {teenPrice} VND
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    position: "absolute",
                                    left: 120,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.decreaseButton}
                                    onPress={decreaseQuantity_teen}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>
                                    {quantity_teen}
                                </Text>
                                <TouchableOpacity
                                    style={styles.increaseButton}
                                    onPress={increaseQuantity_teen}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Children ticket */}
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: "#ddd",
                            borderRadius: 20,
                        }}
                    >
                        <Image
                            source={require("../assets/images/child.png")}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            marginLeft: 20,
                            position: "relative",
                            backgroundColor: "#ddd",
                        }}
                    >
                        <View style={{ position: "absolute", top: 10 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "700",
                                }}
                            >
                                TRẺ EM DƯỚI 6 TUỔI
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                position: "absolute",
                                bottom: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {childrenPrice} VND
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    position: "absolute",
                                    left: 120,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.decreaseButton}
                                    onPress={decreaseQuantity_child}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>
                                    {quantity_child}
                                </Text>
                                <TouchableOpacity
                                    style={styles.increaseButton}
                                    onPress={increaseQuantity_child}
                                >
                                    <Text style={styles.quantityButtonText}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 50,
                        marginLeft: 4,
                        marginBottom: 10,
                    }}
                >
                    <Text style={[styles.content, { fontWeight: "bold" }]}>
                        Thành tiền:{" "}
                    </Text>
                    <Text
                        style={[
                            styles.content,
                            { marginLeft: 150, fontWeight: "bold" },
                        ]}
                    >
                        {quantity_adult * adultPrice +
                            quantity_teen * teenPrice +
                            quantity_child * childrenPrice}{" "}
                        VND
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleBookTicket}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Đặt vé
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        marginTop: 4,
    },
    container: {
        flexDirection: "row",
    },
    content: {
        fontSize: 16,
    },
    quantityTicket: {
        flexDirection: "row",
        marginLeft: 55,
        width: 130,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    increaseButton: {
        width: 30,
        borderRadius: 5,
        backgroundColor: "#4E4AF2",
        justifyContent: "center",
        alignItems: "center",
    },
    decreaseButton: {
        width: 30,
        borderRadius: 5,
        backgroundColor: "#353F54",
        justifyContent: "center",
        alignItems: "center",
    },
    quantityButtonText: {
        color: "white",
        fontWeight: "900",
    },
    quantityText: {
        fontSize: 16,
        width: 40,
        textAlign: "center",
    },
    input: {
        color: "black",
        fontSize: 16,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: 50,
        paddingLeft: 10,
    },
});

export default AttractionTicket;
