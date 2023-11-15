import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, StatusBar, TouchableOpacity, FlatList } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { categories } from "../constants/categories";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";

const VideoScreen = () => {
  const [playing, setPlaying] = useState(false);

  const index = 0;
  const destinations = [
    { name: 'Hồ Hoàn Kiếm' },
  ]


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

  const renderTab = (item) => {
    return (
    <ScrollView style={styles.container}>
      <YoutubePlayer
        height={190}
        play={playing}
        videoId={"5sGQuTNrBnM"}

      />
      <Text style={styles.title}>
        Hồ Hoàn Kiếm - Di tích lịch sử và danh lam thắng cảnh của Thủ đô
      </Text>

      <YoutubePlayer
        height={190}
        play={playing}
        videoId={"WR2ApqIYtfc"}
      />
      <Text style={styles.title}>
        Hồ Hoàn Kiếm tuyệt đẹp từ trên cao
      </Text>

      <YoutubePlayer
        height={190}
        play={playing}
        videoId={"bMtvWMZAhns"}
      />
      <Text style={styles.title}>
        Phố đi bộ Hồ Hoàn Kiếm - Tăng sức hấp dẫn đô thị Hà Nội 
      </Text>
    </ScrollView>
    )
  }



  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        hidden={false}
      />
     
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
    {renderNavContent()}   
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 30
  },
});


export default VideoScreen;