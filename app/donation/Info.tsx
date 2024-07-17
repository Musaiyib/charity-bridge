import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
} from "react-native";
import { Donation } from "@/types";
import CustomSafeAreaView from "@/components/UI/CustomSafeAreaView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSharedValue } from "react-native-reanimated";
import { BottomSheet } from "@/components/ButtomSheet";

const Info: React.FC = () => {
  const [donation, setDonation] = useState<Donation | null>(null);
  const { data } = useLocalSearchParams();
  const progressAnim = useRef(new Animated.Value(0)).current; // Animated value for the progress
  const isOpen = useSharedValue(false);

  useEffect(() => {
    if (data) {
      setDonation(JSON.parse(data as string));
    }
  }, [data]);

  useEffect(() => {
    if (donation) {
      // Start the animation when the donation data is set
      Animated.timing(progressAnim, {
        toValue: Math.round(
          (donation.totalDonatedAmount / donation.amountNeeded) * 100
        ), // Target width percentage
        duration: 1000, // Duration of the animation
        useNativeDriver: false, // Do not use native driver since we're animating width
      }).start();
    }
  }, [donation]);

  if (!donation) {
    return <ActivityIndicator color={Colors.primary} size="large" />;
  }

  const progressPercentage = Math.round(
    (donation.totalDonatedAmount / donation.amountNeeded) * 100
  );

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  return (
    <>
      <View style={styles.container}>
        <CustomSafeAreaView />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Image source={{ uri: donation.image }} style={styles.image} />
          <View>
            <Text style={styles.recent}>Recent Donors</Text>
            <View style={styles.donorsImgContainer}>
              <Image
                source={{ uri: donation.image }}
                style={styles.donorsImg}
              />
              <Image
                source={{ uri: donation.image }}
                style={[styles.donorsImg, styles.donorsImgOverlap]}
              />
              <Image
                source={{ uri: donation.image }}
                style={[styles.donorsImg, styles.donorsImgOverlap]}
              />
              <Image
                source={{ uri: donation.image }}
                style={[styles.donorsImg, styles.donorsImgOverlap]}
              />
              <Image
                source={{ uri: donation.image }}
                style={[styles.donorsImg, styles.donorsImgOverlap]}
              />
              <Text style={styles.moreDonors}>+442</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressAmounts}>
              <Text
                style={styles.raisedAmount}
              >{`$ ${donation.totalDonatedAmount}`}</Text>
              <View style={styles.daysLeftContainer}>
                <Ionicons
                  name="timer-outline"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.daysLeft}>
                  {`${donation.daysLeft} days left`}
                </Text>
              </View>
            </View>
            <View style={styles.progressBarRow}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["0%", "100%"],
                      }),
                    },
                  ]}
                />
              </View>
              <Text
                style={styles.progressPercentage}
              >{`${progressPercentage}%`}</Text>
            </View>
          </View>
          <Text style={styles.title}>{donation.title}</Text>
          <Text style={styles.about}>{donation.about}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={toggleSheet}>
          <Text style={styles.buttonText}>Help her</Text>
          <Ionicons name="heart-sharp" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <BottomSheet
        isOpen={isOpen}
        toggleSheet={toggleSheet}
        donation={donation}
        progressPercentage={progressPercentage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  recent: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  donorsImgContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  donorsImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  donorsImgOverlap: {
    marginLeft: -20,
  },
  moreDonors: {
    fontSize: 18,
    color: Colors.primary,
    marginLeft: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  about: {
    fontSize: 20,
    marginBottom: 15,
    lineHeight: 24,
  },
  progressContainer: {
    marginVertical: 10,
  },
  progressAmounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  raisedAmount: {
    fontSize: 20,
    fontWeight: "600",
  },
  daysLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  daysLeft: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "600",
  },
  progressBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#f2f2f2",
    flex: 1,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10,
    position: "relative",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
  progressPercentage: {
    fontSize: 18,
    color: Colors.primary,
  },
  button: {
    backgroundColor: "#E42424",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
});

export default Info;
