import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Pressable,
    Platform,
    FlatList,
    Alert,
} from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { locations } from "../constants/locations";
import COLORS from "../constants/colors";
const TicketScreen = () => {
    const ticket_adult = 50000;
    const ticket_child = 20000;
    const [quantity_adult, setQuantity_adult] = useState(0);
    const [quantity_child, setQuantity_child] = useState(0);
    const index = 0;
    const increaseQuantity_adult = () => {
        setQuantity_adult(quantity_adult + 1);
    };

    const decreaseQuantity_adult = () => {
        if (quantity_adult > 0) {
            setQuantity_adult(quantity_adult - 1);
        }
    };
    const increaseQuantity_child = () => {
        setQuantity_child(quantity_child + 1);
    };

    const decreaseQuantity_child = () => {
        if (quantity_child > 0) {
            setQuantity_child(quantity_child - 1);
        }
    };
    const handleBookTicket = () => {
        // Xử lý việc đặt vé ở đây
        const selectedDate = new Date(dateOfVisit);
        const currentDate = new Date(); // Lấy thời gian hiện tại
        const timeDifference = selectedDate.getTime() - currentDate.getTime();
        if (quantity_adult == 0 && quantity_child == 0) {
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
                        setQuantity_adult(0);
                        setQuantity_child(0);
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
    const destinations = [
        {
            name: "Hoàng Thành Thăng Long",
            url: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/5/7/1189286/Anh-Hoang-Thanh-Than-11.jpg",
            imageList: [
                "https://ik.imagekit.io/tvlk/blog/2022/03/hoang-thanh-thang-long-1.jpg",
                "https://image.nhandan.vn/1200x630/Uploaded/2023/igpcvcvjntc8510/2022_10_02/304907405-1678216739216079-5793824505040513118-n-1164.jpg.webp",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/38.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2022/08/1M6A4290-800x500.jpg",
                "https://tl.cdnchinhphu.vn/344445545208135680/2022/4/30/anh-httl-16512788990051146244697.jpg",
                "https://static1.cafeland.vn/cafelandnew/hinh-anh/2022/12/08/hoang-thanh-thang-long.png",
                "https://file3.qdnd.vn/data/images/0/2022/09/10/vuhuyen/hoang-thanh.jpg?dpi=150&quality=100&w=870",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/untitled-126.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/untitled-85.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/untitled-7.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/23.jpg",
                "http://hoangthanhthanglong.com/store/uploads/2018/11/45.jpg",
                "http://hoangthanhthanglong.com/store/uploads/2018/11/44.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/30.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/28.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/36.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/37.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/35.jpg",
                "https://hoangthanhthanglong.com/store/uploads/2018/11/34.jpg",
                "http://hoangthanhthanglong.com/store/uploads/2018/11/47.jpg",
                "http://hoangthanhthanglong.com/store/uploads/2018/11/52.jpg",
                "http://hoangthanhthanglong.com/store/uploads/2018/11/48.jpg",
            ],
            bgReview:
                "http://hoangthanhthanglong.com/store/uploads/2018/11/48.jpg",
            videoList: [
                {
                    title: "Hoàng Thành Thăng Long Hà Nội còn lại di tích gì sau 1000 năm",
                    url: "k4iWrukqY-o",
                },
                {
                    title: "Trải nghiệm tour đêm tại Hoàng thành Thăng Long",
                    url: "I3DA84EBoMc",
                },
            ],
        },
        {
            name: "Hỏa Lò",
            url: "https://ik.imagekit.io/tvlk/blog/2022/11/go-and-share-nha-tu-hoa-lo-1.jpg?tr=dpr-2,w-675",
            imageList: [
                "https://ik.imagekit.io/tvlk/blog/2022/11/go-and-share-nha-tu-hoa-lo-1.jpg?tr=dpr-2,w-675",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRc8DyoEiA6E7JPIQ-481Ix7Vl0JESdcxu6g&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyeA9clef-o5Wiy2KwXqinFoG7EnexjiVrA&usqp=CAU",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image014.jpg",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image016.jpg",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image006.jpg",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image020.jpg",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image032.jpg",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image034.jpg",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image052.jpg",
                "http://old.hoalo.vn/DataFiles/2015/12/News/image054.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSWgBcz1AuYGGOffb_JzPfuv09Im8_Xcsng&usqp=CAU",
                "https://vcdn1-dulich.vnecdn.net/2018/08/27/2-1535360145.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=NIqsaPVHt1XXQlX-wAI9FQ",
                "https://cdnimg.vietnamplus.vn/uploaded/mzdic/2023_02_15/ttxvn_ha_noi_ra_mat_tour_dem_hoa_lo_1.jpg",
            ],
            bgReview:
                "https://vcdn1-dulich.vnecdn.net/2018/08/27/2-1535360145.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=NIqsaPVHt1XXQlX-wAI9FQ",
            videoList: [
                {
                    title: "Tour đêm di tích nhà tù Hỏa Lò - Một trong 5 nhà tù Đáng Sợ Nhất Đông Nam Á",
                    url: "8WVM8FG7Fh4",
                },
                {
                    title: "Nhà tù Hỏa Lò, nơi từng được gọi là Hilton Hà Nội",
                    url: "QPLgmHOZjdU",
                },
            ],
        },
        {
            name: "Quảng trường Ba Đình",
            url: "https://reviewvilla.vn/wp-content/uploads/2023/01/quang-truong-ba-dinh-2.jpg",
            imageList: [
                "https://statics.vinpearl.com/quang-truong-ba-dinh-1_1680149609.jpg",
                "https://statics.vinpearl.com/quang-truong-ba-dinh-2_1680149655.jpg",
                "https://statics.vinpearl.com/quang-truong-ba-dinh-4_1680149711.jpg",
                "https://media.mia.vn/uploads/blog-du-lich/kham-pha-quang-truong-ba-dinh-noi-luu-giu-lich-su-giua-long-ha-noi-1639388972.jpg",
                "https://statics.vinpearl.com/quang-truong-ba-dinh-7_1680149793.jpg",
                "https://mediaim.expedia.com/destination/1/cc157faf5813cc8fffa749c761051845.jpg",
                "https://vnanet.vn/Data/Articles/2020/09/01/4991644/vna_potal_quang_truong_ba_dinh_%E2%80%93_noi_ghi_dau_nhieu_su_kien_trong_dai_cua_dat_nuoc_111645353_stand.jpg",
                "https://i.pinimg.com/736x/9b/b4/19/9bb41948638faf3e21a473f939f824dc.jpg",
                "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/4/30/va06208-16512840381401671278631.jpg",
                "https://res.cloudinary.com/nifehub-production/image/upload/public/64c/c08/957/64cc0895737fe311406095.jpg",
                "https://i.imgur.com/pd9ykjG.jpg",
                "https://file.qdnd.vn/data/images/0/2018/09/01/nguyenthao/chu%20tich%20hcm.jpg?w=575",
                "https://dulichkhampha24.com/wp-content/uploads/2020/01/quang-truong-ba-dinh-ha-noi-11.jpg",
                "https://kenh24h.com.vn/wp-content/uploads/2020/09/1-3.jpg",
            ],
            bgReview:
                "https://statics.vinpearl.com/quang-truong-ba-dinh-2_1680149655.jpg",
            videoList: [
                {
                    title: "Lễ hạ cờ ở quảng trường Ba Đình",
                    url: "oVK1wCaSF14",
                },
                {
                    title: "Tham Quan Lăng Bác | Quảng Trường Ba Đình | Hà Nội",
                    url: "n-cCziVKtGQ",
                },
            ],
        },
    ];
    const [activeCategory, setActiveCategory] = useState(1);
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
    const renderTicket = (category) => {
        return (
            <ImageBackground
                source={{
                    uri: destinations[index].url,
                }}
                style={styles.background}
                blurRadius={0.5}
            >
                <View
                    style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#fff"
                        hidden={false}
                    />

                    <View style={styles.form}>
                        <Card
                            containerStyle={{
                                borderRadius: 30,
                                width: "100%",
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>
                                Vé vào cửa {destinations[index].name}{" "}
                            </Text>
                            <View
                                style={{ flexDirection: "row", marginTop: 10 }}
                            >
                                <Text style={{ fontSize: 18 }}>Ngày: </Text>

                                {showPicker && (
                                    <DateTimePicker
                                        mode="date"
                                        display="spinner"
                                        value={date}
                                        onChange={onChange}
                                    />
                                )}
                                {!showPicker && (
                                    <Pressable onPress={toggleDatePicker}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Chọn ngày đặt vé tham quan"
                                            value={dateOfVisit}
                                            onChangeText={setdateOfVisit}
                                            placeholderTextColor="#11182744"
                                            editable={false}
                                        />
                                    </Pressable>
                                )}
                            </View>

                            <View style={[styles.container, { marginTop: 10 }]}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.content}>
                                        Người lớn:
                                    </Text>
                                    <Text
                                        style={[
                                            styles.content,
                                            { marginLeft: 7 },
                                        ]}
                                    >
                                        {ticket_adult} VND
                                    </Text>
                                </View>
                                <View style={styles.quantityTicket}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={decreaseQuantity_adult}
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>
                                        {quantity_adult}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={increaseQuantity_adult}
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.container, { marginTop: 10 }]}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text style={styles.content}>Trẻ em:</Text>
                                    <Text
                                        style={[
                                            styles.content,
                                            { marginLeft: 26 },
                                        ]}
                                    >
                                        {ticket_child} VND
                                    </Text>
                                </View>
                                <View style={styles.quantityTicket}>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={decreaseQuantity_child}
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.quantityText}>
                                        {quantity_child}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={increaseQuantity_child}
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.content,
                                        { fontWeight: "bold" },
                                    ]}
                                >
                                    Thành tiền:{" "}
                                </Text>
                                <Text
                                    style={[
                                        styles.content,
                                        { marginLeft: 133, fontWeight: "bold" },
                                    ]}
                                >
                                    {quantity_adult * ticket_adult +
                                        quantity_child * ticket_child}{" "}
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
                        </Card>
                    </View>
                </View>
            </ImageBackground>
        );
    };
    const renderCategoryContent = () => {
        const selectedCategory = locations[0].categories.find(
            (category) => category.id === activeCategory
        );

        if (!selectedCategory) {
            return null;
        }
        if (selectedCategory.id === 6) {
            return renderTicket(selectedCategory);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#fff"
                hidden={false}
            />
            {/* Header */}
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingTop: 16,
                    backgroundColor: "white",
                }}
            >
                <TouchableOpacity style={{ position: "absolute", left: 16 }}>
                    <Icon
                        name="angle-left"
                        size={24}
                        style={{ paddingLeft: 16, bottom: -8 }}
                    ></Icon>
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 8,
                        bottom: 8,
                    }}
                >
                    {destinations[index].name}
                </Text>
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 12 }}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={locations[0].categories}
                    keyExtractor={(item) => item.id}
                    style={{ overflow: "visible" }}
                    renderItem={({ item }) => {
                        let isActive = item.id === activeCategory;
                        let activeTextClass = isActive ? "white" : "black";
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setActiveCategory(item.id);
                                }}
                                style={{
                                    backgroundColor: isActive
                                        ? COLORS.primary
                                        : "rgba(0, 0, 0, 0.07)",
                                    padding: 8,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    borderRadius: 9999,
                                    marginRight: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        color: activeTextClass,
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                ></FlatList>
            </View>
            {/* Body */}

            {renderCategoryContent()}
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
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    container: {
        flexDirection: "row",
    },
    content: {
        fontSize: 16,
    },
    quantityTicket: {
        flexDirection: "row",
        marginLeft: 50,
        width: 130,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    quantityButton: {
        width: 25,
        borderRadius: 5,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
    },
    quantityText: {
        fontSize: 20,
        paddingHorizontal: 10,
        width: 80,
        textAlign: "center",
    },
    input: {
        color: "black",
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },
});

export default TicketScreen;
