import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router"; // Assuming you have router imported from expo-router

interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Platform.OS === "android" ? 10 : 15,
    paddingHorizontal: 0,
    borderRadius: 10,
    position: "absolute",
    width: "90%",
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomButton;
