import { Text, View, StyleSheet, ScrollView } from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import CustomButon from "@/components/CustomButton";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center px-4 h-full justify-center">
          <CustomButon
            title="SIGN IN"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
