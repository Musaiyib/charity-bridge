import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  LayoutAnimationConfig,
} from "react-native-reanimated";

const Welcome: React.FC = () => {
  const titleOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [titleOpacity]);

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY: titleOpacity.value * 20 }],
    };
  });

  return (
    <LayoutAnimationConfig skipEntering>
      <View style={styles.container}>
        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <Text style={styles.title}>Small change, big difference</Text>
        </Animated.View>
        <Image
          source={require("../../assets/images/onboarding1.png")}
          style={styles.image}
        />
        <CustomButton
          onPress={() => router.push("/onboarding/select")}
          title="Get started"
        />
      </View>
    </LayoutAnimationConfig>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#ECEDEC",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    position: "relative",
  },
  titleContainer: {
    width: Platform.OS === "android" ? "85%" : "80%",
    position: "absolute",
    zIndex: 20,
    top: Platform.OS === "android" ? 40 : 80,
  },
  title: {
    fontSize: Platform.OS === "android" ? 35 : 44,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default Welcome;
