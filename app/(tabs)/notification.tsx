import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const NotificationScreen = () => {
  const [amount, setAmount] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        California Ends Strict Virus Restrictions
      </Text>
      <Text style={styles.amount}>$190.00</Text>
      <Text style={styles.daysLeft}>15 days left</Text>
      <TextInput
        placeholder="Enter the amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <View style={styles.buttonGroup}>
        <Button title="$5.00" onPress={() => setAmount("5.00")} />
        <Button title="$15.00" onPress={() => setAmount("15.00")} />
        <Button title="$25.00" onPress={() => setAmount("25.00")} />
      </View>
      <Button title={`Donate $${amount}`} onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  daysLeft: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default NotificationScreen;
