import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { areas, donationData } from "@/dummyData";
import TopPrograms from "@/components/Home/TopPrograms";
import CustomSafeAreaView from "@/components/UI/CustomSafeAreaView";
import JustForYou from "@/components/Home/JustForYou";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const recording = useRef<any>(null);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement your search functionality here
  };

  const processAudioFile = (uri: string) => {
    // Pseudo function to simulate processing of the audio file
    // You might implement some logic to analyze the audio file and simulate text recognition
    Alert.alert("Processing Audio", "Simulating voice recognition...");
    // Set the recognized text as search query
    setSearchQuery("Simulated search text");
  };

  const toggleArea = (area: string) => {
    setSelectedAreas((prevSelected) =>
      prevSelected.includes(area)
        ? prevSelected.filter((a) => a !== area)
        : [...prevSelected, area]
    );
  };

  const handleMicPress = () => {
    Alert.alert("Recording", "The recording functionality is not handled");
    setIsRecording(!isRecording);
  };

  return (
    <View style={styles.container}>
      <CustomSafeAreaView />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hello John!</Text>
            <Text style={styles.subTitle}>Small change, big difference!</Text>
          </View>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.image}
          />
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons
              name="search-outline"
              style={styles.icon}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={handleMicPress}>
            <Ionicons
              name={isRecording ? "stop-circle-outline" : "mic-outline"}
              size={24}
              color={isRecording ? "red" : "#000"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.areasContainer}
          >
            {areas.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.areaButton,
                  selectedAreas.includes(item) && styles.selectedAreaButton,
                ]}
                onPress={() => toggleArea(item)}
              >
                <Text
                  style={[
                    styles.areaButtonText,
                    selectedAreas.includes(item) &&
                      styles.selectedAreaButtonText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TopPrograms />
        <JustForYou data={donationData} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Platform.OS === "android" ? 0 : 30,
    marginTop: Platform.OS === "android" ? 40 : 0,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: Platform.OS === "android" ? 30 : 40,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: Platform.OS === "android" ? 16 : 20,
    fontWeight: "500",
    marginTop: 5,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 99,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 40,
    marginHorizontal: 20,
  },
  icon: {
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: "100%",
    fontSize: Platform.OS === "android" ? 18 : 20,
  },
  areasContainer: {
    paddingLeft: 10,
  },
  areaButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 7,
    paddingHorizontal: 17,
    marginRight: 10,
    marginVertical: 15,
    borderRadius: 99,
  },
  selectedAreaButton: {
    backgroundColor: "#D0D0FF",
  },
  areaButtonText: {
    fontSize: Platform.OS === "android" ? 16 : 20,
    color: "#000000",
  },
  selectedAreaButtonText: {
    color: Colors.primary,
  },
});

export default HomePage;
