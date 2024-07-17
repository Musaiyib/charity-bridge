import { Colors } from "@/constants/Colors";
import { Donation } from "@/types";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";

interface JustForYouProps {
  data: Donation[];
}

const JustForYou: React.FC<JustForYouProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>("Trending Programs");

  const tabs = ["Trending Programs", "Local Programs", "Global Programs"];

  const filterDataByTab = () => {
    switch (activeTab) {
      case "Trending Programs":
        return data.filter((item) => item.tag === "Trending");
      case "Local Programs":
        return data.filter((item) => item.tag === "Local");
      case "Global Programs":
        return data.filter((item) => item.tag === "Global");
      default:
        return [];
    }
  };

  const filteredData = filterDataByTab();

  const renderTabItem = (item: string) => (
    <TouchableOpacity
      key={item}
      style={[styles.tab, activeTab === item && styles.activeTab]}
      onPress={() => setActiveTab(item)}
    >
      <Text
        style={[styles.tabText, activeTab === item && styles.activeTabText]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderDonationItem = ({ item }: { item: Donation }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        router.push({
          pathname: "donation/Info",
          params: {
            data: JSON.stringify(item),
          },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amountNeeded}>$ {item.amountNeeded}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => renderTabItem(tab))}
      </ScrollView>
      <FlatList
        data={filteredData}
        renderItem={renderDonationItem}
        keyExtractor={(item) => item.title} // Assuming titles are unique
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    marginBottom: 10,
  },
  tabsContentContainer: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: Platform.OS === "android" ? 16 : 20,
    color: "#777",
  },
  activeTabText: {
    color: Colors.primary,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 20,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 5,
  },
  title: {
    fontSize: Platform.OS === "android" ? 16 : 20,
    fontWeight: "bold",
  },
  amountNeeded: {
    fontSize: Platform.OS === "android" ? 14 : 18,
    color: "#888",
  },
});

export default JustForYou;
