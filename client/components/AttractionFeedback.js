import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import COLORS from "../constants/colors";

const AttractionFeedback = ({ location }) => {
    const [content, setContent] = useState("");
    const [arrStars, setArrStars] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);
    const [checkStar, setCheckStar] = useState(false); // Kiểm tra xem người dùng đã chọn sao chưa
    const renderStar = (item, idx) => {
        const iconName = item ? "star" : "star-o";
        return (
            <Icon
                name={iconName}
                size={30}
                color="black"
                key={idx}
                onPress={() => handleStarPress(idx)}
                style={{ marginHorizontal: 5 }}
            />
        );
    };

    const handleStarPress = (starIndex) => {
        const updatedStars = arrStars.map((item, idx) =>
            idx <= starIndex ? true : false
        );
        setArrStars(updatedStars);
        setCheckStar(true);
    };
    const handlePostReview = () => {
        // Xử lý việc đăng tải bài review ở đây
        // console.log("Đăng thành công!");
        if (checkStar) {
            setContent("");
            Alert.alert(
                "Gửi phản hồi thành công!",
                "Nếu bạn có vấn đề cần liên hệ gấp xin hãy liên hệ với chúng tôi\nHotline: 0909555888\nEmail:HanoiExplore@gmail.com"
            );
            setArrStars([false, false, false, false, false]);
            setCheckStar(false);
        } else {
            Alert.alert("Hãy đánh giá sao về trải nghiệm của bạn nhé!");
        }
    };
    const renderReview = () => {
        return (
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/feedback.png")}
                    style={{
                        width: 200,
                        height: 200,
                        marginTop: 20,
                        alignSelf: "center",
                        // backgroundColor: "#ddd",
                    }}
                />
                <Card containerStyle={styles.cardStyle}>
                    <Text style={[styles.title, { fontSize: 18 }]}>
                        Phản hồi về trải nghiệm của bạn tại {location.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                        }}
                    >
                        {arrStars.map((item, idx) => renderStar(item, idx))}
                    </View>
                    <Text style={[styles.title, { fontSize: 14 }]}>
                        Gửi phản hồi thêm về trải nghiệm của bạn
                    </Text>
                    <TextInput
                        placeholder="Nhập nội dung"
                        textAlignVertical="top"
                        multiline={true} // Cho phép nhập nhiều dòng
                        numberOfLines={4} // Số dòng hiển thị ban đầu
                        value={content}
                        onChangeText={(text) => setContent(text)}
                        style={styles.review}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePostReview}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: "bold",
                                fontFamily: "Montserrat-Bold",
                            }}
                        >
                            Gửi phản hồi
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* Body */}
            {renderReview()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignContent: "center",
        backgroundColor: "white",
    },
    cardStyle: {
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        marginTop: 4,
    },
    review: {
        fontFamily: "Montserrat-Regular",
        borderWidth: 1,
        borderColor: "#d0d7de",
        height: 100,
        padding: 10,
    },
    title: {
        fontFamily: "Montserrat-Bold",
        padding: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 20,
    },
});

export default AttractionFeedback;
