import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; // Assuming you have a Colors file
import CustomSafeAreaView from "@/components/UI/CustomSafeAreaView";

const ProfileScreen = () => {
  return (
    <>
      <CustomSafeAreaView />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.imagesContainer}>
            <Image
              source={require("@/assets/images/left.png")}
              style={styles.leftImage}
            />
            <Image
              source={require("@/assets/images/right.png")}
              style={styles.rightImage}
            />
          </View>
          <Image
            source={require("@/assets/images/profilePic.png")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.congratulationsText}>
            Congratulations 🎉 John!
          </Text>
          <Text style={styles.subtitleText}>You have won gold medal</Text>
          <Text style={styles.donationsText}>$48.9k Donations!</Text>
          <Image
            source={require("@/assets/images/Badge.png")}
            style={styles.medalIcon}
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statItemContent}>
              <Text style={styles.statValue}>2.4B Peoples</Text>
              <Text style={styles.statLabel}>You helped</Text>
            </View>
            <View style={styles.statIconContainer}>
              <Ionicons
                name="people-outline"
                size={24}
                color={Colors.primary}
              />
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statItemContent}>
              <Text style={styles.statValue}>144 Programs</Text>
              <Text style={styles.statLabel}>Total of all Programs</Text>
            </View>
            <View style={styles.statIconContainer}>
              <Ionicons name="cube-outline" size={24} color={Colors.primary} />
            </View>
          </View>
        </View>

        <View style={styles.impactContainer}>
          <View style={styles.impactHeader}>
            <Text style={styles.impactTitle}>Your Impact</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                paddingTop: 3,
              }}
            >
              <Text style={styles.impactSubtitle}>Last 7 Days</Text>
              <Ionicons name="chevron-down-outline" size={18} color="#888" />
            </View>
          </View>

          <View style={styles.impactDetail}>
            <Text style={styles.impactDetailText}>No Poverty</Text>
            <Text style={styles.impactDetailPercentage}>55%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagesContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  leftImage: {
    position: "absolute",
    top: 15,
    width: 140,
    left: 80,
    transform: [{ rotate: "-5deg" }],
    marginRight: 20,
  },
  rightImage: {
    position: "absolute",
    top: 15,
    right: 80,
    width: 140,
    transform: [{ rotate: "5deg" }],
    marginLeft: 20,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 80,
    marginTop: 30,
  },
  profileDetailsContainer: {
    position: "relative",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 1.84,
    elevation: 1,
  },
  congratulationsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
    marginTop: 5,
  },
  donationsText: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },
  medalIcon: {
    position: "absolute",
    top: 0,
    right: 20,
  },
  statsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
    gap: 15,
  },
  statItem: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 1.84,
    elevation: 1,
  },
  statItemContent: {
    justifyContent: "flex-start",
  },
  statIconContainer: {
    backgroundColor: "#e3e0ff",
    padding: 10,
    borderRadius: 99,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 20,
    color: "#888",
    marginBottom: 10,
    textAlign: "left",
  },
  impactContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 1.84,
    elevation: 1,
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  impactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  impactSubtitle: {
    fontSize: 14,
    color: "#333",
  },
  impactDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  impactDetailText: {
    fontSize: 16,
    fontWeight: "600",
  },
  impactDetailPercentage: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    width: "55%", // This should be dynamic based on percentage
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
});

export default ProfileScreen;
