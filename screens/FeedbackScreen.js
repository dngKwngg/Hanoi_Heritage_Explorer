import React, { useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	ScrollView,
	Text,
	StatusBar,
	TouchableOpacity,
	TextInput,
	ImageBackground,
	Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import COLORS from "../constants/colors";
import { destinations } from "../constants/destinations";
const FeedbackScreen = () => {
	const index = 0;
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
				color="yellow"
				key={idx}
				onPress={() => handleStarPress(idx)}
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
			<ImageBackground
				source={{
					uri: destinations[index].bgReview,
				}}
				style={styles.background}
				blurRadius={0.5}
			>
				<View style={styles.container}>
					<Card containerStyle={{ borderRadius: 30 }}>
						<Text style={[styles.title, { fontSize: 18 }]}>
							Tên: {destinations[index].name}
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
								}}
							>
								Gửi phản hồi
							</Text>
						</TouchableOpacity>
					</Card>
				</View>
			</ImageBackground>
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
					{destinations[index].name}
				</Text>
			</View>
			{/* Body */}
			{renderReview()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	background: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		marginTop: 4,
	},
	review: {
		borderWidth: 1,
		borderColor: "#d0d7de",
		height: 100,
		padding: 10,
	},
	title: {
		textAlign: "center",
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

export default FeedbackScreen;
