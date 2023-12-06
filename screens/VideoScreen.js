import React, { useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Card } from "react-native-elements";
import { categories } from "../constants/categories";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { destinations } from "../constants/destinations";
const VideoScreen = () => {
	const [playing, setPlaying] = useState(false);
	const [activeCategory, setActiveCategory] = useState(1);
	const index = 0;

	const renderItemVideo = (item, idx) => {
		return (
			<View style={styles.container} key={idx}>
				<Card
					containerStyle={{
						borderRadius: 30,
						height: 280,
						backgroundColor: "#f8f9fb",
					}}
				>
					<YoutubePlayer
						height={200}
						play={playing}
						videoId={item.url}
					/>
					<Text style={styles.title}>{item.title}</Text>
				</Card>
			</View>
		);
	};
	const renderVideo = (item) => {
		return (
			<View>{destinations[index].videoList.map(renderItemVideo)}</View>
		);
	};
	const renderCategoryContent = () => {
		const selectedCategory = categories.find(
			(category) => category.id === activeCategory
		);

		if (!selectedCategory) {
			return null;
		}
		if (selectedCategory.id === 5) {
			return renderVideo(selectedCategory);
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
	container: {
		marginTop: 30,
	},

	title: {
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 30,
		textAlign: "center",
	},
});

export default VideoScreen;
