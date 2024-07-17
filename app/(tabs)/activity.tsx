import CustomSafeAreaView from "@/components/UI/CustomSafeAreaView";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

const ActivityScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomSafeAreaView />
      <Image
        source={{ uri: "https://via.placeholder.com/300" }}
        style={styles.image}
      />
      <Text style={styles.sectionHeader}>Recent Donors</Text>
      <View style={styles.donorsContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.donorImage}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.donorImage}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.donorImage}
        />
      </View>
      <Text style={styles.amount}>$190.00</Text>
      <Text style={styles.daysLeft}>15 days left</Text>
      <Text style={styles.title}>
        Capacity Building Workshop on Sub-national
      </Text>
      <Text style={styles.description}>
        The Division for Sustainable Development Goals, DESA, in collaboration
        with Paraguay’s Technical Secretariat for Planning and Economic
        Development.
      </Text>
      <Button
        title="Help her"
        onPress={() => router.push("NotificationScreen")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  donorsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  donorImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  daysLeft: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
});

export default ActivityScreen;
