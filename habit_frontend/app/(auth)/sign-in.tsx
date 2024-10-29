import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButon from "@/components/CustomButton";

import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <SafeAreaView className="bg-gray-800 h-full p-5">
      <ScrollView>
        <View className="w-full h-full flex flex-col gap-10">
          <Text className="text-yellow-400 text-4xl text-center w-full  mt-10 pb-20">
            SIGN IN PAGE
          </Text>
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
          <CustomButon
            handlePress={submit}
            title={"Sign in"}
            isLoading={isSubmitting}
          />
          <View>
            <Text className="text-yellow-400 text-2xl text-center w-full">
              Don't have an account?
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
