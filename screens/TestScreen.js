import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Text,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import Carousel from "../components/Carousel";
const EventScreen = () => {
    const eventOfDestinations = [
        {
            type: "Sắp diễn ra",
            name: "Đêm thiêng liêng",
            url: "https://tl.cdnchinhphu.vn/thumb_w/640/344445545208135680/2023/2/15/z4111968465206cef34f2b14b9e5d42b3ff284fcd6bc34-16764631737191013402766.jpg",
            address: "Hỏa Lò",
            // day: new Date(2023, 10, 15),
            day: new Date(),
            carouselData: [
                {
                    id: 1,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
                {
                    id: 2,
                    image: "https://yourvacation.vn/uploads/images/%C4%91%C3%AAm-ling-thi%C3%AAng.jpg",
                },
                {
                    id: 3,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
            ],
        },
        {
            type: "Sắp diễn ra",
            name: 'Khai mạc trưng bày triển lãm "Thành xưa phố cũ"',
            url: "https://hoangthanhthanglong.vn/wp-content/uploads/2023/10/thanhphoxuacu01.jpg",
            address: "Hoàng Thành Thăng Long",
            day: new Date(2023, 10, 14),
            carouselData: [
                {
                    id: 1,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
                {
                    id: 2,
                    image: "https://yourvacation.vn/uploads/images/%C4%91%C3%AAm-ling-thi%C3%AAng.jpg",
                },
                {
                    id: 3,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
            ],
        },
        {
            type: "Sắp diễn ra",
            name: 'Chương trình Tết Việt 2024 chủ đề "Cung đình ngày xuân"',
            url: "https://hoangthanhthanglong.vn/wp-content/uploads/2023/05/cungdinhngayxuan04-768x576-1.jpg",
            address: "Hoàng Thành Thăng Long",
            day: new Date(2024, 1, 4),
            carouselData: [
                {
                    id: 1,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
                {
                    id: 2,
                    image: "https://yourvacation.vn/uploads/images/%C4%91%C3%AAm-ling-thi%C3%AAng.jpg",
                },
                {
                    id: 3,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
            ],
        },
        {
            type: "Sắp diễn ra",
            name: 'Chương trình "Xuân quê hương 2024"',
            url: "https://hoangthanhthanglong.vn/wp-content/uploads/2023/05/xuanquehuong2023-a10-768x510-1.jpg",
            address: "Hoàng Thành Thăng Long",
            day: new Date(2024, 1, 5),
            carouselData: [
                {
                    id: 1,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
                {
                    id: 2,
                    image: "https://yourvacation.vn/uploads/images/%C4%91%C3%AAm-ling-thi%C3%AAng.jpg",
                },
                {
                    id: 3,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
            ],
        },
        {
            type: "Hủy sự kiện",
            name: 'Tour đêm "Giải mã Hoàng thành Thăng Long"',
            url: "https://hoangthanhthanglong.vn/wp-content/uploads/2023/05/tourdem2-768x512-1.jpg",
            address: "Hoàng Thành Thăng Long",
            day: new Date(2023, 11, 6),
            carouselData: [
                {
                    id: 1,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
                {
                    id: 2,
                    image: "https://yourvacation.vn/uploads/images/%C4%91%C3%AAm-ling-thi%C3%AAng.jpg",
                },
                {
                    id: 3,
                    image: "https://old.hoalo.vn/DataFiles/2020/06/News/4fcf4f7b43b1beefe7a0.jpg",
                },
            ],
        },
    ];

    return (
        // <View>
        //     <Text>Event Screen</Text>
        //     <Carousel carouselData={eventOfDestinations[0].carouselData} />
        // </View>
        <View></View>
    );
};
const styles = StyleSheet.create({
    image: {
        width: "30%",
        height: 100,
    },
    row: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 30,
    },
    contentEvent: {
        flexDirection: "row",
    },
});
export default EventScreen;
