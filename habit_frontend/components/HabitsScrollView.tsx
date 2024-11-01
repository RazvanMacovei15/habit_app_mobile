import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import HabitCard from "./HabitCard";
import { useAuth } from "@/app/context/AuthContext";
import { Habit } from "../app/(tabs)/habits";

interface HabitsScrollView {
  selectedHabit: Habit | null;
  onSelect: (habit: Habit | null) => void;
  data: Habit[];
}

const HabitsScrollView = ({
  selectedHabit,
  onSelect,
  data,
}: HabitsScrollView) => {
  return (
    <ScrollView className="grow px-4 bg-gray-100 mt-2">
      <View className=" gap-2 justify-start flex-col">
        {data.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            isSelected={selectedHabit === habit}
            onSelect={() => onSelect(selectedHabit === habit ? null : habit)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HabitsScrollView;
