import { View, Text, Pressable } from "react-native";
import React from "react";
import CustomButon from "@/components/CustomButton";
import { router } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";
import TopNav from "@/components/navigation/TopNav";

const More = () => {
  const { onLogout } = useAuth();

  const logout = async () => {
    if (onLogout) {
      try {
        onLogout(); // Await logout to complete
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  const menuItems = [
    {
      title: "Gym Training",
      action: () => router.push("/gym"),
    },
    {
      title: "Measurements Tracking",
      action: () => router.push("/measurementsTracking"),
    },
    {
      title: "Leave feedback",
      action: () => router.push("/feedback"),
    },
    {
      title: "About",
      action: () => router.push("/about"),
    },
  ];

  return (
    <View className="flex flex-col h-full">
      <TopNav
        onPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <View className="grow items-center justify-start flex flex-col px-4">
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.action}
            className={`w-full items-center justify-center py-4 ${
              index === 0 ? "" : "border-t border-gray-600"
            } px-5`}
          >
            <Text className="text-xl">{item.title}</Text>
          </Pressable>
        ))}
      </View>

      <View className="p-2">
        <CustomButon handlePress={logout} title={"Log out"} />
      </View>
    </View>
  );
};

export default More;
