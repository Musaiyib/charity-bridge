import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import CustomSafeAreaView from "@/components/UI/CustomSafeAreaView";
import TopBar from "@/components/UI/TopBar";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // Handle sign-up logic here
    router.push("(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <CustomSafeAreaView />
      <TopBar title="Sign Up" onPress={() => router.back()} />
      <Image
        source={require("../../assets/images/onboarding2.png")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton onPress={handleSignUp} title="Sign up" />

        <TouchableOpacity
          style={styles.link}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.linkText}>Have you an account already?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
    alignItems: "center",
  },
  link: {
    marginTop: 20,
    marginBottom: 0,
  },
  linkText: {
    color: Colors.primary,
    fontSize: 20,
    marginTop: -10,
  },
});

export default SignUpScreen;
