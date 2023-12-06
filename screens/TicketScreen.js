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
import { categories } from "../constants/categories";
import COLORS from "../constants/colors";
import { destinations } from "../constants/destinations";
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
		const selectedCategory = categories.find(
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
					data={categories}
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
