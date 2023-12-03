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
const ReviewScreen = () => {
	const index = 0;
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
			Alert.alert("Đăng thành công!");
			setArrStars([false, false, false, false, false]);
		} else {
			Alert.alert("Bạn chưa đánh giá sao!");
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
							Chia sẻ thêm về trải nghiệm của bạn
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
								Đăng
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

export default ReviewScreen;
