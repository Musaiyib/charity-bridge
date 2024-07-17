import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          height: 100,
        },
        tabBarIconStyle: {
          marginTop: 10,
          marginBottom: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="trending-up"
              size={28}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="bell"
              size={24}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="person-outline"
              size={26}
              color={focused ? Colors.primary : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
