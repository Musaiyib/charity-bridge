import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface TopBarProps {
  title?: string;
  onPress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    left: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default TopBar;
