import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/top_navigation/topNav";

import DeleteCustomButton from "@/components/DeleteCustomButton";
import PlusCustomButton from "@/components/PlusCustomButton";
import axios from "axios";
import HabitsScrollView from "../../components/HabitsScrollView";
import EditCustomButton from "@/components/EditCustomButton";

const Habits = () => {
  return (
    <View className="flex-1 flex-col justify-start">
      <TopNav />
      <View className="border-2 border-red-700 flex-1 flex p-3 ">
        <View className="h-20 justify-center items-center border-2">
          <Text>Insert daily navigations here</Text>
        </View>
        <HabitsScrollView />
        <View className="h-20 items-center justify-around flex-row border-2">
          <EditCustomButton />
          <DeleteCustomButton />
          <PlusCustomButton />
        </View>
      </View>
    </View>
  );
};

export default Habits;
