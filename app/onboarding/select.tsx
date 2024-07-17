import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  withDelay,
} from "react-native-reanimated";
import { areas } from "@/dummyData";

const InterestSelectionScreen: React.FC = () => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  useEffect(() => {
    titleOpacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
    subtitleOpacity.value = withDelay(
      200,
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      })
    );
  }, []);

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY: titleOpacity.value * 10 }],
    };
  });

  const subtitleStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      subtitleOpacity.value,
      [0, 1],
      [20, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: subtitleOpacity.value,
      transform: [{ translateY }],
    };
  });

  const toggleArea = (area: string) => {
    setSelectedAreas((prevSelected) =>
      prevSelected.includes(area)
        ? prevSelected.filter((a) => a !== area)
        : [...prevSelected, area]
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.titleContainer, titleStyle]}>
        <Text style={styles.title}>Areas you like?</Text>
      </Animated.View>
      <Animated.View style={[styles.subtitleContainer, subtitleStyle]}>
        <Text style={styles.subtitle}>
          Pick the areas that appeal to you most
        </Text>
      </Animated.View>
      <View style={styles.areasContainer}>
        {areas.map((area) => (
          <TouchableOpacity
            key={area}
            style={[
              styles.areaButton,
              selectedAreas.includes(area) && styles.selectedAreaButton,
            ]}
            onPress={() => toggleArea(area)}
          >
            <Text
              style={[
                styles.areaButtonText,
                selectedAreas.includes(area) && styles.selectedAreaButtonText,
              ]}
            >
              {area}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <CustomButton
        onPress={() => router.push("(auth)/signup")}
        title="Continue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleContainer: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
  },
  areasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  areaButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 15,
    paddingHorizontal: 22,
    margin: 10,
    borderRadius: 99,
  },
  selectedAreaButton: {
    backgroundColor: "#D0D0FF",
  },
  areaButtonText: {
    fontSize: 20,
    color: "#000000",
  },
  selectedAreaButtonText: {
    color: Colors.primary,
  },
});

export default InterestSelectionScreen;
