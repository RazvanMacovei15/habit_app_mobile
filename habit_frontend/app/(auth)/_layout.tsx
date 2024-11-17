import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SignUp from "./sign-up";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-up" options={{ headerShown: false, 
          animation: "slide_from_left",
          animationDuration: 500,
        }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false,
          animation: "slide_from_bottom",
          animationDuration: 500,
          animationTypeForReplace: "pop",
         }} />
      </Stack>
      <StatusBar />
    </>
  );
};

export default AuthLayout;
