import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import "../global.css";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "../app/context/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Main menu" }}
        />
        <Stack.Screen
          name="(more)"
          options={{ headerShown: true, title: "More" }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
