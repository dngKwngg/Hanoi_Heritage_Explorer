import React, { useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	ScrollView,
	Text,
	StatusBar,
	TouchableOpacity,
	Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import { eventOfDestinations } from "../constants/eventOfDestinations";
const NotificationScreen = ({ navigation }) => {
	const isFutureEvent = (event) => {
		const today = new Date(); // today được khởi tạo bằng new Date() sẽ là ngày hiện tại
		if (
			event.day.getDate() === today.getDate() &&
			event.day.getMonth() === today.getMonth() &&
			event.day.getFullYear() === today.getFullYear() &&
			event.type == "Sắp diễn ra"
		) {
			event.type = "Đang diễn ra";
			return true;
		} else if (event.day > today) {
			return true;
		} else {
			return false;
		}
	};
	const sortedAndFilteredEventOfDestinations = eventOfDestinations
		.slice()
		.sort((a, b) => a.day - b.day)
		.filter(isFutureEvent);
	const formatDate = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1; // Month starts from 0
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};
	function renderTypeOfEvent(item) {
		if (item.type === "Sắp diễn ra" || item.type === "Đang diễn ra") {
			return "bullhorn";
		} else if (item.type === "Hủy sự kiện") {
			return "exclamation";
		}
	}
	const renderItemOfEvents = (item, idx) => {
		{
			console.log(item.name);
			console.log(idx);
			console.log(item.content);
		}
		return (
			<TouchableOpacity
				key={idx}
				onPress={() => {
					navigation.navigate("Event", {
						currentIndex: idx,
						sortedAndFilteredEventOfDestinations:
							sortedAndFilteredEventOfDestinations,
					});
					console.log("This is index: " + idx);
				}}
			>
				<Card
					containerStyle={{
						borderRadius: 30,
						backgroundColor: "#f8f9fb",
						marginBottom: 20,
					}}
					key={idx}
				>
					<View style={{ flexDirection: "row" }}>
						<Icon
							name={renderTypeOfEvent(item)}
							size={30}
							color="#000"
							style={{ marginLeft: 10 }}
						/>
						<Text style={{ fontSize: 18, marginLeft: 10 }}>
							{" "}
							{item.type}{" "}
						</Text>
					</View>
					<View style={styles.row} key={idx}>
						<Image
							source={{ uri: item.url }}
							style={styles.image}
							key={idx}
						/>
						<View style={{ flex: 1, marginLeft: 10 }}>
							<Text style={{ fontSize: 14 }}>
								<Text style={{ fontWeight: "bold" }}>
									Tên sự kiện:
								</Text>{" "}
								{item.name}
							</Text>
							<Text style={{ fontSize: 14 }}>
								<Text style={{ fontWeight: "bold" }}>
									Thời gian:
								</Text>{" "}
								{formatDate(item.day)}
							</Text>
							<Text style={{ fontSize: 14 }}>
								<Text style={{ fontWeight: "bold" }}>
									Địa điểm:
								</Text>{" "}
								{item.address}
							</Text>
						</View>
					</View>
				</Card>
			</TouchableOpacity>
		);
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
					Thông Báo
				</Text>
			</View>
			{/* Body */}
			<ScrollView>
				{/* {sortedAndFilteredEventOfDestinations.map((item, idx) =>
					renderItemOfEvents(item, idx)
				)} */}

				{sortedAndFilteredEventOfDestinations.map(renderItemOfEvents)}
			</ScrollView>
		</View>
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

export default NotificationScreen;
