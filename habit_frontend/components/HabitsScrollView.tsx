import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import HabitCard from "./HabitCard";
import { useAuth } from "@/app/context/AuthContext";

interface HabitDTORecieved {
  username: string;
  userId: number;
  id: number;
  habitName: string;
  completed: boolean;
  currentStreak: number;
}

interface HabitsScrollViewProps {
  onSelectionChange?: (selectedId: number | null) => void; // Callback to send the selected habit ID to the parent
}
const HabitsScrollView = ({ onSelectionChange }: HabitsScrollViewProps) => {
  const [data, setData] = useState<HabitDTORecieved[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  const { authState } = useAuth();
  const token = authState?.token;

  // Fetch data from the API based on the endpoint
  const fetchData = async (endpoint: string, token: string) => {
    setLoading(true); // Start loading spinner when fetching data
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data); // Assuming response.data is an array of objects
    } catch (err: any) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Update the selected habit and notify the parent of the selected ID
  const selectHabit = (habitId: number) => {
    const newSelectedId = habitId === selectedHabitId ? null : habitId;
    setSelectedHabitId(newSelectedId);

    // Notify the parent component of the updated selected habit ID
    if (onSelectionChange) {
      onSelectionChange(newSelectedId);
    }
  };

  // Initial fetch for the default data
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
    ); // Show error message
  }

  return (
    <ScrollView className="grow p-2 bg-gray-100">
      <View className=" gap-2 justify-start flex-col">
        {data.map((item, key) => (
          <HabitCard
            key={key}
            habitId={item.id}
            habitName={item.habitName}
            completed={item.completed}
            currentStreak={item.currentStreak}
            isSelected={item.id === selectedHabitId} // Only the selected habit will show as selected
            toggleExpand={() => {
              selectHabit(item.id);
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HabitsScrollView;
