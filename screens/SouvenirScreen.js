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
import { categories } from "../constants/categories";

const SouvenirScreen = () => {
	const destinations = [
		{
			name: "Cửa hàng đồ lưu niệm Ngọc Thu",
			url: "https://danviet.mediacdn.vn/296231569849192448/2021/10/12/base64-1634021550081447466726.png",
			address: "16 Hàng Gai - Hoàn Kiếm - Hà Nội",
            starttime: "8:00",
            endtime: "23:00",
			star: 4,
		},
		{
			
			name: "Đồ thủ công mỹ nghệ Mai Vân",
			url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAIB5jF8EDSuw9FL4mjMb8_rxMR2x4F1eTQsumJDDzE0iZa4fmIDbt9RnwqWGGThx7wsc&usqp=CAU",
			address: "48 Hàng Gai - Hoàn Kiếm - Hà Nội",
            starttime: "8:30",
            endtime: "22:30",
            star: 4.7,
		},
		{
			name: "Cửa hàng Amazing Hà Nội",
			url: "https://i0.wp.com/topnoithat.com/wp-content/uploads/2021/06/cua-hang-amazing-ha-noi-69-71-hang-gai-hoan-kiem.jpg?resize=850%2C491&ssl=1",
			address: "71 Hàng Gai - Hoàn Kiếm - Hà Nội",
			starttime: "7:30",
            endtime: "22:30",
            star: 4.5,
		},
        {
			name: "Nguyễn Gia Shop",
			url: "https://mytourcdn.com/upload_images/Image/Minh%20Hoang/2014/11/2/2/Pho-ho-hoan-kiem-12.jpg",
			address: "28 Đường Hồ Hoàn Kiếm - Hoàn Kiếm - Hà Nội",
			starttime: "7:00",
            endtime: "22:30",
            star: 4.6,
		},
	
	];

    const [activeCategory, setActiveCategory] = useState(1);
    const renderNavContent = () => {
      const selectedCategory = categories.find(
        (category) => category.id === activeCategory
      )
  
      if (!selectedCategory) {
        return null;
      }
      if (selectedCategory.id === 5) {
        return renderTab(selectedCategory)
      }
    }

    const renderTab = (i) => {
        return (
            destinations.slice().map((item, idx) =>
                renderSouvenirShops(item, idx)
            )
        )
    }
	
	
	const renderSouvenirShops = (item, idx) => (
    
		<Card
			containerStyle={{
				borderRadius: 30,
				backgroundColor: "#f8f9fb",
				marginBottom: 20,
			}}
			key={idx}
		>
			
			<View style={styles.row} key={idx}>
				<Image
					source={{ uri: item.url }}
					style={styles.avatar}
					key={idx}
				/>
				<View style={{ flex: 1, marginLeft: 10 }}>
					<Text style={{ fontSize: 15, fontWeight: "bold" }}>
						{item.name}
					</Text>
					<Text style={{ fontSize: 15, fontWeight: "400" }}>
					
						{item.star} {''}
                        <Icon
                        name="star"
                        size={15}
                        color="#ffe135"
                        
                        />
					</Text>
					<Text style={{ fontSize: 14 }}>
						<Text style={{ fontWeight: "bold" }}>Giờ mở cửa: </Text>{" "}
						{item.starttime}
					</Text>
                    <Text style={{ fontSize: 14 }}>
						<Text style={{ fontWeight: "bold" }}>Giờ đóng cửa: </Text>{" "}
						{item.endtime}
					</Text>
                    <Text style={{ fontSize: 14 }}>
						<Text style={{ fontWeight: "bold" }}>Địa chỉ: </Text>{" "}
						{item.address}
					</Text>
				</View>
			</View>
		</Card>
        
	);

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
					Hồ Hoàn Kiếm
				</Text>
			</View>
			{/* Body */}
			<ScrollView>
            {destinations.slice().map((item, idx) =>
                renderSouvenirShops(item, idx)) }

                {/* {renderNavContent()} */}
				
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	avatar: {
		width: "40%",
		
	},
	row: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 30,
	},

});

export default SouvenirScreen;