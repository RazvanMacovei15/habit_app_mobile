import { View, Text } from "react-native";
import React from "react";
import TopNav from "@/components/top_navigation/topNav";
import Table from "@/components/table/Table";

const Habits = () => {
  return (
    <View>
      <TopNav />
      <View className="bg-yellow-300 mt-12">
        <Text className="text-center text-2xl ">Item 1</Text>
      </View>
      <View className="bg-black ">
        <Text className="text-center text-2xl text-white">Item 2</Text>
      </View>
      <View className="bg-purple-500">
        <Text className="text-center text-2xl text-white">Item 3</Text>
      </View>
    </View>
  );
};

export default Habits;
