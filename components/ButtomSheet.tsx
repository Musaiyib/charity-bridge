import { Colors } from "@/constants/Colors";
import { Donation } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface BottomSheetProps {
  isOpen: { value: boolean };
  toggleSheet: () => void;
  duration?: number;
  donation: Donation;
  progressPercentage: number;
}

export const BottomSheet = ({
  isOpen,
  toggleSheet,
  duration = 500,
  donation,
  progressPercentage,
}: BottomSheetProps) => {
  const height = useSharedValue(0);
  const progressInitial = useSharedValue(0);
  const progressIntended = useSharedValue(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [donationFrequency, setDonationFrequency] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [impactPercentage, setImpactPercentage] = useState<number>(0);

  useEffect(() => {
    if (donation && donation.amountNeeded > 0) {
      const targetValue = Math.round(
        (donation.totalDonatedAmount / donation.amountNeeded) * 100
      );
      progressInitial.value = withTiming(targetValue, { duration: 1000 });
    }
  }, [donation]);

  useEffect(() => {
    if (donation && donation.amountNeeded > 0) {
      const totalAmount = donation.totalDonatedAmount + inputAmount;
      const targetValue = Math.round(
        (totalAmount / donation.amountNeeded) * 100
      );
      progressIntended.value = withTiming(targetValue, { duration: 1000 });

      const impact = calculateImpactPercentage(
        inputAmount,
        donation.amountNeeded
      );
      setImpactPercentage(impact);
    }
  }, [inputAmount, donation]);

  const calculateImpactPercentage = (amount: number, totalNeeded: number) => {
    return Math.round((amount / totalNeeded) * 100);
  };

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: isOpen.value ? 0 : height.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: isOpen.value ? 1 : 0,
    zIndex: isOpen.value ? 1 : -1,
  }));

  const handlePresetAmountPress = (amount: number) => {
    setSelectedAmount(amount);
    setInputAmount(amount);
  };

  const validateInputAmount = (value: number) => {
    if (value > donation.amountNeeded) {
      alert(`Amount cannot exceed $${donation.amountNeeded}`);
      return donation.amountNeeded; // Reset to max allowed
    }
    return value;
  };

  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <TouchableOpacity
          style={styles.flex}
          onPress={() => {
            toggleSheet();
            Keyboard.dismiss();
          }}
        />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[styles.sheet, sheetStyle]}
      >
        <TouchableOpacity
          onPress={toggleSheet}
          style={{ position: "absolute", right: 20, top: 20, zIndex: 5 }}
          accessibilityLabel="Close bottom sheet"
        >
          <Ionicons name="close-circle-sharp" size={24} color="#E42424" />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("@/assets/images/heart.png")}
            style={styles.sheetImage}
          />
          <Text style={styles.sheetTitle}>{donation.title}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressAmounts}>
              <Text
                style={styles.raisedAmount}
              >{`$${donation.totalDonatedAmount}`}</Text>
              <View style={styles.daysLeftContainer}>
                <Ionicons
                  name="timer-outline"
                  size={20}
                  color={Colors.primary}
                />
                <Text
                  style={styles.daysLeft}
                >{`${donation.daysLeft} days left`}</Text>
              </View>
            </View>
            <View style={styles.progressBarRow}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFillInitial,
                    useAnimatedStyle(() => ({
                      width: `${progressPercentage}%`,
                    })),
                  ]}
                />
                <Animated.View
                  style={[
                    styles.progressBarFillIntended,
                    useAnimatedStyle(() => ({
                      width: `${progressIntended.value}%`,
                    })),
                  ]}
                />
              </View>
              <Text style={styles.progressPercentage}>{`${
                progressPercentage + impactPercentage
              }%`}</Text>
            </View>
          </View>
          <View style={styles.inputView}>
            <View
              style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                height: 50,
                width: "10%",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",

                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                $
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter the amount"
              keyboardType="numeric"
              value={inputAmount > 0 ? inputAmount.toString() : ""}
              onChangeText={(text) => {
                const numericValue = Number(text);
                setInputAmount(
                  isNaN(numericValue) ? 0 : validateInputAmount(numericValue)
                );
              }}
              accessibilityLabel="Input donation amount"
            />
            {impactPercentage ? (
              <View
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  width: "20%",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  flexDirection: "row",
                }}
              >
                <Ionicons name="caret-up-outline" size={18} color="#0f8a20" />
                <Text style={styles.inputPercentage}>
                  {`${impactPercentage}%`}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={{ marginTop: 15, width: "100%" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              How often you wish to donate
            </Text>
            <View style={styles.presetAmounts}>
              {[5, 15, 25].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.presetAmount,
                    selectedAmount === amount && styles.selectedAreaButton,
                  ]}
                  onPress={() => handlePresetAmountPress(amount)}
                  accessibilityLabel={`Select preset amount $${amount}.00`}
                >
                  <Text
                    style={[
                      styles.presetAmountText,
                      selectedAmount === amount &&
                        styles.selectedAreaButtonText,
                    ]}
                  >{`$${amount}.00`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              How often you wish to donate
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              onScrollBeginDrag={() => Keyboard.dismiss()}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.presetFrequencys}>
                {["One Time", "Every Month", "Every 3 Month"].map(
                  (frequency) => (
                    <TouchableOpacity
                      key={frequency}
                      style={[
                        styles.presetFrequency,
                        donationFrequency === frequency &&
                          styles.selectedAreaButton,
                      ]}
                      onPress={() => setDonationFrequency(frequency)}
                      accessibilityLabel={`Select preset often donation`}
                    >
                      <Text
                        style={[
                          styles.presetFrequencyText,
                          donationFrequency === frequency &&
                            styles.selectedAreaButtonText,
                        ]}
                      >
                        {`${frequency}`}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.donateButton}>
            <Text style={styles.donateButtonText}>{`Donate $${
              inputAmount > 0 ? inputAmount : 15
            }.00`}</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20,
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  sheet: {
    padding: 16,
    height: "95%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: "#f8f9ff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  flex: {
    flex: 1,
  },
  sheetImage: {
    marginVertical: 30,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  progressContainer: {
    marginVertical: 10,
    width: "100%",
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
  progressBarFillInitial: {
    height: "100%",
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: 1,
    borderRadius: 5,
  },
  progressBarFillIntended: {
    height: "100%",
    backgroundColor: "#a79dff",
    position: "absolute",
    borderRadius: 5,
  },
  progressPercentage: {
    fontSize: 16,
  },
  progressAmounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  input: {
    fontSize: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: -10,
    height: 50,
    flex: 1,
  },
  inputPercentage: {
    fontSize: 20,
    alignSelf: "center",
    color: "#0f8a20",
  },

  presetAmounts: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    gap: 8,
    width: "100%",
  },
  presetAmount: {
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9e9e9dd",
  },
  presetAmountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  presetFrequencys: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    gap: 8,
    width: "100%",
    height: 50,
  },

  presetFrequency: {
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9e9e9dd",
  },
  presetFrequencyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  donateButton: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#E42424",
    padding: 15,
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedAreaButton: {
    backgroundColor: "#D0D0FF",
  },
  selectedAreaButtonText: {
    color: Colors.primary,
  },
});
