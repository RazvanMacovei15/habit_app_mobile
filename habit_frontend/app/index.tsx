import { Text, View, StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import CustomButon from "@/components/CustomButton";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";

export default function App() {
  const { authState } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Navigate based on authentication state
      if (authState?.authenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/sign-in");
      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [authState]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator  size="large" color="#4A90E2" />
        <Text className="mt-10">Alpha Version 1.0</Text>
      </SafeAreaView>
    );
  }
}

