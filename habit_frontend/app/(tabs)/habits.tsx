import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/top_navigation/topNav";

import DeleteCustomButton from "@/components/DeleteCustomButton";
import PlusCustomButton from "@/components/PlusCustomButton";
import HabitsScrollView from "../../components/HabitsScrollView";
import EditCustomButton from "@/components/EditCustomButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export type Habit = {
  id: number;
  habitName: string;
  completed: boolean;
  currentStreak: number;
};

const Habits = () => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  // Boolean indicating if a habit is selected
  const isSelected = selectedHabit !== null;

  const handleSelectHabit = (habit: Habit | null) => {
    setSelectedHabit(habit);
  };

  return (
    <View className="flex-1 flex-col justify-start h-full">
      <TopNav />
      <View className=" flex-1 flex h-5/6 bg-gray-100">
        <View className="h-20 justify-center items-center border-2 bg-gray-100 rounded-3xl">
          <Text>Insert daily navigations here</Text>
        </View>
        <HabitsScrollView
          selectedHabit={selectedHabit}
          onSelect={handleSelectHabit}
        />
        <View className="h-20 items-center justify-around flex-row bg-gray-100 border-red-300 rounded-t-3xl shadow-2xl shadow-slate-900">
          <EditCustomButton isDisabled={!isSelected} />
          <PlusCustomButton />
          <DeleteCustomButton
            isDisabled={!isSelected}
            selectedHabit={selectedHabit}
            onPress={() => {
              console.log("Delete button pressed");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Habits;
