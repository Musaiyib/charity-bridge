import CustomSafeAreaView from "@/components/UI/CustomSafeAreaView";
import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ActivityScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomSafeAreaView />
      <View style={styles.viewText}>
        <Text style={styles.text}>Coming soon</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewText: {
    backgroundColor: Colors.primary,
    padding: 10,

    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default ActivityScreen;
