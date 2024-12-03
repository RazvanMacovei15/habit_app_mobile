import { View, Text, ScrollView, Alert, BackHandler } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButon from "@/components/CustomButton";
import { Link, router, useFocusEffect } from "expo-router";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  // Exit app when back button is pressed
  const exitApp = () => {
    BackHandler.exitApp();
  };

  // Handle back button on this specific screen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Customize the behavior as needed (e.g., show confirmation dialog)
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: exitApp },
        ]);
        return true; // Prevent default behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Clean up the event listener when the screen loses focus
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const { onLogin, onRegister } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      if (onLogin) {
        await onLogin(form.email, form.password);

        Alert.alert("Success", "User signed in successfully");
        router.replace("/dashboard");
      } else {
        Alert.alert("Error", "Login function is not available");
      }
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <SafeAreaView className="bg-gray-800 h-full p-5">
      <ScrollView>
        <View className="w-full min-h-[85vh] flex flex-col">
          <Text className="text-yellow-400 text-4xl text-center w-full mt-10 pb-20">
            SIGN IN PAGE
          </Text>
          <View className="mb-20">
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  email: e,
                })
              }
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder={""}
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  password: e,
                })
              }
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder={""}
            />
          </View>

          <CustomButon
            handlePress={submitLogin}
            //change the title if isSubmitting is true to veriying credentials

            title={isSubmitting ? "Verifying credentials" : "Sign In"}
            isLoading={isSubmitting}
          />
          <View className="w-full flex flex-row justify-center items-center mt-5">
            <Text className="text-yellow-400 text-xl flex flex-row pr-5">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-gray-200 text-xl">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
