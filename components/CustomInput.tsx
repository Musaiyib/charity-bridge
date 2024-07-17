import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Animated, StyleSheet } from "react-native";

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedPlaceholder = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedPlaceholder, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const placeholderStyle = {
    top: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 2], // Adjusted to center the placeholder vertically
    }),
    fontSize: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 16],
    }),
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      <Animated.Text style={[styles.placeholder, placeholderStyle]}>
        {placeholder}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    marginBottom: 12,
    height: 48,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  placeholder: {
    position: "absolute",
    left: 15,
    color: "#999",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    marginTop: 5,
    fontSize: 18,
  },
});

export default CustomInput;
