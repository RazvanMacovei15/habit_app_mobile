import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const MoreScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="gym"
        options={{
          headerShown: false,
          animation: "fade",
          title: "Gym Training",
        }}
      />
      <Stack.Screen
        name="measurementsTracking"
        options={{
          headerShown: false,
          animation: "fade",
          title: "Measurements",
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          headerShown: false,
          animation: "fade",
          title: "Feedback",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerShown: false,
          animation: "fade",
          title: "About",
        }}
      />
      <Stack.Screen
        name="addBodyStatModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default MoreScreensLayout;
