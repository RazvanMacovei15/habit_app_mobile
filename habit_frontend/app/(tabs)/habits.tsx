import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/top_navigation/topNav";

import DeleteCustomButton from "@/components/DeleteCustomButton";
import PlusCustomButton from "@/components/PlusCustomButton";
import HabitsScrollView from "../../components/HabitsScrollView";
import EditCustomButton from "@/components/EditCustomButton";

const Habits = () => {
  return (
    <View className="flex-1 flex-col justify-start h-full">
      <TopNav />
      <View className=" flex-1 flex h-5/6 bg-gray-100">
        <View className="h-20 justify-center items-center border-2 m-2 bg-gray-100 rounded-3xl">
          <Text>Insert daily navigations here</Text>
        </View>
        <HabitsScrollView />
        <View className="h-20 items-center justify-around flex-row bg-gray-300 rounded-t-3xl">
          <EditCustomButton />
          <PlusCustomButton />
          <DeleteCustomButton />
        </View>
      </View>
    </View>
  );
};

export default Habits;
