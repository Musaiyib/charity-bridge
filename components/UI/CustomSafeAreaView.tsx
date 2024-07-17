import { View, Text, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomSafeAreaView = () => {
  if (Platform.OS === "android") {
    return <SafeAreaView edges={["top", "bottom"]} />;
  } else if (Platform.OS === "ios") return <SafeAreaView edges={["bottom"]} />;
  {
  }
};

Platform.OS === "ios" ? (
  <SafeAreaView edges={["bottom"]} />
) : (
  <SafeAreaView edges={["top", "bottom"]} />
);

export default CustomSafeAreaView;
