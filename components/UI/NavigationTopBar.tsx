import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NavigationTopBar = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.notificationContainer} onPress={() => {}}>
        <View style={styles.notificationBadge}>
          <View style={styles.notificationDot} />
        </View>
        <Octicons name="bell" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  backButton: {
    backgroundColor: "#f1f1f1",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  notificationContainer: {
    backgroundColor: "#f1f1f1",
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    right: 0,
    top: -3,
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 99,
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: "red",
  },
});

export default NavigationTopBar;
