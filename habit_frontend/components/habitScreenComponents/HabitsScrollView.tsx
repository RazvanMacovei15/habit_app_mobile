import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import HabitCard from "./HabitCard";
import { useAuth } from "@/app/context/AuthContext";
import { HabitDTO } from "../../components/types/HabitDTO";
import DailyLogCard from "./logCards/DailyLogCard";
import { DailyLogDTO } from "../types/DailyLogDTO";

interface HabitsScrollView {
  // selectedHabit: HabitDTO | null;
  // onSelect: (habit: HabitDTO | null) => void;
  // data: HabitDTO[];
  selectedHabit: DailyLogDTO | null;
  onSelect: (habit: DailyLogDTO | null) => void;
  data: DailyLogDTO[];
  error: any;
  loading: boolean;
}

const HabitsScrollView = ({
  selectedHabit,
  onSelect,
  data,
  error,
  loading,
}: HabitsScrollView) => {
  if (loading) {
    return (
      <View className="grow items-center justify-center">
        <Text className="text-red-600 text-3xl">Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <Text className="grow items-center justify-center">Error: {error}</Text>
    );
  }
  return (
    <ScrollView className="h-1/2 px-2 bg-gray-100 mt-2">
      {/* <View className=" gap-2 justify-start flex-col">
        {data.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            isSelected={selectedHabit === habit}
            onSelect={() => {
              onSelect(selectedHabit === habit ? null : habit);
            }}
          />
        ))}
      </View> */}
      <View className=" gap-2 justify-start flex-col">
        {data.map((dailyLogDTO) => (
          <DailyLogCard
            key={dailyLogDTO.id}
            dailyLogDTO={dailyLogDTO}
            isSelected={selectedHabit === dailyLogDTO}
            onSelect={() => {
              onSelect(selectedHabit === dailyLogDTO ? null : dailyLogDTO);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HabitsScrollView;
