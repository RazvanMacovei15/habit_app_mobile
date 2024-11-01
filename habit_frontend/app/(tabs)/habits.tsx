import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TopNav from "@/components/top_navigation/topNav";

import DeleteCustomButton from "@/components/DeleteCustomButton";
import PlusCustomButton from "@/components/PlusCustomButton";
import EditCustomButton from "@/components/EditCustomButton";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import HabitsScrollView from "../../components/HabitsScrollView";

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
    console.log("Habit selected: ", habit);
  };

  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authState } = useAuth();
  const token = authState?.token;

  const fetchData = async (endpoint: string, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (endpoint: string, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newData = data.filter((habit) => habit.id !== selectedHabit?.id);
      setData(newData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData("http://maco-coding.go.ro:8010/habits/all", token);
    }
  }, []);

  if (loading) {
    return <ActivityIndicator className="grow" size="large" color="#0000ff" />; // Show loading spinner
  }

  if (error) {
    return (
      <Text className="grow items-center justify-center">Error: {error}</Text>
    );
  }

  return (
    <View className="flex-1 flex-col justify-start h-full">
      <TopNav />
      <View className=" flex-1 flex h-5/6 bg-gray-100">
        <View className="h-20 justify-center items-center border-2 bg-gray-100 rounded-3xl">
          <Text>Insert daily navigations here</Text>
        </View>

        <HabitsScrollView
          data={data}
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
              if (selectedHabit && token) {
                deleteData(
                  `http://maco-coding.go.ro:8010/habits/${selectedHabit.id}/delete`,
                  token
                );
                setSelectedHabit(null);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Habits;
